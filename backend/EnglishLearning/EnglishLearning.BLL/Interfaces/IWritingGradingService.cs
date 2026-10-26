using EnglishLearning.BLL.DTOs.WritingGrading;

namespace EnglishLearning.BLL.Interfaces;

public interface IWritingGradingService
{
    Task<WritingGradingResultDto> GradeAsync(
        int userId,
        WritingGradingRequestDto request,
        CancellationToken cancellationToken = default);
}