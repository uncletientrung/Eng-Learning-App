
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ListeningQuestionOptionRepository : IListeningQuestionOptionRepository
{
    private readonly AppDbContext _context;

    public ListeningQuestionOptionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ListeningQuestionOption> AddAsync(
        ListeningQuestionOption listeningQuestionOption)
    {
        await _context.ListeningQuestionOptions.AddAsync(listeningQuestionOption);
        await _context.SaveChangesAsync();

        return listeningQuestionOption;
    }

    public async Task<List<ListeningQuestionOption>> GetAllAsync(int questionId)
    {
        return await _context.ListeningQuestionOptions
            .AsNoTracking()
            .Where(a => a.QuestionId == questionId)
            .OrderBy(a => a.OptionKey)
            .ToListAsync();
    }

    public async Task<ListeningQuestionOption?> GetById(int optionid)
    {
        return await _context.ListeningQuestionOptions
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == optionid);
    }

    public async Task<ListeningQuestionOption?> UpdateAsync(
        int optionid,
        ListeningQuestionOption listeningQuestionOption)
    {
        var result = await _context.ListeningQuestionOptions.FindAsync(optionid);

        if (result == null)
        {
            return null;
        }

        result.OptionKey = listeningQuestionOption.OptionKey;
        result.OptionText = listeningQuestionOption.OptionText;
        result.IsCorrect = listeningQuestionOption.IsCorrect;

        _context.ListeningQuestionOptions.Update(result);
        await _context.SaveChangesAsync();

        return result;
    }

    public async Task<ListeningQuestionOption> DeleteAsync(int optionid)
    {
        var result = await _context.ListeningQuestionOptions.FindAsync(optionid);

        if (result == null)
        {
            return null;
        }

        _context.ListeningQuestionOptions.Remove(result);
        await _context.SaveChangesAsync();

        return result;
    }
}
