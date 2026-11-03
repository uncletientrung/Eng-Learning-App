using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public sealed class AdminSpeakingRepository : IAdminSpeakingRepository
{
    private readonly AppDbContext _db;

    public AdminSpeakingRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<AdminPageDto<AdminSpeakingExerciseDto>> GetExercisesAsync(
        AdminSpeakingExerciseQueryDto query,
        CancellationToken cancellationToken)
    {
        var exercises = _db.SpeakingExercises.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            exercises = exercises.Where(exercise =>
                exercise.Title.Contains(search) ||
                exercise.Topic.Name.Contains(search));
        }
        if (query.TopicId.HasValue)
            exercises = exercises.Where(exercise => exercise.TopicId == query.TopicId.Value);
        if (!string.IsNullOrWhiteSpace(query.SpeakingType))
            exercises = exercises.Where(exercise => exercise.SpeakingType == query.SpeakingType);
        if (query.IsActive.HasValue)
            exercises = exercises.Where(exercise => exercise.IsActive == query.IsActive.Value);

        var totalCount = await exercises.CountAsync(cancellationToken);
        var items = await exercises
            .OrderByDescending(exercise => exercise.CreatedAt)
            .ThenByDescending(exercise => exercise.Id)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(exercise => new AdminSpeakingExerciseDto
            {
                Id = exercise.Id,
                TopicId = exercise.TopicId,
                TopicName = exercise.Topic.Name,
                Title = exercise.Title,
                SpeakingType = exercise.SpeakingType,
                CreatedAt = exercise.CreatedAt,
                IsActive = exercise.IsActive,
                QuestionCount = exercise.Questions.Count,
                SubmissionCount = _db.UserSpeakingAttempts.Count(
                    attempt => attempt.ExerciseId == exercise.Id)
            })
            .ToListAsync(cancellationToken);

        return new AdminPageDto<AdminSpeakingExerciseDto>
        {
            Items = items,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        };
    }

    public Task<SpeakingExercise?> GetExerciseAsync(
        int id,
        CancellationToken cancellationToken)
    {
        return _db.SpeakingExercises
            .AsNoTracking()
            .Include(exercise => exercise.Topic)
            .Include(exercise => exercise.Questions)
            .SingleOrDefaultAsync(exercise => exercise.Id == id, cancellationToken);
    }

    public Task<SpeakingExercise?> GetExerciseForUpdateAsync(
        int id,
        CancellationToken cancellationToken)
    {
        return _db.SpeakingExercises
            .Include(exercise => exercise.Topic)
            .Include(exercise => exercise.Questions)
            .SingleOrDefaultAsync(exercise => exercise.Id == id, cancellationToken);
    }

    public Task<bool> IsSpeakingTopicAsync(
        int topicId,
        CancellationToken cancellationToken)
    {
        return _db.Topics.AnyAsync(
            topic => topic.Id == topicId &&
                     topic.ModuleType == "SPEAKING",
            cancellationToken);
    }

    public Task<bool> HasAttemptsAsync(
        int exerciseId,
        CancellationToken cancellationToken)
    {
        return _db.UserSpeakingAttempts.AnyAsync(
            attempt => attempt.ExerciseId == exerciseId,
            cancellationToken);
    }

    public Task<int> GetAttemptCountAsync(
        int exerciseId,
        CancellationToken cancellationToken)
    {
        return _db.UserSpeakingAttempts.CountAsync(
            attempt => attempt.ExerciseId == exerciseId,
            cancellationToken);
    }

    public async Task<int> CreateExerciseAsync(
        SpeakingExercise exercise,
        CancellationToken cancellationToken)
    {
        _db.SpeakingExercises.Add(exercise);
        await _db.SaveChangesAsync(cancellationToken);
        return exercise.Id;
    }

    public async Task UpdateExerciseAsync(
        SpeakingExercise exercise,
        IReadOnlyCollection<SpeakingQuestion> questions,
        CancellationToken cancellationToken)
    {
        var existingQuestions = await _db.SpeakingQuestions
            .Where(question => question.ExerciseId == exercise.Id)
            .ToListAsync(cancellationToken);
        _db.SpeakingQuestions.RemoveRange(existingQuestions);
        _db.SpeakingQuestions.AddRange(questions);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> SetExerciseStatusAsync(
        int id,
        bool isActive,
        CancellationToken cancellationToken)
    {
        return await _db.SpeakingExercises
            .Where(exercise => exercise.Id == id)
            .ExecuteUpdateAsync(
                setters => setters.SetProperty(exercise => exercise.IsActive, isActive),
                cancellationToken) > 0;
    }

    public async Task<AdminPageDto<AdminSpeakingSubmissionDto>> GetSubmissionsAsync(
        AdminSpeakingSubmissionQueryDto query,
        CancellationToken cancellationToken)
    {
        var attempts = _db.UserSpeakingAttempts
            .AsNoTracking()
            .Include(attempt => attempt.User)
            .Include(attempt => attempt.Exercise)
                .ThenInclude(exercise => exercise.Topic)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            attempts = attempts.Where(attempt =>
                attempt.User.Name.Contains(search) ||
                attempt.User.Email.Contains(search) ||
                attempt.Exercise.Title.Contains(search));
        }
        if (!string.IsNullOrWhiteSpace(query.Status))
            attempts = attempts.Where(attempt => attempt.Status == query.Status);
        if (query.ExerciseId.HasValue)
            attempts = attempts.Where(attempt => attempt.ExerciseId == query.ExerciseId.Value);
        if (query.TopicId.HasValue)
            attempts = attempts.Where(attempt =>
                attempt.Exercise.TopicId == query.TopicId.Value);
        if (!string.IsNullOrWhiteSpace(query.SpeakingType))
            attempts = attempts.Where(attempt => attempt.Exercise.SpeakingType == query.SpeakingType);
        if (query.MinimumScore.HasValue)
            attempts = attempts.Where(attempt =>
                attempt.OverallScore >= query.MinimumScore.Value);
        if (query.MaximumScore.HasValue)
            attempts = attempts.Where(attempt =>
                attempt.OverallScore <= query.MaximumScore.Value);
        if (query.From.HasValue)
            attempts = attempts.Where(attempt =>
                (attempt.CompletedAt ?? attempt.StartedAt) >= query.From.Value);
        if (query.To.HasValue)
            attempts = attempts.Where(attempt =>
                (attempt.CompletedAt ?? attempt.StartedAt) < query.To.Value.Date.AddDays(1));

        var totalCount = await attempts.CountAsync(cancellationToken);
        var items = await attempts
            .OrderByDescending(attempt => attempt.CompletedAt ?? attempt.StartedAt)
            .ThenByDescending(attempt => attempt.Id)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(attempt => new AdminSpeakingSubmissionDto
            {
                AttemptId = attempt.Id,
                UserId = attempt.UserId,
                UserName = attempt.User.Name,
                UserEmail = attempt.User.Email,
                ExerciseId = attempt.ExerciseId,
                ExerciseTitle = attempt.Exercise.Title,
                TopicName = attempt.Exercise.Topic.Name,
                SpeakingType = attempt.Exercise.SpeakingType,
                Status = attempt.Status,
                OverallScore = attempt.OverallScore,
                StartedAt = attempt.StartedAt,
                CompletedAt = attempt.CompletedAt
            })
            .ToListAsync(cancellationToken);

        return new AdminPageDto<AdminSpeakingSubmissionDto>
        {
            Items = items,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        };
    }

    public Task<UserSpeakingAttempt?> GetSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        return _db.UserSpeakingAttempts
            .AsNoTracking()
            .Include(attempt => attempt.User)
            .Include(attempt => attempt.Exercise)
                .ThenInclude(exercise => exercise.Topic)
            .Include(attempt => attempt.UserSpeakingAnswers)
                .ThenInclude(answer => answer.Question)
            .Include(attempt => attempt.CriterionScores)
            .SingleOrDefaultAsync(attempt => attempt.Id == attemptId, cancellationToken);
    }

    public Task<UserSpeakingAnswer?> GetAnswerWithAttemptAsync(
        int answerId,
        CancellationToken cancellationToken)
    {
        return _db.UserSpeakingAnswers
            .AsNoTracking()
            .Include(answer => answer.Attempt)
            .SingleOrDefaultAsync(answer => answer.Id == answerId, cancellationToken);
    }

    public async Task<bool> UpdateSubmissionAsync(
        int attemptId,
        decimal overallScore,
        IReadOnlyCollection<AdminSpeakingCriterionUpdateDto> criteria,
        CancellationToken cancellationToken)
    {
        var attempt = await _db.UserSpeakingAttempts
            .Include(item => item.CriterionScores)
            .SingleOrDefaultAsync(
                item => item.Id == attemptId && item.Status == "GRADED",
                cancellationToken);
        if (attempt is null)
            return false;

        attempt.OverallScore = overallScore;
        var criteriaByCode = criteria.ToDictionary(
            criterion => criterion.CriterionCode,
            StringComparer.Ordinal);

        foreach (var existing in attempt.CriterionScores
                     .Where(score => !criteriaByCode.ContainsKey(score.CriterionCode))
                     .ToList())
        {
            _db.SpeakingCriterionScores.Remove(existing);
        }

        foreach (var criterion in criteria)
        {
            var score = attempt.CriterionScores
                .SingleOrDefault(item => item.CriterionCode == criterion.CriterionCode);
            if (score is null)
            {
                score = new SpeakingCriterionScore
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

        await _db.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        return await _db.UserSpeakingAttempts
            .Where(attempt =>
                attempt.Id == attemptId &&
                (attempt.Status == "GRADED" ||
                 attempt.Status == "GRADING_FAILED" ||
                 attempt.Status == "ABANDONED"))
            .ExecuteDeleteAsync(cancellationToken) > 0;
    }

    public async Task<bool> RetryGradingAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        return await _db.UserSpeakingAttempts
            .Where(attempt =>
                attempt.Id == attemptId &&
                attempt.Status == "GRADING_FAILED")
            .ExecuteUpdateAsync(
                setters => setters
                    .SetProperty(attempt => attempt.Status, "SUBMITTED"),
                cancellationToken) > 0;
    }
}
