namespace EnglishLearning.DAL.ReadModels;

public sealed class AdminDashboardDto
{
    public int TotalUsers { get; set; }
    public int TotalWritingExercises { get; set; }
    public int TotalWritingAttempts { get; set; }
    public int CompletedSubmissions { get; set; }
    public int PendingSubmissions { get; set; }
    public decimal? AverageWritingScore { get; set; }
    public List<MonthlyWritingActivityDto> MonthlyActivity { get; set; } = [];
    public List<AdminRecentSubmissionDto> RecentSubmissions { get; set; } = [];
}

public sealed class MonthlyWritingActivityDto
{
    public string Month { get; set; } = "";
    public int Count { get; set; }
}

public sealed class AdminRecentSubmissionDto
{
    public int AttemptId { get; set; }
    public string UserName { get; set; } = "";
    public string ExerciseTitle { get; set; } = "";
    public string? WritingType { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public string Status { get; set; } = "";
}

public sealed class AdminPageDto<T>
{
    public List<T> Items { get; set; } = [];
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
}

public sealed class AdminWritingExerciseQueryDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public int? TopicId { get; set; }
    public string? Status { get; set; }
}

public sealed class AdminWritingExerciseDto
{
    public int Id { get; set; }
    public int TopicId { get; set; }
    public string TopicName { get; set; } = "";
    public string Title { get; set; } = "";
    public string? ImageUrl { get; set; }
    public string? WritingType { get; set; }
    public string QuestionText { get; set; } = "";
    public string? Instruction { get; set; }
    public string? ReferenceAnswer { get; set; }
    public string Status { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public int SubmissionCount { get; set; }
}

public sealed class AdminWritingExerciseRequestDto
{
    public int TopicId { get; set; }
    public string Title { get; set; } = "";
    public string? ImageUrl { get; set; }
    public string? WritingType { get; set; }
    public string QuestionText { get; set; } = "";
    public string? Instruction { get; set; }
    public string? ReferenceAnswer { get; set; }
    public string Status { get; set; } = "DRAFT";
}

public sealed class AdminWritingSubmissionQueryDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public string? Status { get; set; }
    public int? ExerciseId { get; set; }
    public int? UserId { get; set; }
    public decimal? MinimumScore { get; set; }
    public decimal? MaximumScore { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
}

public class AdminWritingSubmissionDto
{
    public int AttemptId { get; set; }
    public int UserId { get; set; }
    public string FullName { get; set; } = "";
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public int ExerciseId { get; set; }
    public string ExerciseTitle { get; set; } = "";
    public string TopicName { get; set; } = "";
    public decimal OverallScore { get; set; }
    public string Status { get; set; } = "";
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}

public sealed class AdminWritingSubmissionDetailDto : AdminWritingSubmissionDto
{
    public string QuestionText { get; set; } = "";
    public string? Instruction { get; set; }
    public string? ImageUrl { get; set; }
    public string UserResponse { get; set; } = "";
    public List<AdminWritingCriterionDto> Criteria { get; set; } = [];
}

public sealed class AdminWritingSubmissionUpdateDto
{
    public List<AdminWritingCriterionUpdateDto> Criteria { get; set; } = [];
}

public sealed class AdminWritingCriterionUpdateDto
{
    public string CriterionCode { get; set; } = "";
    public decimal Score { get; set; }
    public string Feedback { get; set; } = "";
    public string Strengths { get; set; } = "";
    public string Weaknesses { get; set; } = "";
    public string Suggestions { get; set; } = "";
}

public sealed class AdminWritingCriterionDto
{
    public string CriterionCode { get; set; } = "";
    public decimal Score { get; set; }
    public string Feedback { get; set; } = "";
    public string Strengths { get; set; } = "";
    public string Weaknesses { get; set; } = "";
    public string Suggestions { get; set; } = "";
    public List<AdminWritingIssueDto> Issues { get; set; } = [];
}

public sealed class AdminWritingIssueDto
{
    public string OriginalText { get; set; } = "";
    public string Correction { get; set; } = "";
    public string Explanation { get; set; } = "";
    public string Category { get; set; } = "";
}
