
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ListeningTestRepository : IListeningTestRepository
{
    public readonly AppDbContext _context;

    public ListeningTestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ListeningTest>> GetAllAsync()
    {
        return await _context.ListeningTests
            .AsNoTracking()
            .OrderByDescending(e => e.CreatedAt)
            .Include(e => e.ListeningExercises)
            .ThenInclude(a => a.ListeningQuestions)
            .ToListAsync();
    }

    public async Task<ListeningTest?> GetByIdAsync(int id)
    {
        return await _context.ListeningTests
            .AsNoTracking()
            .Include(e => e.ListeningExercises)
            .ThenInclude(a => a.ListeningQuestions)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<ListeningTest> AddAsync(ListeningTest listeningTest)
    {
        await _context.ListeningTests.AddAsync(listeningTest);
        await _context.SaveChangesAsync();
        return listeningTest;
    }

    public async Task<ListeningTest> UpdateAsync(int id, ListeningTest listeningTest)
    {
        var test = await _context.ListeningTests.FindAsync(id);

        if (test == null)
        {
            return null;
        }

        test.Title = listeningTest.Title;
        test.Level = listeningTest.Level;

        _context.ListeningTests.Update(test);
        await _context.SaveChangesAsync();

        return test;
    }

    public async Task<ListeningTest> DeleteAsync(int id)
    {
        var test = await _context.ListeningTests.FindAsync(id);

        if (test == null)
        {
            return null;
        }

        _context.ListeningTests.Remove(test);
        await _context.SaveChangesAsync();

        return test;
    }
}
