namespace EnglishLearning.BLL.DTOs;

public class UserReadingAttemptDTO
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int TestId { get; set; }

    
    public byte Score { get; set; }

    public byte TotalQuestions { get; set; }

    public byte CorrectAnswersNum { get; set; }

    public DateTime StartedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    /*public UserDT User { get; set; } = null!;*/
        
    public List<UserReadingAnswerReviewDTO> UserReadingAnswers { get; set; } = new List<UserReadingAnswerReviewDTO>();
}