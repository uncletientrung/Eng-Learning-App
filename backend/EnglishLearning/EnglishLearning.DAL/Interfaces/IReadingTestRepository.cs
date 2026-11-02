using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IReadingTestRepository
{
    Task<List<ReadingTest>> GetAllAsync();
    
    Task<ReadingTest?> GetByIdAsync(int id);
    
    Task<ReadingTest> AddAsync(ReadingTest readingTest);
    
    
}