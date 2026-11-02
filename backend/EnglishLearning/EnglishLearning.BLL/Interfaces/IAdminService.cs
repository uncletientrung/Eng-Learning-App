using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Interfaces;

public interface IAdminService
{
    Task<AdminDashboardDto> GetDashboardAsync(CancellationToken cancellationToken);
    Task<AdminPageDto<AdminWritingExerciseDto>> GetWritingExercisesAsync(
        AdminWritingExerciseQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminWritingExerciseDto?> GetWritingExerciseAsync(
        int id,
        CancellationToken cancellationToken);
    Task<AdminWritingExerciseDto> CreateWritingExerciseAsync(
        AdminWritingExerciseRequestDto request,
        CancellationToken cancellationToken);
    Task<AdminWritingExerciseDto?> UpdateWritingExerciseAsync(
        int id,
        AdminWritingExerciseRequestDto request,
        CancellationToken cancellationToken);
    Task<bool> SetWritingExerciseStatusAsync(
        int id,
        string status,
        CancellationToken cancellationToken);
    Task DeleteWritingExerciseAsync(int id, CancellationToken cancellationToken);
    Task<AdminPageDto<AdminWritingSubmissionDto>> GetWritingSubmissionsAsync(
        AdminWritingSubmissionQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminWritingSubmissionDetailDto?> GetWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);
    Task<AdminWritingSubmissionDetailDto?> UpdateWritingSubmissionAsync(
        int attemptId,
        AdminWritingSubmissionUpdateDto request,
        CancellationToken cancellationToken);
    Task<bool> DeleteWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);
}
