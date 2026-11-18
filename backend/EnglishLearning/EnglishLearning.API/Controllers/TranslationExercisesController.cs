using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.BLL.DTOs.TranslationGrading;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/translation-exercises")]
public sealed class TranslationExercisesController(
    AppDbContext db,
    ITranslationGradingService gradingService) : ControllerBase
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

        var completedByParent = new Dictionary<int, int>();
        if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId) && userId > 0)
        {
            var exercises = await db.TranslationExercises
                .AsNoTracking()
                .Where(exercise => exercise.ParentId.HasValue)
                .Select(exercise => new
                {
                    exercise.Id,
                    parentId = exercise.ParentId!.Value,
                    itemCount = db.TranslationExerciseContents.Count(content => content.ParentId == exercise.Id)
                })
                .ToListAsync(cancellationToken);

            var completedItems = await db.UserTranslationContentProgresses
                .AsNoTracking()
                .Where(progress => progress.UserId == userId && progress.IsCompleted)
                .GroupBy(progress => progress.ExerciseId)
                .Select(group => new { exerciseId = group.Key, completedCount = group.Count() })
                .ToDictionaryAsync(item => item.exerciseId, item => item.completedCount, cancellationToken);

            completedByParent = exercises
                .Where(exercise => exercise.itemCount > 0 &&
                    completedItems.GetValueOrDefault(exercise.Id) == exercise.itemCount)
                .GroupBy(exercise => exercise.parentId)
                .ToDictionary(group => group.Key, group => group.Count());
        }

        return Ok(parents.Select(parent => new
        {
            parent.id,
            parent.title,
            parent.exerciseCount,
            completedExerciseCount = completedByParent.GetValueOrDefault(parent.id),
            completionPercent = parent.exerciseCount == 0
                ? 0
                : (int)Math.Round(completedByParent.GetValueOrDefault(parent.id) * 100d / parent.exerciseCount)
        }));
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

        var completedByExercise = new Dictionary<int, int>();
        if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId) && userId > 0)
        {
            completedByExercise = await db.UserTranslationContentProgresses
                .AsNoTracking()
                .Where(progress => progress.UserId == userId && progress.IsCompleted)
                .GroupBy(progress => progress.ExerciseId)
                .Select(group => new { exerciseId = group.Key, completedCount = group.Count() })
                .ToDictionaryAsync(item => item.exerciseId, item => item.completedCount, cancellationToken);
        }

        var exerciseResults = exercises.Select(exercise =>
        {
            var completedCount = completedByExercise.GetValueOrDefault(exercise.id);
            return new
            {
                exercise.id,
                exercise.title,
                exercise.displayOrder,
                exercise.itemCount,
                completedContentCount = completedCount,
                completionPercent = exercise.itemCount == 0
                    ? 0
                    : (int)Math.Round(completedCount * 100d / exercise.itemCount),
                completed = exercise.itemCount > 0 && completedCount == exercise.itemCount
            };
        }).ToList();
        var completedExercises = exerciseResults.Count(exercise => exercise.completed);
        var completionPercent = exerciseResults.Count == 0
            ? 0
            : (int)Math.Round(completedExercises * 100d / exerciseResults.Count);

        return Ok(new
        {
            parent,
            exercises = exerciseResults,
            progress = new
            {
                completedExercises,
                totalExercises = exerciseResults.Count,
                percentage = completionPercent
            }
        });
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
                item.Level,
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

        var completedContentIds = new HashSet<int>();
        if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
        {
            var completedIds = await db.UserTranslationContentProgresses
                .AsNoTracking()
                .Where(progress => progress.UserId == userId && progress.IsCompleted &&
                    progress.ExerciseId == exerciseId)
                .Select(progress => progress.ContentId)
                .ToListAsync(cancellationToken);
            completedContentIds = completedIds.ToHashSet();
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
                completed = completedContentIds.Contains(item.id)
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
            .Select(item => new { item.Id, item.viText, item.Answer })
            .SingleOrDefaultAsync(cancellationToken);

        if (content is null)
        {
            return NotFound(new { message = "Không tìm thấy câu dịch trong bài tập này." });
        }

        var exercise = await db.TranslationExercises
            .AsNoTracking()
            .Where(item => item.Id == exerciseId)
            .Select(item => new
            {
                item.Title,
                parentExerciseName = item.Parent!.Title,
                parentExerciseLevel = item.Parent.Level
            })
            .SingleAsync(cancellationToken);

        var passed = NormalizeForComparison(request.UserResponse) == NormalizeForComparison(content.Answer);
        var attempt = new UserTranslationAttempt
        {
            UserId = userId,
            ContentId = contentId,
            UserResponse = request.UserResponse.Trim(),
            Score = passed ? (sbyte)100 : null,
            CreatedAt = DateTime.UtcNow
        };

        TranslationGradingResult? grading = null;
        if (!passed)
        {
            grading = await gradingService.GradeAsync(
                exercise.Title,
                exercise.parentExerciseName,
                exercise.parentExerciseLevel,
                content.viText,
                content.Answer,
                request.UserResponse.Trim(),
                cancellationToken);
            attempt.Score = (sbyte)grading.Score;
            attempt.LlmFeedback = JsonSerializer.Serialize(grading);
        }

        db.UserTranslationAttempts.Add(attempt);
        if (passed)
        {
            var progress = await db.UserTranslationContentProgresses
                .SingleOrDefaultAsync(item => item.UserId == userId && item.ContentId == contentId, cancellationToken);
            if (progress is null)
            {
                db.UserTranslationContentProgresses.Add(new UserTranslationContentProgress
                {
                    UserId = userId,
                    ContentId = contentId,
                    ExerciseId = exerciseId,
                    IsCompleted = true,
                    UpdatedAt = DateTime.UtcNow
                });
            }
            else
            {
                progress.IsCompleted = true;
                progress.UpdatedAt = DateTime.UtcNow;
            }
        }
        await db.SaveChangesAsync(cancellationToken);

        return Ok(passed
            ? (object)new { passed = true, contentId, score = 100, message = "Đáp án chính xác. Tiến độ đã được lưu." }
            : new { passed = false, contentId, score = grading!.Score, feedback = grading.Feedback, issues = grading.Issues, improvedVersion = grading.ImprovedVersion, message = "Bản dịch đã được chấm. Xem góp ý bên dưới." });
    }

    [Authorize]
    [HttpPut("{exerciseId:int}/content/{contentId:int}/completion")]
    public async Task<IActionResult> SetContentCompletion(
        int exerciseId,
        int contentId,
        [FromBody] SetTranslationContentCompletionRequest request,
        CancellationToken cancellationToken)
    {
        if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId) || userId <= 0)
            return Unauthorized();

        var exists = await db.TranslationExerciseContents
            .AnyAsync(item => item.Id == contentId && item.ParentId == exerciseId, cancellationToken);
        if (!exists)
            return NotFound(new { message = "Không tìm thấy câu dịch trong bài tập này." });

        var progress = await db.UserTranslationContentProgresses
            .SingleOrDefaultAsync(item => item.UserId == userId && item.ContentId == contentId && item.ExerciseId == exerciseId, cancellationToken);
        if (progress is null && request.Completed)
        {
            progress = new UserTranslationContentProgress
            {
                UserId = userId,
                ContentId = contentId,
                ExerciseId = exerciseId,
                IsCompleted = true,
                UpdatedAt = DateTime.UtcNow
            };
            db.UserTranslationContentProgresses.Add(progress);
        }
        else if (progress is not null)
        {
            progress.IsCompleted = request.Completed;
            progress.UpdatedAt = DateTime.UtcNow;
        }

        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { contentId, completed = request.Completed });
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
public sealed record SetTranslationContentCompletionRequest(bool Completed);
