using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("speaking_grades")]
    public class SpeakingGrade
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("attempt_id")]
        public int AttemptId { get; set; }

        [Column("grader_id")]
        public int GraderId { get; set; }

        [Column("overall_score", TypeName = "decimal(3,1)")]
        public decimal? OverallScore { get; set; }

        [Column(TypeName = "text")]
        public string? Feedback { get; set; }

        [Required, Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at", TypeName = "timestamp")]
        public DateTime? UpdatedAt { get; set; }

        [ForeignKey(nameof(AttemptId))]
        public UserSpeakingAttempt Attempt { get; set; } = null!;

        [ForeignKey(nameof(GraderId))]
        public User Grader { get; set; } = null!;
    }
}
