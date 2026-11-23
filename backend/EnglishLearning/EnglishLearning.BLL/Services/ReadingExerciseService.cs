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
            ReadingQuestions = e.ReadingQuestions.Select(a => new ReadingQuestionDTO
            {
                Id = a.Id,
                QuestionNumber = a.QuestionNumber,
                QuestionType = a.QuestionType,
                QuestionText = a.QuestionText,
                Explanation = a.Explanation,
                ExerciseId = a.ExerciseId,
            }).ToList()
        }).ToList();
    }

    public async Task<ReadingExerciseDTO?> GetByIdAsync(int exerciseId)
    {
        var result = await _readingExerciseRepository.GetByIdAsync(exerciseId);
        if (result == null)
        {
            return null;
        }
        else
        {
            return new ReadingExerciseDTO
            {
                Id = result.Id,
                title = result.Title,
                Content = result.Content,
                Imageurl = result.ImageUrl,
                level = result.Level,
                Passage = result.Passage,
                TopicId= result.TopicId,
                ReadingTestId = result.ReadingTestId,
                CreatedAt = result.CreatedAt,
                ReadingQuestions = result.ReadingQuestions.Select(a => new ReadingQuestionDTO
                {
                    Id = a.Id,
                    QuestionNumber = a.QuestionNumber,
                    QuestionType = a.QuestionType,
                    QuestionText = a.QuestionText,
                    Explanation = a.Explanation,
                    ExerciseId = a.ExerciseId,
                }).ToList()
            };
        }
    }

    public async Task<ReadingExerciseDTO> AddAsync(ReadingExerciseDTO readingExerciseDTO)
    {
        var result = new ReadingExercise
        {
            Title = readingExerciseDTO.title,
            Content = readingExerciseDTO.Content,
            ImageUrl = readingExerciseDTO.Imageurl,
            Level = readingExerciseDTO.level,
            Passage = readingExerciseDTO.Passage,
            ReadingTestId = readingExerciseDTO.ReadingTestId,
            TopicId = readingExerciseDTO.TopicId,
            CreatedAt = DateTime.Now,
        };
        await _readingExerciseRepository.AddAsync(result);
        return new ReadingExerciseDTO
        {
            Id = result.Id,
            title = readingExerciseDTO.title,
            Content = readingExerciseDTO.Content,
            Imageurl = readingExerciseDTO.Imageurl,
            level=readingExerciseDTO.level,
            Passage = readingExerciseDTO.Passage,
            ReadingTestId =readingExerciseDTO.ReadingTestId,
            TopicId= readingExerciseDTO.TopicId,
            CreatedAt =  DateTime.Now,
        };
    }

    public async Task<ReadingExerciseDTO> UpdateAsync(int id, ReadingExerciseDTO readingExerciseDTO)
    {
        var test = new ReadingExercise
        {
            Id = readingExerciseDTO.Id,
            Content = readingExerciseDTO.Content,
            ImageUrl = readingExerciseDTO.Imageurl,
            Level = readingExerciseDTO.level,
            Passage = readingExerciseDTO.Passage,
            Title = readingExerciseDTO.title,
            TopicId = readingExerciseDTO.TopicId,
        };
        var result = await _readingExerciseRepository.UpdateAsync(id, test);
        
        return new ReadingExerciseDTO
        {
            Id = readingExerciseDTO.Id,
            title = readingExerciseDTO.title,
            Content = readingExerciseDTO.Content,
            Imageurl = readingExerciseDTO.Imageurl,
            level = readingExerciseDTO.level,
            Passage = readingExerciseDTO.Passage,
            ReadingTestId = readingExerciseDTO.ReadingTestId,
            TopicId = readingExerciseDTO.TopicId,
            CreatedAt = readingExerciseDTO.CreatedAt,

        };
    }

    public async Task<ReadingExerciseDTO> DeleteAsync(int id)
    {
        var result = await _readingExerciseRepository.DeleteAsync(id);
        return new ReadingExerciseDTO
        {
            Id = result.Id,
            title = result.Title,
            Content = result.Content,
            Imageurl = result.ImageUrl,
            level = result.Level,
            Passage = result.Passage,
            ReadingTestId = result.ReadingTestId,
            TopicId = result.TopicId,
            CreatedAt = result.CreatedAt,
        };
        
    }
}