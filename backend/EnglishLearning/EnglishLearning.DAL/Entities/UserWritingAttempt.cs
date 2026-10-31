using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_writing_attempts")]
    public class UserWritingAttempt
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("exercise_id")]
        public int ExerciseId { get; set; }

        [Required, Column("user_response", TypeName = "text")]
        public string UserResponse { get; set; } = string.Empty;

        [Column("overall_score", TypeName = "decimal(3,1)")]
        public decimal OverallScore { get; set; }

        [Required, Column("llm_raw_response", TypeName = "longtext")]
        public string LlmRawResponse { get; set; } = string.Empty;

        [Required, Column("started_at", TypeName = "timestamp")]
        public DateTime StartedAt { get; set; }

        [Column("completed_at", TypeName = "timestamp")]
        public DateTime? CompletedAt { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        [ForeignKey(nameof(ExerciseId))]
        public WritingExercise Exercise { get; set; } = null!;

        public ICollection<UserWritingCriterionScore> CriterionScores { get; set; } =
            new List<UserWritingCriterionScore>();
    }
}
