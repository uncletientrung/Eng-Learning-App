namespace EnglishLearning.BLL.DTOs.WritingGrading;

public class WritingGradingResultDto
{
    public int AttemptId { get; set; }

    public decimal OverallScore { get; set; }

    public string OverallFeedback { get; set; } = "";

    public List<CriterionResultDto> Criteria { get; set; } = [];

    public string ImprovedVersion { get; set; } = "";
}

public class CriterionResultDto
{
    public string CriterionCode { get; set; } = "";

    public decimal Score { get; set; }

    public string Feedback { get; set; } = "";

    public string Strengths { get; set; } = "";

    public string Weaknesses { get; set; } = "";

    public string Suggestions { get; set; } = "";

    public List<WritingIssueDto> Issues { get; set; } = [];
}

public class WritingIssueDto
{
    public string OriginalText { get; set; } = "";

    public string Correction { get; set; } = "";

    public string Explanation { get; set; } = "";

    public string Category { get; set; } = "";
}