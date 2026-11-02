using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class ReadingExerciseService: IReadingExerciseService
{
    private readonly IReadingExerciseRepository _readingExerciseRepository;

    public ReadingExerciseService(IReadingExerciseRepository readingExerciseRepository)
    {
        _readingExerciseRepository = readingExerciseRepository;
    }

    public async Task<List<ReadingExerciseDTO>> GetAllAsync()
    {
        var result = await _readingExerciseRepository.GetAllAsync();
        return result.Select(e => new ReadingExerciseDTO
        {
            Id = e.Id,
            title = e.Title,
            Content = e.Content,
            Imageurl = e.ImageUrl,
            level = e.Level,
            Passage = e.Passage,
            TopicId =  e.TopicId,
            ReadingTestId =  e.ReadingTestId,
            CreatedAt =  e.CreatedAt,
        }).ToList();
    }

    public async Task<List<ReadingExerciseDTO>> GetByIdAsync(int id)
    {
        var result = await _readingExerciseRepository.GetByIdAsync(id);
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
}