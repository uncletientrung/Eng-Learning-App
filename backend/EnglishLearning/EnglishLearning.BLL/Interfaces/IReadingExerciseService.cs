using EnglishLearning.BLL.DTOs;

namespace EnglishLearning.BLL.Interfaces;

public interface IReadingExerciseService
{
    Task<List<ReadingExerciseDTO>> GetAllAsync(int id);
    Task<ReadingExerciseDTO?> GetByIdAsync(int id);
    Task<ReadingExerciseDTO> AddAsync(ReadingExerciseDTO readingExercise);
}