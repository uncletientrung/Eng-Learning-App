using EnglishLearning.BLL.DTOs;

namespace EnglishLearning.BLL.Interfaces;

public interface IReadingQuestionOptionService
{
    Task<List<ReadingQuestionOptionDTO>> GetAllAsync(int questionId);
    Task<ReadingQuestionOptionDTO> GetById(int optionid);
    Task<ReadingQuestionOptionDTO> AddAsync(ReadingQuestionOptionDTO readingQuestionOptionDTO);
    Task<ReadingQuestionOptionDTO> UpdateAsync(int optionid,ReadingQuestionOptionDTO readingQuestionOptionDTO);
    Task<ReadingQuestionOptionDTO> DeleteAsync(int optionid);
}