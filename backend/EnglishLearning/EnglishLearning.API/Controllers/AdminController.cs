using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "ADMIN")]
public sealed class AdminController : ControllerBase
{
    private readonly IAdminService _service;

    public AdminController(IAdminService service)
    {
        _service = service;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard(CancellationToken cancellationToken) =>
        Ok(await _service.GetDashboardAsync(cancellationToken));

    [HttpGet("writing")]
    public async Task<IActionResult> GetWritingExercises(
        [FromQuery] AdminWritingExerciseQueryDto query,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _service.GetWritingExercisesAsync(query, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpGet("writing/{id:int}")]
    public async Task<IActionResult> GetWritingExercise(
        int id,
        CancellationToken cancellationToken)
    {
        try
        {
            var exercise = await _service.GetWritingExerciseAsync(id, cancellationToken);
            return exercise is null
                ? NotFound(new { message = "Không tìm thấy đề Writing." })
                : Ok(exercise);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPost("writing")]
    public async Task<IActionResult> CreateWritingExercise(
        [FromBody] AdminWritingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var exercise = await _service.CreateWritingExerciseAsync(request, cancellationToken);
            return CreatedAtAction(
                nameof(GetWritingExercise),
                new { id = exercise.Id },
                exercise);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPut("writing/{id:int}")]
    public async Task<IActionResult> UpdateWritingExercise(
        int id,
        [FromBody] AdminWritingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var exercise = await _service.UpdateWritingExerciseAsync(
                id,
                request,
                cancellationToken);
            return exercise is null
                ? NotFound(new { message = "Không tìm thấy đề Writing." })
                : Ok(exercise);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPatch("writing/{id:int}/status")]
    public async Task<IActionResult> SetWritingExerciseStatus(
        int id,
        [FromBody] UpdateWritingStatusRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return await _service.SetWritingExerciseStatusAsync(
                id,
                request.Status,
                cancellationToken)
                ? NoContent()
                : NotFound(new { message = "Không tìm thấy đề Writing." });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpDelete("writing/{id:int}")]
    public async Task<IActionResult> DeleteWritingExercise(
        int id,
        CancellationToken cancellationToken)
    {
        try
        {
            await _service.DeleteWritingExerciseAsync(id, cancellationToken);
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

    [HttpGet("writing/submissions")]
    public async Task<IActionResult> GetWritingSubmissions(
        [FromQuery] AdminWritingSubmissionQueryDto query,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _service.GetWritingSubmissionsAsync(query, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpGet("writing/submissions/{attemptId:int}")]
    public async Task<IActionResult> GetWritingSubmission(
        int attemptId,
        CancellationToken cancellationToken)
    {
        try
        {
            var submission = await _service.GetWritingSubmissionAsync(
                attemptId,
                cancellationToken);
            return submission is null
                ? NotFound(new { message = "Không tìm thấy bài nộp Writing." })
                : Ok(submission);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPut("writing/submissions/{attemptId:int}")]
    public async Task<IActionResult> UpdateWritingSubmission(
        int attemptId,
        [FromBody] AdminWritingSubmissionUpdateDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var submission = await _service.UpdateWritingSubmissionAsync(
                attemptId,
                request,
                cancellationToken);
            return submission is null
                ? NotFound(new { message = "Không tìm thấy bài nộp Writing." })
                : Ok(submission);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpDelete("writing/submissions/{attemptId:int}")]
    public async Task<IActionResult> DeleteWritingSubmission(
        int attemptId,
        CancellationToken cancellationToken)
    {
        try
        {
            return await _service.DeleteWritingSubmissionAsync(attemptId, cancellationToken)
                ? NoContent()
                : NotFound(new { message = "Không tìm thấy bài nộp Writing." });
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    public sealed class UpdateWritingStatusRequest
    {
        public string Status { get; set; } = "";
    }
}
