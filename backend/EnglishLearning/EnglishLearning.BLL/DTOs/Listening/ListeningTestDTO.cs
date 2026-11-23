namespace EnglishLearning.BLL.DTOs;

public class ListeningTestDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string level { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }

    public List<ListeningExerciseDTO> listeningExercises { get; set; } = new();
}