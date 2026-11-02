using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class ReadingExerciseService: IReadingExerciseService
{
    private readonly IReadingExerciseRepository _readingExerciseRepository;

    public ReadingExerciseService(IReadingExerciseRepository readingExerciseRepository)
    {
        _readingExerciseRepository = readingExerciseRepository;
    }

    public async Task<List<ReadingExerciseDTO>> GetAllAsync(int id)
    {
        var result = await _readingExerciseRepository.GetAllAsync(id);
        return result.Select(e => new ReadingExerciseDTO
        {
            Id = e.Id,
            title = e.Title,
            Content = e.Content,
            Imageurl = e.ImageUrl,
            level = e.Level,
            Passage = e.Passage,
            TopicId = e.TopicId,
            ReadingTestId = e.ReadingTestId,
            CreatedAt = e.CreatedAt,
        }).ToList();
    }

    public async Task<ReadingExerciseDTO?> GetByIdAsync(int id)
    {
        var result = await _readingExerciseRepository.GetByIdAsync(id);
        return new ReadingExerciseDTO
        {
            Id = result.Id,
            title = result.Title,
            Content = result.Content,
            Imageurl = result.ImageUrl,
            level = result.Level,
            Passage = result.Passage,
            TopicId = result.TopicId,
            ReadingTestId = result.ReadingTestId,
            CreatedAt = result.CreatedAt,
        };
    }
}