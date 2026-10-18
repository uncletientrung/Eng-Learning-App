using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("speaking_criterion_scores")]
    public class SpeakingCriterionScore
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("grade_id")]
        public int GradeId { get; set; }

        [Required, StringLength(50)]
        [Column("criterion_code")]
        public string CriterionCode { get; set; } = string.Empty;

        [Column(TypeName = "decimal(3,1)")]
        public decimal Score { get; set; }

        [Column(TypeName = "text")]
        public string? Feedback { get; set; }

        [Column(TypeName = "text")]
        public string? Strengths { get; set; }

        [Column(TypeName = "text")]
        public string? Weaknesses { get; set; }

        [Column(TypeName = "text")]
        public string? Suggestions { get; set; }

        [ForeignKey(nameof(GradeId))]
        public SpeakingGrade Grade { get; set; } = null!;
    }
}
