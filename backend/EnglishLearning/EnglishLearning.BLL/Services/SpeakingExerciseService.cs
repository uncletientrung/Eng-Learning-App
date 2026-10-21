using EnglishLearning.BLL.DTOs.SpeakingExercises;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class SpeakingExerciseService : ISpeakingExerciseService
{
    private readonly ISpeakingExerciseRepository _repository;

    public SpeakingExerciseService(
        ISpeakingExerciseRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<SpeakingExerciseDto>> GetAllAsync()
    {
        var exercises = await _repository.GetAllAsync();

        return exercises.Select(e => new SpeakingExerciseDto
        {
            Id = e.Id,
            TopicId = e.TopicId,
            Title = e.Title,
            SpeakingType = e.SpeakingType,
            CreatedAt = e.CreatedAt,
            TopicName = e.Topic?.Name
        }).ToList();
    }

    public async Task<SpeakingExerciseDto?> GetByIdAsync(int id)
    {
        if (id <= 0)
        {
            throw new ArgumentException("ID không hợp lệ.", nameof(id));
        }

        var exercise = await _repository.GetByIdAsync(id);

        if (exercise == null)
        {
            return null;
        }

        return new SpeakingExerciseDto
        {
            Id = exercise.Id,
            TopicId = exercise.TopicId,
            Title = exercise.Title,
            SpeakingType = exercise.SpeakingType,
            CreatedAt = exercise.CreatedAt,
            TopicName = exercise.Topic?.Name
        };
    }
}