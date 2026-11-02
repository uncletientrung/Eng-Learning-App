using EnglishLearning.BLL.DTOs;

namespace EnglishLearning.BLL.Interfaces;

public interface IReadingExerciseService
{
    Task<List<ReadingExerciseDTO>> GetAllAsync();
    Task<List<ReadingExerciseDTO>> GetByIdAsync(int id);
}