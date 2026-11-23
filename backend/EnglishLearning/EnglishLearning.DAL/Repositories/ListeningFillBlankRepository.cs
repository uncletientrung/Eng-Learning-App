
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ListeningFillBlankRepository : IListeningFillBlankRepository
{
    private readonly AppDbContext _context;

    public ListeningFillBlankRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ListeningFillBlankAnswer> AddAsync(
        ListeningFillBlankAnswer listeningFillBlankAnswer)
    {
        await _context.ListeningFillBlankAnswers.AddAsync(listeningFillBlankAnswer);
        await _context.SaveChangesAsync();

        return listeningFillBlankAnswer;
    }

    public async Task<List<ListeningFillBlankAnswer>> GetAllAsync(int questionId)
    {
        return await _context.ListeningFillBlankAnswers
            .AsNoTracking()
            .Where(a => a.QuestionId == questionId)
            .OrderBy(a => a.BlankNumber)
            .ToListAsync();
    }

    public async Task<ListeningFillBlankAnswer?> GetById(int id)
    {
        return await _context.ListeningFillBlankAnswers
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<ListeningFillBlankAnswer?> UpdateAsync(
        int id,
        ListeningFillBlankAnswer listeningFillBlankAnswer)
    {
        var result = await _context.ListeningFillBlankAnswers.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        result.BlankNumber = listeningFillBlankAnswer.BlankNumber;
        result.CorrectAnswer = listeningFillBlankAnswer.CorrectAnswer;

        await _context.SaveChangesAsync();

        return result;
    }

    public async Task<ListeningFillBlankAnswer?> DeleteAsync(int id)
    {
        var result = await _context.ListeningFillBlankAnswers.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        _context.ListeningFillBlankAnswers.Remove(result);
        await _context.SaveChangesAsync();

        return result;
    }
}
