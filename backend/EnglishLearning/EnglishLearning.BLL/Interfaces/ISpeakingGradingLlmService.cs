using EnglishLearning.BLL.DTOs.SpeakingAssessment;

namespace EnglishLearning.BLL.Interfaces;

public interface ISpeakingGradingLlmService
{
    Task<GeminiSpeakingGradingResultDto> GradeAsync(
        IReadOnlyList<SpeakingGradingInputDto> answers,
        CancellationToken cancellationToken = default);
}
