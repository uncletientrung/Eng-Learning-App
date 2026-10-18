using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

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

        [Required, StringLength(255)]
        [Column("image_url")]
        public string ImageUrl { get; set; } = string.Empty;

        [Required, StringLength(50)]
        [Column("writing_type")]
        public string WritingType { get; set; } = string.Empty;

        [Required, Column("question_text", TypeName = "text")]
        public string QuestionText { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Instruction { get; set; } = string.Empty;

        [Required, Column("reference_answer", TypeName = "text")]
        public string ReferenceAnswer { get; set; } = string.Empty;

        [Required, Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(TopicId))]
        public Topic Topic { get; set; } = null!;
    }
}
