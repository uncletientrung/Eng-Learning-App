using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_writing_criterion_scores")]
    public class UserWritingCriterionScore
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("attempt_id")]
        public int AttemptId { get; set; }

        [Required, StringLength(50)]
        [Column("criterion_code")]
        public string CriterionCode { get; set; } = string.Empty;

        [Column(TypeName = "decimal(3,1)")]
        public decimal Score { get; set; }

        [Required, Column(TypeName = "text")]
        public string Feedback { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Strengths { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Weaknesses { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Suggestions { get; set; } = string.Empty;

        [Required, Column(TypeName = "longtext")]
        public string Issues { get; set; } = string.Empty;

        [ForeignKey(nameof(AttemptId))]
        public UserWritingAttempt Attempt { get; set; } = null!;
    }
}
