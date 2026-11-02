using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.DAL.Interfaces;

public interface IAdminRepository
{
    Task<AdminDashboardDto> GetDashboardAsync(CancellationToken cancellationToken);
    Task<AdminPageDto<AdminWritingExerciseDto>> GetWritingExercisesAsync(
        AdminWritingExerciseQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminWritingExerciseDto?> GetWritingExerciseAsync(
        int id,
        CancellationToken cancellationToken);
    Task<bool> TopicIsWritingAsync(int topicId, CancellationToken cancellationToken);
    Task AddWritingExerciseAsync(WritingExercise exercise, CancellationToken cancellationToken);
    Task<bool> UpdateWritingExerciseAsync(
        int id,
        WritingExercise updatedExercise,
        CancellationToken cancellationToken);
    Task<bool> SetWritingExerciseStatusAsync(
        int id,
        string status,
        CancellationToken cancellationToken);
    Task<ExerciseDeleteResult> DeleteWritingExerciseAsync(
        int id,
        CancellationToken cancellationToken);
    Task<AdminPageDto<AdminWritingSubmissionDto>> GetWritingSubmissionsAsync(
        AdminWritingSubmissionQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminWritingSubmissionDetailDto?> GetWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);
    Task<bool> UpdateWritingSubmissionAsync(
        int attemptId,
        decimal overallScore,
        List<AdminWritingCriterionUpdateDto> criteria,
        CancellationToken cancellationToken);
    Task<bool> DeleteWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken);
}

public sealed record ExerciseDeleteResult(bool Exists, bool HasSubmissions);
