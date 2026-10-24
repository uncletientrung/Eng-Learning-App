namespace EnglishLearning.BLL.DTOs.SpeakingExercises;

public class SpeakingExerciseDto
{
    public int Id { get; set; }

    public int TopicId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string SpeakingType { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    // Thông tin Topic liên quan
    public TopicDto? Topic { get; set; }
    public List<SpeakingQuestionDto> Questions { get; set; } = new();
}