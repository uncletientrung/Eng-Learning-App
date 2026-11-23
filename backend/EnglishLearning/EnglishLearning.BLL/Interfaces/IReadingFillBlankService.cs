using EnglishLearning.BLL.DTOs;

namespace EnglishLearning.BLL.Interfaces;

public interface IReadingFillBlankService
{
    Task<List<ReadingFillBlankAnswerDTO>> GetAllAsync(int questionId);

    Task<ReadingFillBlankAnswerDTO?> GetById(int id);

    Task<ReadingFillBlankAnswerDTO> AddAsync(
        ReadingFillBlankAnswerDTO readingFillBlankAnswerDTO);

    Task<ReadingFillBlankAnswerDTO?> UpdateAsync(
        int id,
        ReadingFillBlankAnswerDTO readingFillBlankAnswerDTO);

    Task<ReadingFillBlankAnswerDTO?> DeleteAsync(int id);
}