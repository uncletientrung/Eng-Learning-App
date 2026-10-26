using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IWritingGradingRepository
{
    Task SaveAsync(
        UserWritingAttempt attempt,
        List<UserWritingCriterionScore> scores,
        CancellationToken cancellationToken = default);
}