using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("speaking_exercises")]
    public class SpeakingExercise
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("topic_id")]
        public int TopicId { get; set; }

        [Required, StringLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required, Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(TopicId))]
        public Topic Topic { get; set; } = null!;
    }
}
