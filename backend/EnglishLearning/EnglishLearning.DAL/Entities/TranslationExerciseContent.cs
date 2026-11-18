using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("translation_exercises_content")]
    public class TranslationExerciseContent
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("parent_id")]
        public int? ParentId { get; set; }

        [Column("display_order")]
        public int DisplayOrder { get; set; }

        [Column("vi")]
        public string viText { get; set; } = string.Empty;

        [Column("answer")]
        public string Answer { get; set; } = string.Empty;

        [ForeignKey(nameof(ParentId))]
        public TranslationExercise Parent { get; set; } = null!;
    }
}
