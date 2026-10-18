using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_translation_attempts")]
    public class UserTranslationAttempt
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("exercise_id")]
        public int ExerciseId { get; set; }

        [Required, Column("user_response", TypeName = "text")]
        public string UserResponse { get; set; } = string.Empty;

        [Column(TypeName = "tinyint")]
        public byte Score { get; set; }

        [Required, Column("llm_feedback", TypeName = "longtext")]
        public string LlmFeedback { get; set; } = string.Empty;

        [Required, Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        [ForeignKey(nameof(ExerciseId))]
        public TranslationExercise Exercise { get; set; } = null!;
    }
}
