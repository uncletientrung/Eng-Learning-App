using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface ISpeakingExerciseRepository
{
    Task<List<SpeakingExercise>> GetAllAsync();

    Task<List<SpeakingExercise>> GetAllWithQuestionsAsync();

    Task<SpeakingExercise?> GetByIdAsync(int id);
}