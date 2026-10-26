namespace EnglishLearning.BLL.DTOs.WritingGrading;

public class GeminiGradingResultDto
{
    public decimal OverallScore { get; set; }

    public string OverallFeedback { get; set; } = "";

    public List<CriterionResultDto> Criteria { get; set; } = [];

    public string ImprovedVersion { get; set; } = "";
}