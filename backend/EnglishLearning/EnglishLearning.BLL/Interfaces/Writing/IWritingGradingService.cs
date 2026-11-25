using EnglishLearning.BLL.DTOs.WritingGrading;

namespace EnglishLearning.BLL.Interfaces;

public interface IWritingGradingService
{
    Task<WritingGradingResultDto> GradeAsync(
        int userId,
        WritingGradingRequestDto request,
        CancellationToken cancellationToken = default);

    Task<List<WritingAttemptSummaryDto>> GetHistoryAsync(
        int userId,
        CancellationToken cancellationToken = default);

    Task<WritingAttemptHistoryDto?> GetHistoryAttemptAsync(
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