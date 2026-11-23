using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ReadingFillBlankRepository : IReadingFillBlankRepository
{
    private readonly AppDbContext _context;

    public ReadingFillBlankRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ReadingFillBlankAnswer> AddAsync(
        ReadingFillBlankAnswer readingFillBlankAnswer)
    {
        await _context.ReadingFillBlankAnswers.AddAsync(readingFillBlankAnswer);
        await _context.SaveChangesAsync();

        return readingFillBlankAnswer;
    }

    public async Task<List<ReadingFillBlankAnswer>> GetAllAsync(int questionId)
    {
        return await _context.ReadingFillBlankAnswers
            .AsNoTracking()
            .Where(a => a.QuestionId == questionId)
            .OrderBy(a => a.BlankNumber)
            .ToListAsync();
    }

    public async Task<ReadingFillBlankAnswer?> GetById(int id)
    {
        return await _context.ReadingFillBlankAnswers
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<ReadingFillBlankAnswer?> UpdateAsync(
        int id,
        ReadingFillBlankAnswer readingFillBlankAnswer)
    {
        var result = await _context.ReadingFillBlankAnswers.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        result.BlankNumber = readingFillBlankAnswer.BlankNumber;
        result.CorrectAnswer = readingFillBlankAnswer.CorrectAnswer;

        await _context.SaveChangesAsync();

        return result;
    }

    public async Task<ReadingFillBlankAnswer?> DeleteAsync(int id)
    {
        var result = await _context.ReadingFillBlankAnswers.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        _context.ReadingFillBlankAnswers.Remove(result);
        await _context.SaveChangesAsync();

        return result;
    }
}