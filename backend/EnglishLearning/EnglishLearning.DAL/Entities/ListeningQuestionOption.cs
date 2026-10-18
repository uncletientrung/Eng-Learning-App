using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("listening_question_options")]
    public class ListeningQuestionOption
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("question_id")]
        public int QuestionId { get; set; }

        [Required, StringLength(1)]
        [Column("option_key")]
        public string OptionKey { get; set; } = string.Empty;

        [Required, Column("option_text", TypeName = "text")]
        public string OptionText { get; set; } = string.Empty;

        [Column("is_correct", TypeName = "tinyint(1)")]
        public bool IsCorrect { get; set; }

        [ForeignKey(nameof(QuestionId))]
        public ListeningQuestion Question { get; set; } = null!;
    }
}
