namespace EnglishLearning.BLL.DTOs;

public class UserListeningAttemptDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TestId { get; set; }

    public byte Score { get; set; }
    public byte TotalQuestions { get; set; }
    public byte CorrectAnswersNum { get; set; }

    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    

    public List<UserListeningAnswerReviewDTO> UserListeningAnswers
    { get; set; } = new();
}