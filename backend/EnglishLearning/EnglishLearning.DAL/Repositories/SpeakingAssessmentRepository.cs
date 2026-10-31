using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public sealed class SpeakingAssessmentRepository : ISpeakingAssessmentRepository
{
    private readonly AppDbContext _db;

    public SpeakingAssessmentRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<SpeakingExercise?> GetExerciseWithQuestionsAsync(
        int exerciseId,
        CancellationToken cancellationToken = default)
    {
        return _db.SpeakingExercises
            .Include(exercise => exercise.Questions)
            .SingleOrDefaultAsync(
                exercise => exercise.Id == exerciseId,
                cancellationToken);
    }

    public Task<UserSpeakingAttempt?> GetInProgressAttemptAsync(
        int userId,
        int exerciseId,
        CancellationToken cancellationToken = default)
    {
        return _db.UserSpeakingAttempts
            .Where(attempt =>
                attempt.UserId == userId &&
                attempt.ExerciseId == exerciseId &&
                attempt.Status == "IN_PROGRESS")
            .OrderByDescending(attempt => attempt.Id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task AddAttemptAsync(
        UserSpeakingAttempt attempt,
        CancellationToken cancellationToken = default)
    {
        _db.UserSpeakingAttempts.Add(attempt);
        await _db.SaveChangesAsync(cancellationToken);
    }

    public Task<UserSpeakingAttempt?> GetOwnedAttemptAsync(
        int userId,
        int attemptId,
        bool includeAnswers = false,
        CancellationToken cancellationToken = default)
    {
        var query = _db.UserSpeakingAttempts
            .Where(attempt =>
                attempt.Id == attemptId &&
                attempt.UserId == userId);

        if (includeAnswers)
        {
            query = query
                .Include(attempt => attempt.Exercise)
                .Include(attempt => attempt.UserSpeakingAnswers)
                    .ThenInclude(answer => answer.Question);
        }

        return query.SingleOrDefaultAsync(cancellationToken);
    }

    public Task<UserSpeakingAttempt?> GetAttemptForGradingAsync(
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        return _db.UserSpeakingAttempts
            .Include(attempt => attempt.Exercise)
                .ThenInclude(exercise => exercise.Questions)
            .Include(attempt => attempt.UserSpeakingAnswers)
                .ThenInclude(answer => answer.Question)
            .SingleOrDefaultAsync(
                attempt => attempt.Id == attemptId,
                cancellationToken);
    }

    public Task<bool> QuestionBelongsToExerciseAsync(
        int questionId,
        int exerciseId,
        CancellationToken cancellationToken = default)
    {
        return _db.SpeakingQuestions.AnyAsync(
            question =>
                question.Id == questionId &&
                question.ExerciseId == exerciseId,
            cancellationToken);
    }

    public Task<UserSpeakingAnswer?> GetAnswerAsync(
        int attemptId,
        int questionId,
        CancellationToken cancellationToken = default)
    {
        return _db.UserSpeakingAnswers.SingleOrDefaultAsync(
            answer =>
                answer.AttemptId == attemptId &&
                answer.QuestionId == questionId,
            cancellationToken);
    }

    public async Task SaveAnswerAsync(
        UserSpeakingAnswer answer,
        CancellationToken cancellationToken = default)
    {
        if (answer.Id == 0)
            _db.UserSpeakingAnswers.Add(answer);

        await _db.SaveChangesAsync(cancellationToken);
    }

    public Task<List<int>> GetQuestionIdsAsync(
        int exerciseId,
        CancellationToken cancellationToken = default)
    {
        return _db.SpeakingQuestions
            .Where(question => question.ExerciseId == exerciseId)
            .Select(question => question.Id)
            .ToListAsync(cancellationToken);
    }

    public Task<List<UserSpeakingAnswer>> GetAnswersAsync(
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        return _db.UserSpeakingAnswers
            .Where(answer => answer.AttemptId == attemptId)
            .ToListAsync(cancellationToken);
    }

    public Task<List<SpeakingCriterionScore>> GetCriterionScoresAsync(
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        return _db.SpeakingCriterionScores
            .AsNoTracking()
            .Where(score => score.AttemptId == attemptId)
            .OrderBy(score => score.CriterionCode)
            .ToListAsync(cancellationToken);
    }

    public Task SaveAttemptAsync(
        UserSpeakingAttempt attempt,
        CancellationToken cancellationToken = default)
    {
        return _db.SaveChangesAsync(cancellationToken);
    }

    public async Task SaveGradingResultAsync(
        UserSpeakingAttempt attempt,
        List<SpeakingCriterionScore> scores,
        string gradingResult,
        CancellationToken cancellationToken = default)
    {
        await using var transaction =
            await _db.Database.BeginTransactionAsync(cancellationToken);

        var existingScores = await _db.SpeakingCriterionScores
            .Where(score => score.AttemptId == attempt.Id)
            .ToListAsync(cancellationToken);
        _db.SpeakingCriterionScores.RemoveRange(existingScores);
        await _db.SaveChangesAsync(cancellationToken);

        foreach (var score in scores)
            score.AttemptId = attempt.Id;

        _db.SpeakingCriterionScores.AddRange(scores);
        attempt.GradingResult = gradingResult;
        attempt.Status = "GRADED";
        await _db.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<int>> GetUnfinishedAttemptIdsAsync(
        CancellationToken cancellationToken = default)
    {
        return await _db.UserSpeakingAttempts
            .Where(attempt =>
                attempt.Status == "SUBMITTED" ||
                attempt.Status == "GRADING")
            .Select(attempt => attempt.Id)
            .ToListAsync(cancellationToken);
    }
}
