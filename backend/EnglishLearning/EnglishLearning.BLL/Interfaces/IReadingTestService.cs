using EnglishLearning.BLL.DTOs;
using EnglishLearning.DAL.Entities;

namespace EnglishLearning.BLL.Interfaces;

public interface IReadingTestService
{
    
    Task<List<ReadingTestDTO>> GetAllAsync();
    Task<ReadingTestDTO> GetByIdAsync(int id);
    Task<ReadingTestDTO> AddAsync(ReadingTestDTO readingTest);
}