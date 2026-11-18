namespace EnglishLearning.BLL.DTOs.TranslationGrading;

public sealed record TranslationGradingResult(
    int Score,
    string Feedback,
    IReadOnlyList<TranslationIssue> Issues,
    string ImprovedVersion);

public sealed record TranslationIssue(
    string OriginalText,
    string Correction,
    string Explanation);
