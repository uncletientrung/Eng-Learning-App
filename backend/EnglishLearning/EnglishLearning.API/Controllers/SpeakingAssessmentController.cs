using System.Security.Claims;
using EnglishLearning.API.Services;
using EnglishLearning.BLL.DTOs.SpeakingAssessment;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/speaking-attempts")]
[Authorize]
public sealed class SpeakingAssessmentController : ControllerBase
{
    private readonly ISpeakingAssessmentService _service;
    private readonly SpeakingGradingQueue _gradingQueue;

    public SpeakingAssessmentController(
        ISpeakingAssessmentService service,
        SpeakingGradingQueue gradingQueue)
    {
        _service = service;
        _gradingQueue = gradingQueue;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAttempt(
        [FromBody] CreateSpeakingAttemptRequestDto request,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized(new { message = "Không xác định được người dùng." });

        try
        {
            var attempt = await _service.CreateAttemptAsync(
                userId,
                request.ExerciseId,
                request.StartNewAttempt,
                cancellationToken);
            return Ok(attempt);
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
    }

    [HttpPut("{attemptId:int}/answers/{questionId:int}")]
    [RequestSizeLimit(11 * 1024 * 1024)]
    public async Task<IActionResult> SaveAnswer(
        int attemptId,
        int questionId,
        [FromForm] string transcript,
        [FromForm] IFormFile audio,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized(new { message = "Không xác định được người dùng." });
        if (audio is null)
            return BadRequest(new { message = "Cần tải file ghi âm lên." });

        try
        {
            await using var stream = audio.OpenReadStream();
            await _service.SaveAnswerAsync(
                userId,
                attemptId,
                questionId,
                transcript,
                stream,
                audio.Length,
                audio.ContentType,
                cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
    }

    [HttpPost("{attemptId:int}/submit")]
    public async Task<IActionResult> SubmitAttempt(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized(new { message = "Không xác định được người dùng." });

        try
        {
            await _service.SubmitAttemptAsync(
                userId,
                attemptId,
                cancellationToken);
            _gradingQueue.Enqueue(attemptId);
            return Accepted(new
            {
                attemptId,
                status = "SUBMITTED",
                message = "Đã nộp bài. Hệ thống đang chấm Speaking."
            });
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
    }

    [HttpGet("{attemptId:int}")]
    public async Task<IActionResult> GetAttempt(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized(new { message = "Không xác định được người dùng." });

        var attempt = await _service.GetAttemptAsync(
            userId,
            attemptId,
            cancellationToken);

        return attempt is null
            ? NotFound(new { message = "Không tìm thấy lượt làm Speaking." })
            : Ok(attempt);
    }

    [HttpPost("{attemptId:int}/retry-grading")]
    public async Task<IActionResult> RetryGrading(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized(new { message = "Không xác định được người dùng." });

        try
        {
            await _service.RetryGradingAsync(
                userId,
                attemptId,
                cancellationToken);
            _gradingQueue.Enqueue(attemptId);
            return Accepted(new
            {
                attemptId,
                status = "SUBMITTED",
                message = "Đã gửi lại yêu cầu chấm Speaking."
            });
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
    }

    private bool TryGetUserId(out int userId)
    {
        return int.TryParse(
            User.FindFirstValue(ClaimTypes.NameIdentifier),
            out userId);
    }
}
