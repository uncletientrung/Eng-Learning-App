using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IReadingExerciseRepository
{
    Task<List<ReadingExercise>> GetAllAsync(int id);
    Task<ReadingExercise?> GetByIdAsync(int id);
    Task<ReadingExercise> AddAsync(ReadingExercise readingExercise);
}