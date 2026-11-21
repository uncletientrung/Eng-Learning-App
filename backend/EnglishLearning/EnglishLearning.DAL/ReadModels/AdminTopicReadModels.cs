namespace EnglishLearning.DAL.ReadModels;

public sealed class AdminTopicQueryDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public string? ModuleType { get; set; }
    public bool? IsActive { get; set; }
}

public sealed class AdminTopicPageDto
{
    public List<AdminTopicDto> Items { get; set; } = [];
    public List<string> ModuleTypes { get; set; } = [];
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
}

public sealed class AdminTopicDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? ImageURL { get; set; }
    public string ModuleType { get; set; } = "";
    public string? CreateBy { get; set; }
    public bool IsActive { get; set; }
    public AdminTopicUsageDto Usage { get; set; } = new();
}

public sealed class AdminTopicUsageDto
{
    public int Writing { get; set; }
    public int Speaking { get; set; }
    public int Vocabulary { get; set; }
    public int Idioms { get; set; }
    public int Reading { get; set; }
    public int Listening { get; set; }
    public int Translation { get; set; }

    public int Total =>
        Writing + Speaking + Vocabulary + Idioms + Reading + Listening + Translation;
}

public sealed class SaveAdminTopicRequestDto
{
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? ImageURL { get; set; }
    public string ModuleType { get; set; } = "";
}

public sealed class UpdateAdminTopicStatusRequestDto
{
    public bool IsActive { get; set; }
}
