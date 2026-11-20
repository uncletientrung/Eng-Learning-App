using System.Security.Claims;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = "ADMIN")]
public sealed class AdminUsersController : ControllerBase
{
    private readonly IAdminUserService _service;

    public AdminUsersController(IAdminUserService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers(
        [FromQuery] AdminUserQueryDto query,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _service.GetUsersAsync(query, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetUser(
        int id,
        CancellationToken cancellationToken)
    {
        try
        {
            var user = await _service.GetUserAsync(id, cancellationToken);
            return user is null
                ? NotFound(new { message = "Không tìm thấy người dùng." })
                : Ok(user);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(
        [FromBody] CreateAdminUserRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var user = await _service.CreateUserAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
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

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProfile(
        int id,
        [FromBody] UpdateAdminUserProfileRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var user = await _service.UpdateProfileAsync(id, request, cancellationToken);
            return user is null
                ? NotFound(new { message = "Không tìm thấy người dùng." })
                : Ok(user);
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

    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> SetStatus(
        int id,
        [FromBody] UpdateAdminUserStatusRequestDto request,
        CancellationToken cancellationToken)
    {
        if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var actorUserId))
            return Unauthorized();

        try
        {
            return await _service.SetStatusAsync(
                id,
                request.IsActive,
                actorUserId,
                cancellationToken)
                ? NoContent()
                : NotFound(new { message = "Không tìm thấy người dùng." });
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
}
