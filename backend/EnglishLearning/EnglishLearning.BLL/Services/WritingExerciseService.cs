using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class WritingExerciseService : IWritingExerciseService
{
    private readonly IWritingExerciseRepository _repository;

    public WritingExerciseService(IWritingExerciseRepository repository){
        _repository = repository;
    }

    public Task<List<WritingExercise>> GetAllAsync()
    {
        return _repository.GetAllAsync();
    }

    public Task<WritingExercise?> GetByIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID không hợp lệ.");

        return _repository.GetByIdAsync(id);
    }
}