namespace EnglishLearning.BLL.DTOs;

public class UserReadingAnswerDTO
{
    public int Id { get; set; }

    public int AttemptId { get; set; }

    public int QuestionId { get; set; }

    public string UserAnswer { get; set; } = string.Empty;

    public bool IsCorrect { get; set; }
    
    public string QuestionType { get; set; } = string.Empty;
    
}