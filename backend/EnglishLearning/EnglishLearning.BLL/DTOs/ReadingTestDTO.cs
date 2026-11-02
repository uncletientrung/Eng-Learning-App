using EnglishLearning.DAL.Entities;

namespace EnglishLearning.BLL.DTOs;

public class ReadingTestDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public string level { get; set; }
    

}