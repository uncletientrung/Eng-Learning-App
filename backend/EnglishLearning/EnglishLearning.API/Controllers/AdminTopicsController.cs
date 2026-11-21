using System.Security.Claims;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/admin/topics")]
[Authorize(Roles = "ADMIN")]
public sealed class AdminTopicsController : ControllerBase
{
    private const string NotFoundMessage = "Không tìm thấy topic.";

    private readonly IAdminTopicService _service;
    private readonly ILogger<AdminTopicsController> _logger;

    public AdminTopicsController(
        IAdminTopicService service,
        ILogger<AdminTopicsController> logger)
    {
        _service = service;
        _logger = logger;
    }

    private string ActorId => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "unknown";

    [HttpGet]
    public Task<IActionResult> GetTopics(
        [FromQuery] AdminTopicQueryDto query,
        CancellationToken cancellationToken) =>
        Execute(async () => Ok(await _service.GetTopicsAsync(query, cancellationToken)));

    [HttpGet("{id:int}")]
    public Task<IActionResult> GetTopic(int id, CancellationToken cancellationToken) =>
        Execute(async () =>
        {
            var topic = await _service.GetTopicAsync(id, cancellationToken);
            return topic is null ? NotFound(new { message = NotFoundMessage }) : Ok(topic);
        });

    [HttpGet("{id:int}/usage")]
    public Task<IActionResult> GetUsage(int id, CancellationToken cancellationToken) =>
        Execute(async () =>
        {
            var topic = await _service.GetTopicAsync(id, cancellationToken);
            return topic is null ? NotFound(new { message = NotFoundMessage }) : Ok(topic.Usage);
        });

    [HttpPost]
    public Task<IActionResult> CreateTopic(
        [FromBody] SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken) =>
        Execute(async () =>
        {
            var topic = await _service.CreateTopicAsync(request, cancellationToken);
            _logger.LogInformation("Admin {ActorId} created topic {TopicId}.", ActorId, topic.Id);
            return CreatedAtAction(nameof(GetTopic), new { id = topic.Id }, topic);
        });

    [HttpPut("{id:int}")]
    public Task<IActionResult> UpdateTopic(
        int id,
        [FromBody] SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken) =>
        Execute(async () =>
        {
            var topic = await _service.UpdateTopicAsync(id, request, cancellationToken);
            if (topic is null)
                return NotFound(new { message = NotFoundMessage });

            _logger.LogInformation("Admin {ActorId} updated topic {TopicId}.", ActorId, id);
            return Ok(topic);
        });

    [HttpPatch("{id:int}/status")]
    public Task<IActionResult> SetStatus(
        int id,
        [FromBody] UpdateAdminTopicStatusRequestDto request,
        CancellationToken cancellationToken) =>
        Execute(async () =>
        {
            if (!await _service.SetStatusAsync(id, request.IsActive, cancellationToken))
                return NotFound(new { message = NotFoundMessage });

            _logger.LogInformation(
                "Admin {ActorId} set topic {TopicId} active={IsActive}.",
                ActorId,
                id,
                request.IsActive);
            return NoContent();
        });

    [HttpDelete("{id:int}")]
    public Task<IActionResult> DeleteTopic(int id, CancellationToken cancellationToken) =>
        Execute(async () =>
        {
            if (!await _service.DeleteTopicAsync(id, cancellationToken))
                return NotFound(new { message = NotFoundMessage });

            _logger.LogInformation("Admin {ActorId} deleted topic {TopicId}.", ActorId, id);
            return NoContent();
        });

    private async Task<IActionResult> Execute(Func<Task<IActionResult>> action)
    {
        try
        {
            return await action();
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
        catch (DbUpdateException)
        {
            return Conflict(new
            {
                message = "Dữ liệu đang được sử dụng hoặc đã thay đổi. Vui lòng tải lại và thử lại."
            });
        }
    }
}
