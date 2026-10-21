using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class SpeakingExerciseRepository : ISpeakingExerciseRepository
{
    private readonly AppDbContext _context;

    public SpeakingExerciseRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SpeakingExercise>> GetAllAsync()
    {
        return await _context.SpeakingExercises
            .AsNoTracking()
            .Include(e => e.Topic)
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();
    }

    public async Task<SpeakingExercise?> GetByIdAsync(int id)
    {
        return await _context.SpeakingExercises
            .AsNoTracking()
            .Include(e => e.Topic)
            .FirstOrDefaultAsync(e => e.Id == id);
    }
}