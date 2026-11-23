using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IReadingQuestionRepository
{
    Task <List<ReadingQuestion>> getAllAsync(int id);
    Task<ReadingQuestion?> getbyIdAsync(int id,int questionId);
    Task<ReadingQuestion> AddAsync(ReadingQuestion readingQuestion);
    Task<ReadingQuestion> UpdateAsync(int id,ReadingQuestion readingQuestion);
    Task<ReadingQuestion> DeleteAsync(int id);
    
}