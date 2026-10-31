using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IWritingGradingRepository
{
    Task SaveAsync(
        UserWritingAttempt attempt,
        List<UserWritingCriterionScore> scores,
        CancellationToken cancellationToken = default);

    Task<List<UserWritingAttempt>> GetHistoryByUserIdAsync(
        int userId,
        CancellationToken cancellationToken = default);

    Task<UserWritingAttempt?> GetHistoryAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default);

    Task<List<int>> GetUnattemptedExerciseIdsAsync(
        int userId,
        CancellationToken cancellationToken = default);

    Task<bool> DeleteHistoryAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default);
}