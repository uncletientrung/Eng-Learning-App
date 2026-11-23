namespace EnglishLearning.BLL.DTOs;

public class ListeningFillBlankDTO
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public byte BlankNumber { get; set; }
    public string CorrectAnswer { get; set; } = string.Empty;
}