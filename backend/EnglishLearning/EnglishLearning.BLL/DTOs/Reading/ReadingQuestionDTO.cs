namespace EnglishLearning.BLL.DTOs;

public class ReadingQuestionDTO
{
    public int Id { get; set; }

    public int ExerciseId { get; set; }

    public byte QuestionNumber { get; set; }

    public string QuestionType { get; set; } = string.Empty;

    public string QuestionText { get; set; } = string.Empty;


    public string Explanation { get; set; } = string.Empty;
    public ICollection<ReadingQuestionOptionDTO> ReadingQuestionOptions { get; set; } = new List<ReadingQuestionOptionDTO>();
    public ICollection<ReadingFillinBlankDTO>? FillinBlanksAnswers { get; set; } = new List<ReadingFillinBlankDTO>();
}