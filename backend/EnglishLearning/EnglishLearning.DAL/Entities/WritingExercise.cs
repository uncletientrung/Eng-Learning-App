
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishLearning.DAL.Entities
{
    [Table("writing_exercises")]
    public class WritingExercise
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("topic_id")]
        public int TopicId { get; set; }

        [Required, StringLength(255)]
        public string Title { get; set; } = string.Empty;

        [StringLength(255)]
        [Column("image_url")]
        public string? ImageUrl { get; set; }

        [StringLength(50)]
        [Column("writing_type")]
        public string? WritingType { get; set; }

        [Required, Column("question_text", TypeName = "text")]
        public string QuestionText { get; set; } = string.Empty;

        [Column(TypeName = "text")]
        public string? Instruction { get; set; }

        [Column("reference_answer", TypeName = "text")]
        public string? ReferenceAnswer { get; set; }

        [Required, Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(TopicId))]
        public Topic Topic { get; set; } = null!;
    }
}
