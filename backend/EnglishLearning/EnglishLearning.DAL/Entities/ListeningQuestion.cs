using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("listening_questions")]
    public class ListeningQuestion
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("exercise_id")]
        public int ExerciseId { get; set; }

        [Column("question_number", TypeName = "tinyint")]
        public byte QuestionNumber { get; set; }

        [Required, StringLength(30)]
        [Column("question_type")]
        public string QuestionType { get; set; } = string.Empty;

        [Required, Column("question_text", TypeName = "text")]
        public string QuestionText { get; set; } = string.Empty;

        [Required, StringLength(255)]
        [Column("correct_answer")]
        public string CorrectAnswer { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Explanation { get; set; } = string.Empty;

        [ForeignKey(nameof(ExerciseId))]
        public ListeningExercise Exercise { get; set; } = null!;
    }
}
