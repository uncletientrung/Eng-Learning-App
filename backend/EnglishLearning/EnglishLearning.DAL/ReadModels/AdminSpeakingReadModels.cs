namespace EnglishLearning.DAL.ReadModels;

public sealed class AdminSpeakingExerciseQueryDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public int? TopicId { get; set; }
    public string? SpeakingType { get; set; }
    public bool? IsActive { get; set; }
}

public sealed class AdminSpeakingSubmissionQueryDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public string? Status { get; set; }
    public int? ExerciseId { get; set; }
    public int? TopicId { get; set; }
    public string? SpeakingType { get; set; }
    public decimal? MinimumScore { get; set; }
    public decimal? MaximumScore { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
}

public sealed class AdminSpeakingExerciseRequestDto
{
    public int TopicId { get; set; }
    public string Title { get; set; } = "";
    public string SpeakingType { get; set; } = "";
    public List<AdminSpeakingQuestionRequestDto> Questions { get; set; } = [];
}

public sealed class AdminSpeakingQuestionRequestDto
{
    public int QuestionNumber { get; set; }
    public string QuestionText { get; set; } = "";
    public List<string>? Cues { get; set; }
    public string? Closing { get; set; }
    public int? PreparationTime { get; set; }
    public int? ResponseTime { get; set; }
}

public sealed class UpdateSpeakingExerciseStatusRequestDto
{
    public bool IsActive { get; set; }
}

public sealed class AdminSpeakingExerciseDto
{
    public int Id { get; set; }
    public int TopicId { get; set; }
    public string TopicName { get; set; } = "";
    public string Title { get; set; } = "";
    public string SpeakingType { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; }
    public int QuestionCount { get; set; }
    public int SubmissionCount { get; set; }
    public List<AdminSpeakingQuestionDto> Questions { get; set; } = [];
}

public sealed class AdminSpeakingQuestionDto
{
    public int Id { get; set; }
    public int QuestionNumber { get; set; }
    public string QuestionText { get; set; } = "";
    public List<string>? Cues { get; set; }
    public string? Closing { get; set; }
    public int? PreparationTime { get; set; }
    public int? ResponseTime { get; set; }
}

public class AdminSpeakingSubmissionDto
{
    public int AttemptId { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = "";
    public string UserEmail { get; set; } = "";
    public int ExerciseId { get; set; }
    public string ExerciseTitle { get; set; } = "";
    public string TopicName { get; set; } = "";
    public string SpeakingType { get; set; } = "";
    public string Status { get; set; } = "";
    public decimal? OverallScore { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}

public sealed class AdminSpeakingSubmissionDetailDto : AdminSpeakingSubmissionDto
{
    public string? OverallFeedback { get; set; }
    public List<AdminSpeakingAnswerDto> Answers { get; set; } = [];
    public List<AdminSpeakingCriterionDto> Criteria { get; set; } = [];
}

public sealed class AdminSpeakingAnswerDto
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public int QuestionNumber { get; set; }
    public string QuestionText { get; set; } = "";
    public string? Transcript { get; set; }
    public DateTime SubmittedAt { get; set; }
    public string AudioEndpoint { get; set; } = "";
    public string? AnswerFeedback { get; set; }
}

public sealed class AdminSpeakingCriterionDto
{
    public string CriterionCode { get; set; } = "";
    public decimal Score { get; set; }
    public string? Feedback { get; set; }
    public string? Strengths { get; set; }
    public string? Weaknesses { get; set; }
    public string? Suggestions { get; set; }
    public List<AdminSpeakingIssueDto> Issues { get; set; } = [];
}

public sealed class AdminSpeakingSubmissionUpdateDto
{
    public List<AdminSpeakingCriterionUpdateDto> Criteria { get; set; } = [];
}

public sealed class AdminSpeakingCriterionUpdateDto
{
    public string CriterionCode { get; set; } = "";
    public decimal Score { get; set; }
    public string? Feedback { get; set; }
    public string? Strengths { get; set; }
    public string? Weaknesses { get; set; }
    public string? Suggestions { get; set; }
}

public sealed class AdminSpeakingIssueDto
{
    public string OriginalText { get; set; } = "";
    public string Correction { get; set; } = "";
    public string Explanation { get; set; } = "";
    public string Category { get; set; } = "";
}

public sealed record AdminSpeakingAudioFile(
    string FullPath,
    string DownloadName);
