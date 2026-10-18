using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("idioms")]
    public class Idiom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, StringLength(255)]
        [Column("idiom_text")]
        public string IdiomText { get; set; } = string.Empty;

        [Required, StringLength(1)] 
        [Column("first_letter")]
        public string FirstLetter { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Phonetic { get; set; }

        [Required, Column("meaning_en", TypeName = "text")]
        public string MeaningEn { get; set; } = string.Empty;

        [Required, Column("meaning_vi", TypeName = "text")]
        public string MeaningVi { get; set; } = string.Empty;

        [Column(TypeName = "text")]
        public string? Example { get; set; }

        [Required]
        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }
    }
}
