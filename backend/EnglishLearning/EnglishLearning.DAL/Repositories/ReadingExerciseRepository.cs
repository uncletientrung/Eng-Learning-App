using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ReadingExerciseRepository: IReadingExerciseRepository
{
    public readonly AppDbContext _context;

    public ReadingExerciseRepository(AppDbContext context)
    {
        _context = context;
    }

   public Task<List<ReadingExercise>> GetAllAsync()
    {
        return _context.ReadingExercises
            .AsNoTracking()
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();
    }

   public Task<List<ReadingExercise>> GetByIdAsync(int id)
   {
       return _context.ReadingExercises
           .AsNoTracking()
           .Where(a => a.ReadingTestId ==id )
           .OrderBy(a => a.Passage)
           .ToListAsync();
   }
}