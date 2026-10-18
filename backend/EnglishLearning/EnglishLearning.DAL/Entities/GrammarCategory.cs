using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("grammar_categories")]
    public class GrammarCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("parent_id")]
        public int? ParentId { get; set; }

        [Required, StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column("display_order")]
        public int DisplayOrder { get; set; }

        [Required]
        [Column("created_at", TypeName = "timestamp")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(ParentId))]
        public GrammarCategory? Parent { get; set; }

        public ICollection<GrammarCategory> Children { get; set; }
            = new List<GrammarCategory>();
    }
}

