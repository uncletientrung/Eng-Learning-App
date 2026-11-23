namespace EnglishLearning.BLL.DTOs;

public class UserListeningAnswerReviewDTO
{
    public int Id { get; set; }
    public int AttemptId { get; set; }
    public int QuestionId { get; set; }
    public int QuestionNumber { get; set; }

    public string QuestionText { get; set; } = "";
    public string QuestionType { get; set; } = "";

    public string UserAnswer { get; set; } = "";
    public string CorrectAnswer { get; set; } = "";

    public bool IsCorrect { get; set; }
    public string Explanation { get; set; } = "";

    public List<ListeningFillBlankDTO> ListeningFillBlankAnswerDtos
    { get; set; } = new();
}