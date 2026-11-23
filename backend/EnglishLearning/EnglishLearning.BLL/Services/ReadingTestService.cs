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
            readingExercises = e.ReadingExercises.Select(a => new ReadingExerciseDTO
            {
                Id = a.Id,
                Content = a.Content,
                Imageurl = a.ImageUrl,
                level = a.Level,
                CreatedAt = a.CreatedAt,
                Passage = a.Passage,
                ReadingTestId = a.ReadingTestId,
                title = a.Title,
                TopicId = a.TopicId,
                ReadingQuestions = a.ReadingQuestions.Select(q => new ReadingQuestionDTO
                {
                    Id = q.Id,
                    QuestionNumber = q.QuestionNumber,
                    QuestionType = q.QuestionType,
                    QuestionText = q.QuestionText,
                    Explanation = q.Explanation,
                    ExerciseId = q.ExerciseId,
                }).ToList()
            }).ToList()
        }).ToList();
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
            readingExercises = test.ReadingExercises.Select( a => new ReadingExerciseDTO
            {
                Id=a.Id,
                Content = a.Content,
                Imageurl = a.ImageUrl,
                level=a.Level,
                CreatedAt = a.CreatedAt,
                Passage = a.Passage,
                ReadingTestId = a.ReadingTestId,
                title = a.Title,
                TopicId= a.TopicId,
                ReadingQuestions = a.ReadingQuestions.Select(q => new ReadingQuestionDTO
                {
                    Id = q.Id,
                    QuestionNumber = q.QuestionNumber,
                    QuestionType = q.QuestionType,
                    QuestionText = q.QuestionText,
                    Explanation = q.Explanation,
                    ExerciseId = q.ExerciseId,
                }).ToList()
            }).ToList()
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

    public async Task<ReadingTestDTO> UpdateAsync(int id, ReadingTestDTO readingTest)
    {
        var test = new ReadingTest
        {
            Title = readingTest.Title,
            Level = readingTest.level,

        };
        var result = await _repository.UpdateAsync(id, test);
        if (result == null)
        {
            return null; 
        }
        return new ReadingTestDTO
        {
            Id = result.Id,
            Title = result.Title,
            level = result.Level,
            CreatedAt = result.CreatedAt,
        };
    }

    public async Task<ReadingTestDTO> DeleteAsync(int id)
    {
       var test= await _repository.DeleteAsync(id);
       return new ReadingTestDTO
       {
           Id = test.Id,
           Title = test.Title,
           level = test.Level,
           CreatedAt = test.CreatedAt,
       };
    }
}
