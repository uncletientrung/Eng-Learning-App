using EnglishLearning.BLL.DTOs;

namespace EnglishLearning.BLL.Interfaces;

public interface IReadingExerciseService
{
    Task<List<ReadingExerciseDTO>> GetAllAsync(int id);
    Task<ReadingExerciseDTO?> GetByIdAsync(int exerciseId);
    Task<ReadingExerciseDTO> AddAsync(ReadingExerciseDTO readingExerciseDTO);
    
    Task<ReadingExerciseDTO> UpdateAsync(int id,ReadingExerciseDTO readingExerciseDTO);
    Task<ReadingExerciseDTO> DeleteAsync(int id);
    
}