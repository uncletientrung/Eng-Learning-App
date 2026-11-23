namespace EnglishLearning.BLL.DTOs;

public class ListeningQuestionOptionDTO
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string OptionKey { get; set; } = string.Empty;
    public string OptionText { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}