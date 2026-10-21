namespace EnglishLearning.BLL.DTOs;

public class TopicDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string ModuleType { get; set; } = string.Empty;

    public string? CreateBy { get; set; }

    public int? CreateByUserId { get; set; }
}