namespace EnglishLearning.BLL.DTOs.SpeakingAssessment;

public sealed class CreateSpeakingAttemptRequestDto
{
    public int ExerciseId { get; set; }

    public bool StartNewAttempt { get; set; }
}

public sealed class SpeakingAttemptCreatedDto
{
    public int AttemptId { get; set; }

    public string Status { get; set; } = "";
}

public sealed class SpeakingAttemptStatusDto
{
    public int AttemptId { get; set; }

    public int ExerciseId { get; set; }

    public string Status { get; set; } = "";

    public decimal? OverallScore { get; set; }

    public DateTime? CompletedAt { get; set; }

    public SpeakingGradingResultDto? Result { get; set; }

    public List<SpeakingAnswerResultDto> Answers { get; set; } = [];
}

public sealed class SpeakingGradingResultDto
{
    public decimal OverallScore { get; set; }

    public string OverallFeedback { get; set; } = "";

    public List<SpeakingCriterionResultDto> Criteria { get; set; } = [];

    public List<SpeakingAnswerFeedbackDto> AnswerFeedback { get; set; } = [];
}

public sealed class SpeakingCriterionResultDto
{
    public string CriterionCode { get; set; } = "";

    public decimal Score { get; set; }

    public string Feedback { get; set; } = "";

    public string Strengths { get; set; } = "";

    public string Weaknesses { get; set; } = "";

    public string Suggestions { get; set; } = "";

    public List<SpeakingIssueDto> Issues { get; set; } = [];
}

public sealed class SpeakingIssueDto
{
    public string OriginalText { get; set; } = "";

    public string Correction { get; set; } = "";

    public string Explanation { get; set; } = "";

    public string Category { get; set; } = "";
}

public sealed class SpeakingAnswerFeedbackDto
{
    public int QuestionId { get; set; }

    public string Feedback { get; set; } = "";
}

public sealed class SpeakingAnswerResultDto
{
    public int QuestionId { get; set; }

    public string Question { get; set; } = "";

    public string Transcript { get; set; } = "";
}

public sealed class SpeakingGradingInputDto
{
    public int QuestionId { get; set; }

    public int QuestionNumber { get; set; }

    public string QuestionText { get; set; } = "";

    public string Transcript { get; set; } = "";

    public string MimeType { get; set; } = "";

    public byte[] AudioData { get; set; } = [];
}

public sealed class GeminiSpeakingGradingResultDto
{
    public decimal OverallScore { get; set; }

    public string OverallFeedback { get; set; } = "";

    public List<SpeakingCriterionResultDto> Criteria { get; set; } = [];

    public List<SpeakingAnswerFeedbackDto> AnswerFeedback { get; set; } = [];
}
