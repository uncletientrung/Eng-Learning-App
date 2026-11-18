using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("translation_exercises")]
    public class TranslationExercise
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("topic_id")]
        public int? TopicId { get; set; }

        [Required, StringLength(255)]
        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Column("parent_id")]
        public int? ParentId { get; set; }

        [StringLength(2)]
        public string? Level { get; set; }

        [ForeignKey(nameof(TopicId))]
        public Topic? Topic { get; set; }

        [Column("display_order")]
        public int DisplayOrder { get; set; }

        [ForeignKey(nameof(ParentId))]
        public TranslationExercise? Parent { get; set; }

        public ICollection<TranslationExercise> Children { get; set; } = new List<TranslationExercise>();
        public ICollection<TranslationExerciseContent> Contents { get; set; } = new List<TranslationExerciseContent>();
    }
}
