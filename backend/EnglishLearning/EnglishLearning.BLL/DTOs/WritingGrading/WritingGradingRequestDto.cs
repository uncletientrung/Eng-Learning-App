using System.ComponentModel.DataAnnotations;

namespace EnglishLearning.BLL.DTOs.WritingGrading;

public class WritingGradingRequestDto
{
    [Range(1, int.MaxValue)]
    public int ExerciseId { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(15000)]
    public string UserResponse { get; set; } = string.Empty;
}