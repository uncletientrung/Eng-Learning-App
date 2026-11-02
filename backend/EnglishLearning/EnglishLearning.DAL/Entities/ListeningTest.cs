using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace EnglishLearning.DAL.Entities;
[Table("Listening_Test")]
public class ListeningTest
{
    [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public int Id { get; set; }
    [Required, StringLength(10)]
    [Column("Listening_Test_title")]
    public string Title { get; set; }
    
    [Required, StringLength(2)]
    public string Level { get; set; } = string.Empty;
    
    [Required, Column("created_at", TypeName = "timestamp")]
    public DateTime CreatedAt { get; set; }
}
