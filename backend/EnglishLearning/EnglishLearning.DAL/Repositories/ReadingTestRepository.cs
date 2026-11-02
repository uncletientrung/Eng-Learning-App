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
            .ToListAsync(); 
    }

    public async Task<ReadingTest?> GetByIdAsync(int id)
    {
        return await _context.ReadingTests
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id);;
    }


    public async Task<ReadingTest> AddAsync(ReadingTest readingTest)
    {
        await _context.ReadingTests.AddAsync(readingTest);
        await _context.SaveChangesAsync();
        return readingTest;
    }
}