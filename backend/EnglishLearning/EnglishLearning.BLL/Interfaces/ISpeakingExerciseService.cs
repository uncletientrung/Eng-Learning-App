using EnglishLearning.BLL.DTOs.SpeakingExercises;

namespace EnglishLearning.BLL.Interfaces;

public interface ISpeakingExerciseService
{
    Task<List<SpeakingExerciseDto>> GetAllAsync();

    Task<SpeakingExerciseDto?> GetByIdAsync(int id);
}