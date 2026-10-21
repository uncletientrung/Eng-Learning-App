using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishLearning.DAL.Entities
{
    [Table("topics")]
    public class Topic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column(TypeName = "text")]
        public string? Description { get; set; }

        [Required, StringLength(255)]
        [Column("module_type")]
        public string ModuleType { get; set; } = string.Empty;

        [StringLength(255)]
        [Column("create_by")]
        public string? CreateBy { get; set; }

        [Column("create_by_user_id")]
        public int? CreateByUserId { get; set; }

        [ForeignKey(nameof(CreateByUserId))]
        public User? Creator { get; set; }
    }
}