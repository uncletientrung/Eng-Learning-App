using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_speaking_attempts")]
    public class UserSpeakingAttempt
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("exercise_id")]
        public int ExerciseId { get; set; }

        [Required, StringLength(30)]
        public string Status { get; set; } = string.Empty;

        [Column("overall_score", TypeName = "decimal(3,1)")]
        public decimal? OverallScore { get; set; }

        [Column("grading_result", TypeName = "longtext")]
        public string? GradingResult { get; set; }

        [Required, Column("started_at", TypeName = "timestamp")]
        public DateTime StartedAt { get; set; }

        [Column("completed_at", TypeName = "timestamp")]
        public DateTime? CompletedAt { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        [ForeignKey(nameof(ExerciseId))]
        public SpeakingExercise Exercise { get; set; } = null!;

        public ICollection<UserSpeakingAnswer> UserSpeakingAnswers { get; set; }
            = new List<UserSpeakingAnswer>();

        public ICollection<SpeakingCriterionScore> CriterionScores { get; set; }
            = new List<SpeakingCriterionScore>();
    }
}
