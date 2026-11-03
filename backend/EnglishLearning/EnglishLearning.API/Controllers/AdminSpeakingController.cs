using EnglishLearning.API.Services;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/admin/speaking")]
[Authorize(Roles = "ADMIN")]
public sealed class AdminSpeakingController : ControllerBase
{
    private readonly IAdminSpeakingService _service;
    private readonly SpeakingGradingQueue _gradingQueue;

    public AdminSpeakingController(
        IAdminSpeakingService service,
        SpeakingGradingQueue gradingQueue)
    {
        _service = service;
        _gradingQueue = gradingQueue;
    }

    [HttpGet("exercises")]
    public async Task<IActionResult> GetExercises(
        [FromQuery] AdminSpeakingExerciseQueryDto query,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _service.GetExercisesAsync(query, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpGet("exercises/{id:int}")]
    public async Task<IActionResult> GetExercise(
        int id,
        CancellationToken cancellationToken)
    {
        try
        {
            var exercise = await _service.GetExerciseAsync(id, cancellationToken);
            return exercise is null
                ? NotFound(new { message = "Không tìm thấy đề Speaking." })
                : Ok(exercise);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPost("exercises")]
    public async Task<IActionResult> CreateExercise(
        [FromBody] AdminSpeakingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var exercise = await _service.CreateExerciseAsync(request, cancellationToken);
            return CreatedAtAction(
                nameof(GetExercise),
                new { id = exercise.Id },
                exercise);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPut("exercises/{id:int}")]
    public async Task<IActionResult> UpdateExercise(
        int id,
        [FromBody] AdminSpeakingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var exercise = await _service.UpdateExerciseAsync(id, request, cancellationToken);
            return exercise is null
                ? NotFound(new { message = "Không tìm thấy đề Speaking." })
                : Ok(exercise);
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

    [HttpPatch("exercises/{id:int}/status")]
    public async Task<IActionResult> SetExerciseStatus(
        int id,
        [FromBody] UpdateSpeakingExerciseStatusRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            return await _service.SetExerciseStatusAsync(id, request.IsActive, cancellationToken)
                ? NoContent()
                : NotFound(new { message = "Không tìm thấy đề Speaking." });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpGet("submissions")]
    public async Task<IActionResult> GetSubmissions(
        [FromQuery] AdminSpeakingSubmissionQueryDto query,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _service.GetSubmissionsAsync(query, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpGet("submissions/{attemptId:int}")]
    public async Task<IActionResult> GetSubmission(
        int attemptId,
        CancellationToken cancellationToken)
    {
        try
        {
            var submission = await _service.GetSubmissionAsync(attemptId, cancellationToken);
            return submission is null
                ? NotFound(new { message = "Không tìm thấy bài nộp Speaking." })
                : Ok(submission);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPut("submissions/{attemptId:int}")]
    public async Task<IActionResult> UpdateSubmission(
        int attemptId,
        [FromBody] AdminSpeakingSubmissionUpdateDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var submission = await _service.UpdateSubmissionAsync(
                attemptId,
                request,
                cancellationToken);
            return submission is null
                ? NotFound(new { message = "Không tìm thấy bài nộp Speaking." })
                : Ok(submission);
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

    [HttpDelete("submissions/{attemptId:int}")]
    public async Task<IActionResult> DeleteSubmission(
        int attemptId,
        CancellationToken cancellationToken)
    {
        try
        {
            return await _service.DeleteSubmissionAsync(attemptId, cancellationToken)
                ? NoContent()
                : NotFound(new { message = "Không tìm thấy bài nộp Speaking." });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
        catch (IOException exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = exception.Message
            });
        }
    }

    [HttpGet("answers/{answerId:int}/audio")]
    public async Task<IActionResult> GetAnswerAudio(
        int answerId,
        CancellationToken cancellationToken)
    {
        try
        {
            var audio = await _service.GetAudioFileAsync(answerId, cancellationToken);
            if (audio is null)
                return NotFound(new { message = "Không tìm thấy file ghi âm." });

            var stream = new FileStream(
                audio.FullPath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.Read,
                bufferSize: 81920,
                useAsync: true);
            return File(stream, "audio/wav", enableRangeProcessing: true);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
        catch (FileNotFoundException)
        {
            return NotFound(new { message = "Không tìm thấy file ghi âm." });
        }
    }

    [HttpPost("submissions/{attemptId:int}/retry-grading")]
    public async Task<IActionResult> RetryGrading(
        int attemptId,
        CancellationToken cancellationToken)
    {
        try
        {
            await _service.RetryGradingAsync(attemptId, cancellationToken);
            _gradingQueue.Enqueue(attemptId);
            return Accepted(new
            {
                attemptId,
                status = "SUBMITTED",
                message = "Đã đưa lượt Speaking vào hàng chờ chấm lại."
            });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
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
}
