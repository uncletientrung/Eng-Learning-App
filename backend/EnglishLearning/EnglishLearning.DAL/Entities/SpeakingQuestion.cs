using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishLearning.DAL.Entities
{
    [Table("speaking_questions")]
    public class SpeakingQuestion
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("exercise_id")]
        public int ExerciseId { get; set; }

        [Column("question_number", TypeName = "tinyint")]
        public byte QuestionNumber { get; set; }

        [Required, Column("question_text", TypeName = "text")]
        public string QuestionText { get; set; } = string.Empty;

        [Column("closing", TypeName = "text")]
        public string? Closing { get; set; }

        // Danh sách cue sẽ được lưu dưới dạng JSON trong MySQL
        public List<string>? Cues { get; set; }

        [Column("preparation_time")]
        public int? PreparationTime { get; set; }

        [Column("response_time")]
        public int? ResponseTime { get; set; }

        [ForeignKey(nameof(ExerciseId))]
        public SpeakingExercise Exercise { get; set; } = null!;
    }
}