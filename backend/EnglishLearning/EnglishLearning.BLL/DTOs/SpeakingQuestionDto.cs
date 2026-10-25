
namespace EnglishLearning.BLL.DTOs.SpeakingExercises;

public class SpeakingQuestionDto
{
    public int Id { get; set; }

    public int ExerciseId { get; set; }

    public byte QuestionNumber { get; set; }

    public string QuestionText { get; set; } = string.Empty;

    // Dành cho Speaking Part 2
    public List<string>? Cues { get; set; }

    public string? Closing { get; set; }

    public int? PreparationTime { get; set; }

    public int? ResponseTime { get; set; }
}
