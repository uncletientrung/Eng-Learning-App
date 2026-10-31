namespace EnglishLearning.BLL.DTOs.WritingGrading;

public class WritingAttemptSummaryDto
{
    public int AttemptId { get; set; }

    public int ExerciseId { get; set; }

    public int TopicId { get; set; }

    public string ExerciseTitle { get; set; } = "";

    public string TopicName { get; set; } = "";

    public string? ImageUrl { get; set; }

    public string QuestionText { get; set; } = "";

    public decimal OverallScore { get; set; }

    public DateTime? CompletedAt { get; set; }
}

public class WritingAttemptHistoryDto : WritingAttemptSummaryDto
{
    public string UserResponse { get; set; } = "";

    public WritingGradingResultDto Result { get; set; } = new();
}
