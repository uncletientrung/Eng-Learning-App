namespace EnglishLearning.BLL.DTOs;

public class ReadingExerciseDTO
{
    public int Id { get; set; }
    public string title { get; set; }
    public string level { get; set; }
    
    public int? TopicId { get; set; }
    public int ReadingTestId { get; set; }
    public string Passage { get; set; } = string.Empty;
    public string Imageurl { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    
}