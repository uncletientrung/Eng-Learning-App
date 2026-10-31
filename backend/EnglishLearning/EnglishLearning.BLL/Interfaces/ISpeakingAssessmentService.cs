using EnglishLearning.BLL.DTOs.SpeakingAssessment;

namespace EnglishLearning.BLL.Interfaces;

public interface ISpeakingAssessmentService
{
    Task<SpeakingAttemptCreatedDto> CreateAttemptAsync(
        int userId,
        int exerciseId,
        bool startNewAttempt = false,
        CancellationToken cancellationToken = default);

    Task SaveAnswerAsync(
        int userId,
        int attemptId,
        int questionId,
        string transcript,
        Stream audio,
        long audioLength,
        string contentType,
        CancellationToken cancellationToken = default);

    Task SubmitAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default);

    Task<SpeakingAttemptStatusDto?> GetAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default);

    Task RetryGradingAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<int>> GetUnfinishedAttemptIdsAsync(
        CancellationToken cancellationToken = default);

    Task ProcessGradingAsync(
        int attemptId,
        CancellationToken cancellationToken = default);
}
