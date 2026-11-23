using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ReadingQuestionRepository : IReadingQuestionRepository
{
    public readonly AppDbContext _context;

    public ReadingQuestionRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<List<ReadingQuestion>> getAllAsync(int id)
    {
        return _context.ReadingQuestions
            .AsNoTracking()
            .Where(a => a.ExerciseId == id)
            .OrderBy(a => a.QuestionNumber)
            .Include(a => a.ReadingQuestionOptions)
            .Include(a => a.FillinBlanksAnswers)
            .ToListAsync();
    }

    public Task<ReadingQuestion?> getbyIdAsync(int id,int questionId)
    {
        return _context.ReadingQuestions
            .AsNoTracking()
            .Where(a => a.ExerciseId == id)
            .Include(a => a.ReadingQuestionOptions)
            .Include(a => a.FillinBlanksAnswers)
            .FirstOrDefaultAsync(a => a.Id == questionId);
    }
    public async Task<ReadingQuestion> AddAsync(ReadingQuestion readingQuestion)
    {
        await _context.ReadingQuestions.AddAsync(readingQuestion);
        await _context.SaveChangesAsync();
        return readingQuestion;
    }

    public async Task<ReadingQuestion> UpdateAsync(int id, ReadingQuestion readingQuestion)
    {
        var result = await _context.ReadingQuestions.FindAsync(id);
        if (result == null)
        {
            return null;
        }
        result.QuestionNumber = readingQuestion.QuestionNumber;
        result.QuestionType = readingQuestion.QuestionType;
        result.QuestionText=readingQuestion.QuestionText;
        result.Explanation = readingQuestion.Explanation;
         _context.ReadingQuestions.Update(result);
        await _context.SaveChangesAsync();
        return result;
    }

    public async Task<ReadingQuestion> DeleteAsync(int id)
    {
        var result = await _context.ReadingQuestions.FindAsync(id);
        if (result == null)
        {
            return null;
        }
        _context.ReadingQuestions.Remove(result);
        await _context.SaveChangesAsync();
        return result;
    }
    
}
    