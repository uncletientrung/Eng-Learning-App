namespace EnglishLearning.BLL.DTOs;

public class ListeningQuestionDTO
{
    public int Id { get; set; }
    public int ExerciseId { get; set; }
    public byte QuestionNumber { get; set; }

    public string QuestionType { get; set; } = string.Empty;
    public string QuestionText { get; set; } = string.Empty;
    public string CorrectAnswer { get; set; } = string.Empty;
    public string Explanation { get; set; } = string.Empty;

    public List<ListeningQuestionOptionDTO> ListeningQuestionOptions { get; set; } = new();

    public List<ListeningFillBlankDTO> ListeningFillBlankAnswers { get; set; } = new();
}