using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IReadingQuestionOptionRepository
{
     Task<List<ReadingQuestionOption>> GetAllAsync(int  questionId);
     Task<ReadingQuestionOption?> GetById(int optionid);
     Task<ReadingQuestionOption> AddAsync(ReadingQuestionOption readingQuestionOption);
     Task<ReadingQuestionOption> UpdateAsync(int optionid, ReadingQuestionOption readingQuestionOption);
     Task<ReadingQuestionOption> DeleteAsync(int optionid);
}