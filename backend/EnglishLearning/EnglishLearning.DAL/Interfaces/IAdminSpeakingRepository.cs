using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.DAL.Interfaces;

public interface IAdminSpeakingRepository
{
    Task<AdminPageDto<AdminSpeakingExerciseDto>> GetExercisesAsync(
        AdminSpeakingExerciseQueryDto query,
        CancellationToken cancellationToken);

    Task<SpeakingExercise?> GetExerciseAsync(
        int id,
        CancellationToken cancellationToken);

    Task<SpeakingExercise?> GetExerciseForUpdateAsync(
        int id,
        CancellationToken cancellationToken);

    Task<bool> IsSpeakingTopicAsync(
        int topicId,
        CancellationToken cancellationToken);

    Task<bool> HasAttemptsAsync(
        int exerciseId,
        CancellationToken cancellationToken);

    Task<int> GetAttemptCountAsync(
        int exerciseId,
        CancellationToken cancellationToken);

    Task<int> CreateExerciseAsync(
        SpeakingExercise exercise,
        CancellationToken cancellationToken);

    Task UpdateExerciseAsync(
        SpeakingExercise exercise,
        IReadOnlyCollection<SpeakingQuestion> questions,
        CancellationToken cancellationToken);

    Task<bool> SetExerciseStatusAsync(
        int id,
        bool isActive,
        CancellationToken cancellationToken);

    Task<SpeakingExerciseDeleteResult> DeleteExerciseAsync(
        int id,
        CancellationToken cancellationToken);

    Task<AdminPageDto<AdminSpeakingSubmissionDto>> GetSubmissionsAsync(
        AdminSpeakingSubmissionQueryDto query,
        CancellationToken cancellationToken);

    Task<UserSpeakingAttempt?> GetSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);

    Task<UserSpeakingAnswer?> GetAnswerWithAttemptAsync(
        int answerId,
        CancellationToken cancellationToken);

    Task<bool> UpdateSubmissionAsync(
        int attemptId,
        decimal overallScore,
        IReadOnlyCollection<AdminSpeakingCriterionUpdateDto> criteria,
        CancellationToken cancellationToken);

    Task<bool> DeleteSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);

    Task<bool> RetryGradingAsync(
        int attemptId,
        CancellationToken cancellationToken);
}

public sealed record SpeakingExerciseDeleteResult(bool Exists, bool HasAttempts);
