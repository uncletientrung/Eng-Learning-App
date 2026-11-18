using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishLearning.DAL.Entities;

[Table("user_translation_content_progress")]
public sealed class UserTranslationContentProgress
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("content_id")]
    public int ContentId { get; set; }

    [Column("exercise_id")]
    public int ExerciseId { get; set; }

    [Column("is_completed")]
    public bool IsCompleted { get; set; }

    [Column("updated_at", TypeName = "timestamp")]
    public DateTime UpdatedAt { get; set; }

    public User User { get; set; } = null!;
    public TranslationExerciseContent Content { get; set; } = null!;
    public TranslationExercise Exercise { get; set; } = null!;
}
