using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IReadingExerciseRepository
{
    Task<List<ReadingExercise>> GetAllAsync();
    Task<List<ReadingExercise>> GetByIdAsync(int id);

}