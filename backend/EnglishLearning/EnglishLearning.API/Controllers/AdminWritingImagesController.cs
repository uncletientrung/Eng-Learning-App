using EnglishLearning.API.Services;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/admin/writing")]
[Authorize(Roles = "ADMIN")]
public sealed class AdminWritingImagesController(
    IAdminService service,
    WritingImageStorage images,
    ILogger<AdminWritingImagesController> logger) : ControllerBase
{
    [HttpPost("with-image")]
    [RequestSizeLimit(6 * 1024 * 1024)]
    public async Task<IActionResult> Create(
        [FromForm] AdminWritingExerciseRequestDto request,
        [FromForm] IFormFile image,
        CancellationToken cancellationToken)
    {
        try
        {
            request.ImageUrl = await images.SaveAsync(image, cancellationToken);
            try
            {
                var exercise = await service.CreateWritingExerciseAsync(request, cancellationToken);
                return CreatedAtAction(nameof(AdminController.GetWritingExercise), "Admin", new { id = exercise.Id }, exercise);
            }
            catch
            {
                logger.LogWarning("Writing creation failed after saving image {ImageUrl}; the file may need cleanup.", request.ImageUrl);
                throw;
            }
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPut("{id:int}/with-image")]
    [RequestSizeLimit(6 * 1024 * 1024)]
    public async Task<IActionResult> Update(
        int id,
        [FromForm] AdminWritingExerciseRequestDto request,
        [FromForm] IFormFile image,
        CancellationToken cancellationToken)
    {
        try
        {
            if (await service.GetWritingExerciseAsync(id, cancellationToken) is null)
                return NotFound(new { message = "Không tìm thấy đề Writing." });

            request.ImageUrl = await images.SaveAsync(image, cancellationToken);
            try
            {
                var exercise = await service.UpdateWritingExerciseAsync(id, request, cancellationToken);
                if (exercise is null)
                {
                    logger.LogWarning("Writing exercise {ExerciseId} disappeared after saving image {ImageUrl}; the file may need cleanup.", id, request.ImageUrl);
                    return NotFound(new { message = "Không tìm thấy đề Writing." });
                }
                return Ok(exercise);
            }
            catch
            {
                logger.LogWarning("Writing exercise {ExerciseId} update failed after saving image {ImageUrl}; the file may need cleanup.", id, request.ImageUrl);
                throw;
            }
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }
}
