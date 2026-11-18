using EnglishLearning.BLL.DTOs.TranslationGrading;

namespace EnglishLearning.BLL.Interfaces;

public interface ITranslationGradingService
{
    Task<TranslationGradingResult> GradeAsync(
        string exerciseName,
        string parentExerciseName,
        string? parentExerciseLevel,
        string sourceText,
        string referenceTranslation,
        string userResponse,
        CancellationToken cancellationToken = default);
}
