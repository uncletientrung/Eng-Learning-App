using System.Collections.Immutable;
using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class ReadingTestService : IReadingTestService
{
    IReadingTestRepository _repository;
    public ReadingTestService(IReadingTestRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ReadingTestDTO>> GetAllAsync()
    {
        var list = await _repository.GetAllAsync();
        return list.Select(e => new ReadingTestDTO
        {
            Id = e.Id,
            Title = e.Title,
            level = e.Level,
            CreatedAt = e.CreatedAt,
          
        })
            .ToList();
    }

    public async Task<ReadingTestDTO> GetByIdAsync(int id)
    {
        var test = await _repository.GetByIdAsync(id);
        return new ReadingTestDTO
        {
            Id = test.Id,
            Title = test.Title,
            level = test.Level,
            CreatedAt = test.CreatedAt,

        };
    }

    public async Task<ReadingTestDTO> AddAsync(ReadingTestDTO readingTest)
    {
        var test = new ReadingTest
        {
            Title = readingTest.Title,
            Level = readingTest.level,
            CreatedAt = DateTime.Now,
        };
        await _repository.AddAsync(test);

        return new ReadingTestDTO
        {
            Id = test.Id,
            Title = test.Title,
            level = test.Level,
            CreatedAt = test.CreatedAt,
        };

    }
}
