using EnglishLearning.BLL.DTOs.WritingGrading;

namespace EnglishLearning.BLL.Interfaces;

public interface ILlmGradingService
{
    Task<(GeminiGradingResultDto Result, string RawJson)>
        GradeAsync(
            string title,
            string questionText,
            string? instruction,
            string? writingType,
            string userResponse,
            CancellationToken cancellationToken = default);
}