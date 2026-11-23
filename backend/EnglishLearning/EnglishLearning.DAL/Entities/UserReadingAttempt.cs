using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_reading_attempts")]
    public class UserReadingAttempt
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("readingtest_id")]
        public int TestId { get; set; }

        [Column(TypeName = "tinyint")]
        public byte Score { get; set; }

        [Column("total_questions", TypeName = "tinyint")]
        public byte TotalQuestions { get; set; }

        [Column("correct_answers_num", TypeName = "tinyint")]
        public byte CorrectAnswersNum { get; set; }

        [Required, Column("started_at", TypeName = "timestamp")]
        public DateTime StartedAt { get; set; }

        [Column("completed_at", TypeName = "timestamp")]
        public DateTime? CompletedAt { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;
        
        public ICollection<UserReadingAnswer> UserReadingAnswers { get; set; } = new List<UserReadingAnswer>();

    }
}
