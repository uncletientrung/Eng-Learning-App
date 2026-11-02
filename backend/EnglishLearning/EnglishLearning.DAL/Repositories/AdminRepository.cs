using System.Text.Json;
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public sealed class AdminRepository : IAdminRepository
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    private readonly AppDbContext _context;

    public AdminRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AdminDashboardDto> GetDashboardAsync(
        CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var firstMonth = new DateTime(now.Year, now.Month, 1).AddMonths(-5);
        var attempts = _context.UserWritingAttempts.AsNoTracking();
        var completed = attempts.Where(attempt => attempt.CompletedAt != null);
        var monthlyCounts = await attempts
            .Where(attempt => attempt.StartedAt >= firstMonth)
            .GroupBy(attempt => new { attempt.StartedAt.Year, attempt.StartedAt.Month })
            .Select(group => new
            {
                group.Key.Year,
                group.Key.Month,
                Count = group.Count()
            })
            .ToListAsync(cancellationToken);
        var countsByMonth = monthlyCounts.ToDictionary(
            item => $"{item.Year:D4}-{item.Month:D2}",
            item => item.Count);
        var recent = await attempts
            .OrderByDescending(attempt => attempt.CompletedAt ?? attempt.StartedAt)
            .ThenByDescending(attempt => attempt.Id)
            .Take(8)
            .Select(attempt => new AdminRecentSubmissionDto
            {
                AttemptId = attempt.Id,
                UserName = attempt.User.Name,
                ExerciseTitle = attempt.Exercise.Title,
                WritingType = attempt.Exercise.WritingType,
                SubmittedAt = attempt.CompletedAt ?? attempt.StartedAt,
                Status = attempt.CompletedAt == null ? "PENDING" : "COMPLETED"
            })
            .ToListAsync(cancellationToken);

        return new AdminDashboardDto
        {
            TotalUsers = await _context.Users.CountAsync(cancellationToken),
            TotalWritingExercises = await _context.WritingExercises.CountAsync(cancellationToken),
            TotalWritingAttempts = await attempts.CountAsync(cancellationToken),
            CompletedSubmissions = await completed.CountAsync(cancellationToken),
            PendingSubmissions = await attempts.CountAsync(
                attempt => attempt.CompletedAt == null,
                cancellationToken),
            AverageWritingScore = await completed
                .Select(attempt => (decimal?)attempt.OverallScore)
                .AverageAsync(cancellationToken),
            MonthlyActivity = Enumerable.Range(0, 6)
                .Select(offset => firstMonth.AddMonths(offset))
                .Select(month => new MonthlyWritingActivityDto
                {
                    Month = month.ToString("MM/yyyy"),
                    Count = countsByMonth.GetValueOrDefault($"{month.Year:D4}-{month.Month:D2}")
                })
                .ToList(),
            RecentSubmissions = recent
        };
    }

    public async Task<AdminPageDto<AdminWritingExerciseDto>> GetWritingExercisesAsync(
        AdminWritingExerciseQueryDto query,
        CancellationToken cancellationToken)
    {
        var exercises = _context.WritingExercises.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            exercises = exercises.Where(exercise =>
                exercise.Title.Contains(search) ||
                exercise.Topic.Name.Contains(search));
        }

        if (query.TopicId.HasValue)
            exercises = exercises.Where(exercise => exercise.TopicId == query.TopicId.Value);

        if (!string.IsNullOrWhiteSpace(query.Status))
            exercises = exercises.Where(exercise => exercise.Status == query.Status);

        var totalCount = await exercises.CountAsync(cancellationToken);
        var items = await exercises
            .OrderByDescending(exercise => exercise.CreatedAt)
            .ThenByDescending(exercise => exercise.Id)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(exercise => new AdminWritingExerciseDto
            {
                Id = exercise.Id,
                TopicId = exercise.TopicId,
                TopicName = exercise.Topic.Name,
                Title = exercise.Title,
                ImageUrl = exercise.ImageUrl,
                WritingType = exercise.WritingType,
                QuestionText = exercise.QuestionText,
                Instruction = exercise.Instruction,
                ReferenceAnswer = exercise.ReferenceAnswer,
                Status = exercise.Status,
                CreatedAt = exercise.CreatedAt,
                UpdatedAt = exercise.UpdatedAt,
                SubmissionCount = _context.UserWritingAttempts.Count(
                    attempt => attempt.ExerciseId == exercise.Id)
            })
            .ToListAsync(cancellationToken);

        return new AdminPageDto<AdminWritingExerciseDto>
        {
            Items = items,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        };
    }

    public Task<AdminWritingExerciseDto?> GetWritingExerciseAsync(
        int id,
        CancellationToken cancellationToken)
    {
        return _context.WritingExercises
            .AsNoTracking()
            .Where(exercise => exercise.Id == id)
            .Select(exercise => new AdminWritingExerciseDto
            {
                Id = exercise.Id,
                TopicId = exercise.TopicId,
                TopicName = exercise.Topic.Name,
                Title = exercise.Title,
                ImageUrl = exercise.ImageUrl,
                WritingType = exercise.WritingType,
                QuestionText = exercise.QuestionText,
                Instruction = exercise.Instruction,
                ReferenceAnswer = exercise.ReferenceAnswer,
                Status = exercise.Status,
                CreatedAt = exercise.CreatedAt,
                UpdatedAt = exercise.UpdatedAt,
                SubmissionCount = _context.UserWritingAttempts.Count(
                    attempt => attempt.ExerciseId == exercise.Id)
            })
            .SingleOrDefaultAsync(cancellationToken);
    }

    public Task<bool> TopicIsWritingAsync(
        int topicId,
        CancellationToken cancellationToken)
    {
        return _context.Topics.AnyAsync(
            topic => topic.Id == topicId && topic.ModuleType == "WRITING",
            cancellationToken);
    }

    public async Task AddWritingExerciseAsync(
        WritingExercise exercise,
        CancellationToken cancellationToken)
    {
        await _context.WritingExercises.AddAsync(exercise, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> UpdateWritingExerciseAsync(
        int id,
        WritingExercise updatedExercise,
        CancellationToken cancellationToken)
    {
        var exercise = await _context.WritingExercises
            .SingleOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (exercise is null)
            return false;

        exercise.TopicId = updatedExercise.TopicId;
        exercise.Title = updatedExercise.Title;
        exercise.ImageUrl = updatedExercise.ImageUrl;
        exercise.WritingType = updatedExercise.WritingType;
        exercise.QuestionText = updatedExercise.QuestionText;
        exercise.Instruction = updatedExercise.Instruction;
        exercise.ReferenceAnswer = updatedExercise.ReferenceAnswer;
        exercise.Status = updatedExercise.Status;
        exercise.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> SetWritingExerciseStatusAsync(
        int id,
        string status,
        CancellationToken cancellationToken)
    {
        var exercise = await _context.WritingExercises
            .SingleOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (exercise is null)
            return false;

        exercise.Status = status;
        exercise.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<ExerciseDeleteResult> DeleteWritingExerciseAsync(
        int id,
        CancellationToken cancellationToken)
    {
        var exercise = await _context.WritingExercises
            .SingleOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (exercise is null)
            return new ExerciseDeleteResult(false, false);

        var hasSubmissions = await _context.UserWritingAttempts.AnyAsync(
            attempt => attempt.ExerciseId == id,
            cancellationToken);
        if (hasSubmissions)
            return new ExerciseDeleteResult(true, true);

        _context.WritingExercises.Remove(exercise);
        await _context.SaveChangesAsync(cancellationToken);
        return new ExerciseDeleteResult(true, false);
    }

    public async Task<AdminPageDto<AdminWritingSubmissionDto>> GetWritingSubmissionsAsync(
        AdminWritingSubmissionQueryDto query,
        CancellationToken cancellationToken)
    {
        var submissions = _context.UserWritingAttempts.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            submissions = submissions.Where(attempt =>
                attempt.User.Name.Contains(search) ||
                attempt.User.Username.Contains(search) ||
                attempt.Exercise.Title.Contains(search));
        }

        if (query.Status == "PENDING")
            submissions = submissions.Where(attempt => attempt.CompletedAt == null);
        else if (query.Status == "COMPLETED")
            submissions = submissions.Where(attempt => attempt.CompletedAt != null);

        if (query.ExerciseId.HasValue)
            submissions = submissions.Where(attempt =>
                attempt.ExerciseId == query.ExerciseId.Value);
        if (query.UserId.HasValue)
            submissions = submissions.Where(attempt =>
                attempt.UserId == query.UserId.Value);

        if (query.MinimumScore.HasValue)
            submissions = submissions.Where(attempt => attempt.OverallScore >= query.MinimumScore.Value);
        if (query.MaximumScore.HasValue)
            submissions = submissions.Where(attempt => attempt.OverallScore <= query.MaximumScore.Value);
        if (query.From.HasValue)
            submissions = submissions.Where(attempt =>
                (attempt.CompletedAt ?? attempt.StartedAt) >= query.From.Value);
        if (query.To.HasValue)
            submissions = submissions.Where(attempt =>
                (attempt.CompletedAt ?? attempt.StartedAt) < query.To.Value.Date.AddDays(1));

        var totalCount = await submissions.CountAsync(cancellationToken);
        var items = await submissions
            .OrderByDescending(attempt => attempt.CompletedAt ?? attempt.StartedAt)
            .ThenByDescending(attempt => attempt.Id)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(attempt => new AdminWritingSubmissionDto
            {
                AttemptId = attempt.Id,
                UserId = attempt.UserId,
                FullName = attempt.User.Name,
                Username = attempt.User.Username,
                Email = attempt.User.Email,
                ExerciseId = attempt.ExerciseId,
                ExerciseTitle = attempt.Exercise.Title,
                TopicName = attempt.Exercise.Topic.Name,
                OverallScore = attempt.OverallScore,
                Status = attempt.CompletedAt == null ? "PENDING" : "COMPLETED",
                StartedAt = attempt.StartedAt,
                CompletedAt = attempt.CompletedAt
            })
            .ToListAsync(cancellationToken);

        return new AdminPageDto<AdminWritingSubmissionDto>
        {
            Items = items,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        };
    }

    public async Task<AdminWritingSubmissionDetailDto?> GetWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        var attempt = await _context.UserWritingAttempts
            .AsNoTracking()
            .Include(item => item.User)
            .Include(item => item.Exercise)
                .ThenInclude(exercise => exercise.Topic)
            .Include(item => item.CriterionScores)
            .SingleOrDefaultAsync(item => item.Id == attemptId, cancellationToken);
        if (attempt is null)
            return null;

        return new AdminWritingSubmissionDetailDto
        {
            AttemptId = attempt.Id,
            UserId = attempt.UserId,
            FullName = attempt.User.Name,
            Username = attempt.User.Username,
            Email = attempt.User.Email,
            ExerciseId = attempt.ExerciseId,
            ExerciseTitle = attempt.Exercise.Title,
            TopicName = attempt.Exercise.Topic.Name,
            OverallScore = attempt.OverallScore,
            Status = attempt.CompletedAt == null ? "PENDING" : "COMPLETED",
            StartedAt = attempt.StartedAt,
            CompletedAt = attempt.CompletedAt,
            QuestionText = attempt.Exercise.QuestionText,
            Instruction = attempt.Exercise.Instruction,
            ImageUrl = attempt.Exercise.ImageUrl,
            UserResponse = attempt.UserResponse,
            Criteria = attempt.CriterionScores
                .OrderBy(score => score.CriterionCode)
                .Select(score => new AdminWritingCriterionDto
                {
                    CriterionCode = score.CriterionCode,
                    Score = score.Score,
                    Feedback = score.Feedback,
                    Strengths = score.Strengths,
                    Weaknesses = score.Weaknesses,
                    Suggestions = score.Suggestions,
                    Issues = JsonSerializer.Deserialize<List<AdminWritingIssueDto>>(
                        score.Issues,
                        JsonOptions) ?? []
                })
                .ToList()
        };
    }

    public async Task<bool> UpdateWritingSubmissionAsync(
        int attemptId,
        decimal overallScore,
        List<AdminWritingCriterionUpdateDto> criteria,
        CancellationToken cancellationToken)
    {
        var attempt = await _context.UserWritingAttempts
            .Include(item => item.CriterionScores)
            .SingleOrDefaultAsync(item => item.Id == attemptId, cancellationToken);
        if (attempt is null)
            return false;

        attempt.OverallScore = overallScore;
        var existingScores = attempt.CriterionScores
            .ToDictionary(score => score.CriterionCode, StringComparer.Ordinal);

        foreach (var criterion in criteria)
        {
            if (!existingScores.TryGetValue(criterion.CriterionCode, out var score))
            {
                score = new UserWritingCriterionScore
                {
                    AttemptId = attempt.Id,
                    CriterionCode = criterion.CriterionCode,
                    Issues = "[]"
                };
                attempt.CriterionScores.Add(score);
            }

            score.Score = criterion.Score;
            score.Feedback = criterion.Feedback;
            score.Strengths = criterion.Strengths;
            score.Weaknesses = criterion.Weaknesses;
            score.Suggestions = criterion.Suggestions;
        }

        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        var attempt = await _context.UserWritingAttempts
            .SingleOrDefaultAsync(item => item.Id == attemptId, cancellationToken);
        if (attempt is null)
            return false;

        _context.UserWritingAttempts.Remove(attempt);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}
