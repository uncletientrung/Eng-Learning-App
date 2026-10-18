using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("grammar_sections")]
    public class GrammarSection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("category_id")]
        public int CategoryId { get; set; }

        [Required, StringLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Content { get; set; } = string.Empty;

        [Column("display_order")]
        public int DisplayOrder { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public GrammarCategory Category { get; set; } = null!;
    }
}
