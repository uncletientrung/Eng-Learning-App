using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface ISpeakingExerciseRepository
{
    Task<List<SpeakingExercise>> GetAllAsync();

    Task<SpeakingExercise?> GetByIdAsync(int id);
}