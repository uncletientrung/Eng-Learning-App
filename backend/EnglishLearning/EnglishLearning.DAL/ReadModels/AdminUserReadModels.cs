namespace EnglishLearning.DAL.ReadModels;

public sealed class AdminUserQueryDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public string? Role { get; set; }
    public string? Status { get; set; }
}

public sealed class AdminUserPageDto
{
    public List<AdminUserDto> Items { get; set; } = [];
    public List<string> Roles { get; set; } = [];
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
}

public sealed class AdminUserDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Role { get; set; } = "";
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public bool IsActive { get; set; }
    public int CurrentStreak { get; set; }
    public DateOnly? LastStudyDate { get; set; }
    public AdminUserActivityDto Activity { get; set; } = new();
}

public sealed class AdminUserActivityDto
{
    public int WritingAttempts { get; set; }
    public int ReadingAttempts { get; set; }
    public int ListeningAttempts { get; set; }
    public int SpeakingAttempts { get; set; }
    public int TranslationAttempts { get; set; }
    public int VocabularyProgressItems { get; set; }
    public int TranslationProgressItems { get; set; }
}

public sealed class UpdateAdminUserProfileRequestDto
{
    public string Name { get; set; } = "";
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
}

public sealed class CreateAdminUserRequestDto
{
    public string Name { get; set; } = "";
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Password { get; set; } = "";
}

public sealed class UpdateAdminUserStatusRequestDto
{
    public bool IsActive { get; set; }
}
