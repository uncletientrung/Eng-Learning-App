using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ReadingQuestionOptionRepository:IReadingQuestionOptionRepository
{
    private readonly AppDbContext _context;

    public ReadingQuestionOptionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ReadingQuestionOption> AddAsync(ReadingQuestionOption readingQuestionOption)
    {
        _context.ReadingQuestionOptions.AddAsync(readingQuestionOption);
        await _context.SaveChangesAsync();
        return readingQuestionOption;
    }

    public async Task<List<ReadingQuestionOption>> GetAllAsync(int questionId)
    {
        return await _context.ReadingQuestionOptions
            .AsNoTracking()
            .Where(a => a.QuestionId == questionId)
            .OrderBy(a => a.OptionKey)
            .ToListAsync();
    }

    public async Task<ReadingQuestionOption?> GetById(int optionid)
    {
        return await _context.ReadingQuestionOptions
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id==optionid);
        
    }

    public async Task<ReadingQuestionOption?> UpdateAsync(int optionid, ReadingQuestionOption readingQuestionOption)
    {
        var result = await _context.ReadingQuestionOptions.FindAsync(optionid);
        if (result == null)
        {
            return null;
        }

        result.OptionKey = readingQuestionOption.OptionKey;
        result.OptionText = readingQuestionOption.OptionText;
        result.IsCorrect = readingQuestionOption.IsCorrect;
        _context.ReadingQuestionOptions.Update(result);
        await _context.SaveChangesAsync();
        return result;
    }

    public async Task<ReadingQuestionOption> DeleteAsync(int optionid)
    {
        var result = await _context.ReadingQuestionOptions.FindAsync(optionid);
        if (result == null)
        {
            return null;
        }
         _context.ReadingQuestionOptions.Remove(result);
        await _context.SaveChangesAsync();
        return result;
    }
}