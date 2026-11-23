using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ReadingTestRepository:IReadingTestRepository
{
    public readonly AppDbContext _context;
    public ReadingTestRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<ReadingTest>> GetAllAsync()
    {
        return await _context.ReadingTests
            .AsNoTracking()
            .OrderByDescending(e=>e.CreatedAt)
            .Include(e => e.ReadingExercises.OrderBy(r=>r.Passage))
            .ThenInclude(a => a.ReadingQuestions)
            .ToListAsync(); 
    }

    public async Task<ReadingTest?> GetByIdAsync(int id)
    {
        return await _context.ReadingTests
            .AsNoTracking()
            .Include(e => e.ReadingExercises.OrderBy(r=>r.Passage))
            .ThenInclude(a => a.ReadingQuestions)
            .FirstOrDefaultAsync(r => r.Id == id);;
    }


    public async Task<ReadingTest> AddAsync(ReadingTest readingTest)
    {
        await _context.ReadingTests.AddAsync(readingTest);
        await _context.SaveChangesAsync();
        return readingTest;
    }

    public async Task<ReadingTest> UpdateAsync(int id,ReadingTest readingTest)
    {
      var test =  await _context.ReadingTests.FindAsync(id);
      if (test == null)
      {
          return null;
      }
      test.Title = readingTest.Title;
      test.Level = readingTest.Level;
      _context.ReadingTests.Update(test);
      await  _context.SaveChangesAsync();
      return test;
    }

    public async Task<ReadingTest> DeleteAsync(int id)
    {
        var test = await _context.ReadingTests.FindAsync(id);
        if (test == null)
        {
            return null;
        }
        _context.ReadingTests.Remove(test);
        await _context.SaveChangesAsync();
        return test;
    }
}
