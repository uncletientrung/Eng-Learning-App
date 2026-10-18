using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_listening_answers")]
    public class UserListeningAnswer
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("attempt_id")]
        public int AttemptId { get; set; }

        [Column("question_id")]
        public int QuestionId { get; set; }

        [Required, Column("user_answer", TypeName = "text")]
        public string UserAnswer { get; set; } = string.Empty;

        [Column("is_correct", TypeName = "tinyint(1)")]
        public bool IsCorrect { get; set; }

        [ForeignKey(nameof(AttemptId))]
        public UserListeningAttempt Attempt { get; set; } = null!;

        [ForeignKey(nameof(QuestionId))]
        public ListeningQuestion Question { get; set; } = null!;
    }
}
