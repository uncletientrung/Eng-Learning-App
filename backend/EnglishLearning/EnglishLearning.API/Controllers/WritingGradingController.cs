using System.Security.Claims;
using EnglishLearning.BLL.DTOs.WritingGrading;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/writing-grading")]
[Authorize]
public class WritingGradingController : ControllerBase
{
    private readonly IWritingGradingService _service;

    public WritingGradingController(IWritingGradingService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Grade(
        [FromBody] WritingGradingRequestDto request,
        CancellationToken cancellationToken)
    {
        // ID người dùng lấy từ claims do hệ thống xác thực cung cấp.
        var userIdClaim = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized(new
            {
                message = "Không xác định được người dùng."
            });

        try
        {
            var result = await _service.GradeAsync(
                userId, request, cancellationToken);

            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (HttpRequestException)
        {
            return StatusCode(502, new
            {
                message = "Không thể kết nối dịch vụ chấm bài."
            });
        }
        catch (System.Text.Json.JsonException)
        {
            return StatusCode(502, new
            {
                message = "Dịch vụ chấm bài trả về dữ liệu không hợp lệ."
            });
        }
        catch (InvalidOperationException)
        {
            return StatusCode(502, new
            {
                message = "Không thể xử lý kết quả chấm bài."
            });
        }
    }
}