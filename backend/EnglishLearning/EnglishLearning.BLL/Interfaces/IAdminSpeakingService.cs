using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Interfaces;

public interface IAdminSpeakingService
{
    Task<AdminPageDto<AdminSpeakingExerciseDto>> GetExercisesAsync(
        AdminSpeakingExerciseQueryDto query,
        CancellationToken cancellationToken);

    Task<AdminSpeakingExerciseDto?> GetExerciseAsync(
        int id,
        CancellationToken cancellationToken);

    Task<AdminSpeakingExerciseDto> CreateExerciseAsync(
        AdminSpeakingExerciseRequestDto request,
        CancellationToken cancellationToken);

    Task<AdminSpeakingExerciseDto?> UpdateExerciseAsync(
        int id,
        AdminSpeakingExerciseRequestDto request,
        CancellationToken cancellationToken);

    Task<bool> SetExerciseStatusAsync(
        int id,
        bool isActive,
        CancellationToken cancellationToken);

    Task<AdminPageDto<AdminSpeakingSubmissionDto>> GetSubmissionsAsync(
        AdminSpeakingSubmissionQueryDto query,
        CancellationToken cancellationToken);

    Task<AdminSpeakingSubmissionDetailDto?> GetSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);

    Task<AdminSpeakingSubmissionDetailDto?> UpdateSubmissionAsync(
        int attemptId,
        AdminSpeakingSubmissionUpdateDto request,
        CancellationToken cancellationToken);

    Task<bool> DeleteSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);

    Task<AdminSpeakingAudioFile?> GetAudioFileAsync(
        int answerId,
        CancellationToken cancellationToken);

    Task<bool> RetryGradingAsync(
        int attemptId,
        CancellationToken cancellationToken);
}
