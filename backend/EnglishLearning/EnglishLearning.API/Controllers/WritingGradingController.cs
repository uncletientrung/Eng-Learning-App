using System.Security.Claims;
using EnglishLearning.BLL.DTOs.WritingGrading;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/writing-grading")]
[Authorize]
public class WritingGradingController : ControllerBase
{
    private readonly IWritingGradingService _service;
    private readonly ILogger<WritingGradingController> _logger;

    public WritingGradingController(
        IWritingGradingService service,
        ILogger<WritingGradingController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Grade(
        [FromBody] WritingGradingRequestDto request,
        CancellationToken cancellationToken)
    {
        // ID người dùng lấy từ claims do hệ thống xác thực cung cấp.
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized(new
            {
                message = "Không xác định được người dùng."
            });

        try
        {
            var result = await _service.GradeAsync(userId, request, cancellationToken);
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
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            _logger.LogWarning("Gemini grading request timed out.");

            return StatusCode(504, new
            {
                message = "Gemini xử lý quá thời gian chờ. Bài chưa được chấm hoặc lưu; vui lòng thử lại sau."
            });
        }
        catch (HttpRequestException ex)
        {
            if (ex.StatusCode is HttpStatusCode.Unauthorized or HttpStatusCode.Forbidden)
            {
                _logger.LogError(
                    "Gemini rejected the configured API key with HTTP {StatusCode}.",
                    (int)ex.StatusCode.Value);

                return StatusCode(502, new
                {
                    message = "Gemini từ chối API key (HTTP " +
                        $"{(int)ex.StatusCode.Value}). Hãy kiểm tra Gemini:ApiKey."
                });
            }

            if (ex.StatusCode == HttpStatusCode.TooManyRequests)
            {
                _logger.LogWarning(
                    "Gemini quota or rate limit reached (HTTP {StatusCode}).",
                    (int)ex.StatusCode.Value);

                return StatusCode(502, new
                {
                    message = "Gemini đã hết quota hoặc đang giới hạn yêu cầu (HTTP 429)."
                });
            }

            if (ex.StatusCode == HttpStatusCode.ServiceUnavailable)
            {
                _logger.LogWarning(
                    "Gemini is temporarily unavailable after retrying.");

                return StatusCode(503, new
                {
                    message = "Gemini hiện đang quá tải hoặc tạm thời không khả dụng. " +
                        "Hệ thống đã tự thử lại; vui lòng đợi một chút rồi thử lại."
                });
            }

            if (ex.StatusCode == HttpStatusCode.BadRequest)
            {
                _logger.LogError(
                    "Gemini rejected the grading request with HTTP {StatusCode}.",
                    (int)ex.StatusCode.Value);

                return StatusCode(502, new
                {
                    message = "Gemini từ chối request (HTTP 400). Hãy kiểm tra tên model và cấu hình request."
                });
            }

            if (ex.StatusCode == HttpStatusCode.NotFound)
            {
                _logger.LogError(
                    "Gemini model or API endpoint was not found: {ProviderError}",
                    ex.Message);

                return StatusCode(502, new
                {
                    message = "Gemini trả về 404: " + ex.Message +
                        " Kiểm tra Gemini:Model có hỗ trợ generateContent."
                });
            }

            _logger.LogError(
                "Gemini request failed with HTTP {StatusCode}.",
                ex.StatusCode is null ? null : (int)ex.StatusCode.Value);

            return StatusCode(502, new
            {
                message = ex.StatusCode is null
                    ? "Không thể kết nối tới Gemini. Hãy kiểm tra mạng, DNS hoặc firewall backend."
                    : $"Gemini trả về lỗi HTTP {(int)ex.StatusCode.Value}."
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