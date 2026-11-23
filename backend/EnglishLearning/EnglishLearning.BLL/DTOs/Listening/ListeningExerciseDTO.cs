namespace EnglishLearning.BLL.DTOs;

public class ListeningExerciseDTO
{
    public int Id { get; set; }
    public string title { get; set; } = string.Empty;
    public string level { get; set; } = string.Empty;
    public int? TopicId { get; set; }
    public int ListeningTestId { get; set; }
    public string Part { get; set; } = string.Empty;
    public string Imageurl { get; set; } = string.Empty;

    public string AudioType { get; set; } = string.Empty;
    public string AudioUrl { get; set; } = string.Empty;
    public string Transcript { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public List<ListeningQuestionDTO> ListeningQuestions { get; set; } = new();
}