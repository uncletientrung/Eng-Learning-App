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

        [Column("exercise_id")]
        public int ExerciseId { get; set; }

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

        [ForeignKey(nameof(ExerciseId))]
        public ReadingExercise Exercise { get; set; } = null!;
    }
}
