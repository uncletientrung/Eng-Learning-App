namespace EnglishLearning.BLL.DTOs;

public class UserReadingAnswerReviewDTO
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

    public List<ReadingFillBlankAnswerDTO> ReadingFillBlankAnswerDtos { get; set; }
        = new List<ReadingFillBlankAnswerDTO>();}