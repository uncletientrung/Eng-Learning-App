using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishLearning.DAL.Entities;
[Table("Reading_Test")]
public class ReadingTest
{
    [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public int Id { get; set; }
    [Required, StringLength(255)]
    [Column("Reading_Test_title")]
    public string Title { get; set; }
    
    [Required, StringLength(255)]
    public string Level { get; set; } = string.Empty;
    
    [Required, Column("created_at", TypeName = "timestamp")]
    public DateTime CreatedAt { get; set; }
    

    
}