using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/translation-exercises")]
public sealed class TranslationExercisesController(AppDbContext db) : ControllerBase
{
    [HttpGet("parents")]
    public async Task<IActionResult> GetParents(CancellationToken cancellationToken)
    {
        var parents = await db.TranslationExercises
            .AsNoTracking()
            .Where(exercise => exercise.ParentId == null)
            .OrderBy(exercise => exercise.Id)
            .Select(exercise => new
            {
                id = exercise.Id,
                title = exercise.Title,
                exerciseCount = db.TranslationExercises.Count(child => child.ParentId == exercise.Id)
            })
            .ToListAsync(cancellationToken);

        return Ok(parents);
    }

    [HttpGet("parents/{parentId:int}/exercises")]
    public async Task<IActionResult> GetExercises(int parentId, CancellationToken cancellationToken)
    {
        var parent = await db.TranslationExercises
            .AsNoTracking()
            .Where(exercise => exercise.Id == parentId && exercise.ParentId == null)
            .Select(exercise => new { exercise.Id, exercise.Title, exercise.Level })
            .SingleOrDefaultAsync(cancellationToken);

        if (parent is null) return NotFound(new { message = "Không tìm thấy nhóm bài dịch." });

        var exercises = await db.TranslationExercises
            .AsNoTracking()
            .Where(exercise => exercise.ParentId == parentId)
            .OrderBy(exercise => exercise.DisplayOrder)
            .ThenBy(exercise => exercise.Id)
            .Select(exercise => new
            {
                id = exercise.Id,
                title = exercise.Title,
                displayOrder = exercise.DisplayOrder,
                itemCount = db.TranslationExerciseContents.Count(content => content.ParentId == exercise.Id)
            })
            .ToListAsync(cancellationToken);

        return Ok(new { parent, exercises });
    }

    [HttpGet("{exerciseId:int}/content")]
    public async Task<IActionResult> GetExerciseContent(int exerciseId, CancellationToken cancellationToken)
    {
        var exercise = await db.TranslationExercises
            .AsNoTracking()
            .Where(item => item.Id == exerciseId && item.ParentId != null)
            .Select(item => new
            {
                item.Id,
                item.Title,
                parentId = item.ParentId,
                parentTitle = item.Parent!.Title
            })
            .SingleOrDefaultAsync(cancellationToken);

        if (exercise is null) return NotFound(new { message = "Không tìm thấy bài tập dịch." });

        var content = await db.TranslationExerciseContents
            .AsNoTracking()
            .Where(item => item.ParentId == exerciseId)
            .OrderBy(item => item.DisplayOrder)
            .ThenBy(item => item.Id)
            .Select(item => new
            {
                id = item.Id,
                displayOrder = item.DisplayOrder,
                vi = item.viText,
                answer = item.Answer
            })
            .ToListAsync(cancellationToken);

        var passedContentIds = new HashSet<int>();
        if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
        {
            var passedIds = await db.UserTranslationAttempts
                .AsNoTracking()
                .Where(attempt => attempt.UserId == userId &&
                    attempt.ContentId.HasValue &&
                    attempt.Content != null &&
                    attempt.Content.ParentId == exerciseId)
                .Select(attempt => attempt.ContentId!.Value)
                .Distinct()
                .ToListAsync(cancellationToken);
            passedContentIds = passedIds.ToHashSet();
        }

        return Ok(new
        {
            exercise,
            content = content.Select(item => new
            {
                item.id,
                item.displayOrder,
                item.vi,
                item.answer,
                passed = passedContentIds.Contains(item.id)
            })
        });
    }

    [Authorize]
    [HttpPost("{exerciseId:int}/content/{contentId:int}/attempts")]
    public async Task<IActionResult> SubmitContent(
        int exerciseId,
        int contentId,
        [FromBody] SubmitTranslationAnswerRequest request,
        CancellationToken cancellationToken)
    {
        if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId) || userId <= 0)
        {
            return Unauthorized();
        }

        if (string.IsNullOrWhiteSpace(request.UserResponse))
        {
            return BadRequest(new { message = "Nhập bản dịch trước khi nộp." });
        }

        var content = await db.TranslationExerciseContents
            .AsNoTracking()
            .Where(item => item.Id == contentId && item.ParentId == exerciseId)
            .Select(item => new { item.Id, item.Answer })
            .SingleOrDefaultAsync(cancellationToken);

        if (content is null)
        {
            return NotFound(new { message = "Không tìm thấy câu dịch trong bài tập này." });
        }

        var passed = NormalizeForComparison(request.UserResponse) == NormalizeForComparison(content.Answer);
        if (!passed)
        {
            return Ok(new { passed = false, message = "Bản dịch chưa khớp đáp án mẫu. Hãy thử lại." });
        }

        db.UserTranslationAttempts.Add(new UserTranslationAttempt
        {
            UserId = userId,
            ContentId = contentId,
            UserResponse = request.UserResponse.Trim(),
            Score = null,
            LlmFeedback = null,
            CreatedAt = DateTime.UtcNow
        });
        await db.SaveChangesAsync(cancellationToken);

        return Ok(new { passed = true, contentId, message = "Đáp án chính xác. Tiến độ đã được lưu." });
    }

    private static string NormalizeForComparison(string value)
    {
        var words = value.Normalize(NormalizationForm.FormKC)
            .ToLowerInvariant()
            .Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries)
            .Select(word => new string(word.Where(char.IsLetterOrDigit).ToArray()))
            .Where(word => word.Length > 0);
        return string.Join(" ", words);
    }
}

public sealed record SubmitTranslationAnswerRequest(string? UserResponse);
