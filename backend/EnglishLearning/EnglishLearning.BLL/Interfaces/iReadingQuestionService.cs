using EnglishLearning.BLL.DTOs;

namespace EnglishLearning.BLL.Interfaces;

public interface iReadingQuestionService
{
    Task<List<ReadingQuestionDTO>> GetAllAsync(int id);
    Task<ReadingQuestionDTO> GetByIdAsync(int id,int exerciseId);
    Task<ReadingQuestionDTO> AddAsync(int ExerciseId,ReadingQuestionDTO readingQuestionDTO);
    Task<ReadingQuestionDTO> UpdateAsync(int exerciseId,ReadingQuestionDTO readingQuestionDTO);
    Task<ReadingQuestionDTO> DeleteAsync(int exerciseId);
    
}