namespace EnglishLearning.BLL.DTOs.SpeakingExercises;

public class SpeakingQuestionDto
{
    public int Id { get; set; }

    public int ExerciseId { get; set; }

    public byte QuestionNumber { get; set; }

    public string QuestionText { get; set; } = string.Empty;

    public int? PreparationTime { get; set; }

    public int? ResponseTime { get; set; }
}