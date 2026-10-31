using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface ISpeakingAssessmentRepository
{
    Task<SpeakingExercise?> GetExerciseWithQuestionsAsync(
        int exerciseId,
        CancellationToken cancellationToken = default);

    Task<UserSpeakingAttempt?> GetInProgressAttemptAsync(
        int userId,
        int exerciseId,
        CancellationToken cancellationToken = default);

    Task AddAttemptAsync(
        UserSpeakingAttempt attempt,
        CancellationToken cancellationToken = default);

    Task<UserSpeakingAttempt?> GetOwnedAttemptAsync(
        int userId,
        int attemptId,
        bool includeAnswers = false,
        CancellationToken cancellationToken = default);

    Task<UserSpeakingAttempt?> GetAttemptForGradingAsync(
        int attemptId,
        CancellationToken cancellationToken = default);

    Task<bool> QuestionBelongsToExerciseAsync(
        int questionId,
        int exerciseId,
        CancellationToken cancellationToken = default);

    Task<UserSpeakingAnswer?> GetAnswerAsync(
        int attemptId,
        int questionId,
        CancellationToken cancellationToken = default);

    Task SaveAnswerAsync(
        UserSpeakingAnswer answer,
        CancellationToken cancellationToken = default);

    Task<List<int>> GetQuestionIdsAsync(
        int exerciseId,
        CancellationToken cancellationToken = default);

    Task<List<UserSpeakingAnswer>> GetAnswersAsync(
        int attemptId,
        CancellationToken cancellationToken = default);

    Task<List<SpeakingCriterionScore>> GetCriterionScoresAsync(
        int attemptId,
        CancellationToken cancellationToken = default);

    Task SaveAttemptAsync(
        UserSpeakingAttempt attempt,
        CancellationToken cancellationToken = default);

    Task SaveGradingResultAsync(
        UserSpeakingAttempt attempt,
        List<SpeakingCriterionScore> scores,
        string gradingResult,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<int>> GetUnfinishedAttemptIdsAsync(
        CancellationToken cancellationToken = default);
}
