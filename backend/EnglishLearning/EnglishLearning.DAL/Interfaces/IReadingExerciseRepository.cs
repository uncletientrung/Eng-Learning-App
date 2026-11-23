using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IReadingExerciseRepository
{
    Task<List<ReadingExercise>> GetAllAsync(int id);
    Task<ReadingExercise?> GetByIdAsync(int exerciseId);
    Task<ReadingExercise> AddAsync(ReadingExercise readingExercise);
    Task<ReadingExercise> UpdateAsync(int id,ReadingExercise readingExercise);
    Task<ReadingExercise> DeleteAsync(int id);
}