using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IWritingExerciseRepository
{
    Task<List<WritingExercise>> GetAllAsync();

    Task<WritingExercise?> GetByIdAsync(int id);

    Task AddAsync(WritingExercise exercise);

    Task SaveChangesAsync();
}