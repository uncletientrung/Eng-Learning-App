using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IReadingFillBlankRepository
{
    Task<ReadingFillBlankAnswer> AddAsync(
        ReadingFillBlankAnswer readingFillBlankAnswer);

    Task<List<ReadingFillBlankAnswer>> GetAllAsync(int questionId);

    Task<ReadingFillBlankAnswer?> GetById(int id);

    Task<ReadingFillBlankAnswer?> UpdateAsync(
        int id,
        ReadingFillBlankAnswer readingFillBlankAnswer);

    Task<ReadingFillBlankAnswer?> DeleteAsync(int id);
}