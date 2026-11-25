using System.ComponentModel.DataAnnotations;

namespace EnglishLearning.BLL.DTOs.WritingGrading;

public class WritingGradingRequestDto
{
    [Range(1, int.MaxValue)]
    public int ExerciseId { get; set; }

    [Required]
    [RegularExpression(
        "^(TASK_1|TASK_2)$",
        ErrorMessage = "Loại bài Writing phải là Task 1 hoặc Task 2.")]
    public string WritingType { get; set; } = string.Empty;

    [Required]
    [MinLength(1)]
    [MaxLength(15000)]
    public string UserResponse { get; set; } = string.Empty;
}