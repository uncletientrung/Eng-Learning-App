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
        public int TopicId { get; set; }

        [Required, StringLength(2)]
        public string Level { get; set; } = string.Empty;

        [Column("type", TypeName = "tinyint")]
        public byte ExerciseType { get; set; }

        [Required, Column("source_text", TypeName = "text")]
        public string SourceText { get; set; } = string.Empty;

        [Required, Column("reference_translation", TypeName = "text")]
        public string ReferenceTranslation { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Explanation { get; set; } = string.Empty;

        [ForeignKey(nameof(TopicId))]
        public Topic Topic { get; set; } = null!;
    }
}
