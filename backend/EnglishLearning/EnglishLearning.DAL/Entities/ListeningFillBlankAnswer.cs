using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("listening_fill_blank_answers")]
    public class ListeningFillBlankAnswer
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("question_id")]
        public int QuestionId { get; set; }

        [Column("blank_number", TypeName = "tinyint")]
        public byte BlankNumber { get; set; }

        [Required, StringLength(255)]
        [Column("correct_answer")]
        public string CorrectAnswer { get; set; } = string.Empty;

        [ForeignKey(nameof(QuestionId))]
        public ListeningQuestion Question { get; set; } = null!;
    }
}
