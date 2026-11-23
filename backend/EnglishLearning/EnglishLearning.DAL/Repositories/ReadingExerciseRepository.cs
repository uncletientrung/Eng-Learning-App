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

   public Task<List<ReadingExercise>> GetAllAsync(int id)
    {
        return _context.ReadingExercises
            .AsNoTracking()
            .Where(a => a.ReadingTestId ==id )
            .OrderBy(a => a.Passage)
            .Include(a => a.Topic)
            .Include(a => a.ReadingQuestions)
            .ToListAsync();
    }

   public Task<ReadingExercise?> GetByIdAsync( int exerciseId)
   {
       return _context.ReadingExercises
           .AsNoTracking()
           .Include(a => a.Topic)
           .Include(a => a.ReadingQuestions)
           .FirstOrDefaultAsync(e => e.Id == exerciseId);
   }

   public async Task<ReadingExercise> AddAsync(ReadingExercise readingExercise)
   {
       await _context.ReadingExercises.AddAsync(readingExercise);
       await _context.SaveChangesAsync();
       return readingExercise;
   }

   public async Task<ReadingExercise> UpdateAsync(int id, ReadingExercise readingExercise)
   {
       var result = await _context.ReadingExercises.FindAsync(id);
       if (result == null)
       {
           return null;
       }
       
           result.Title=readingExercise.Title;
           result.Level=readingExercise.Level;
           result.TopicId=readingExercise.TopicId;
           result.Passage=readingExercise.Passage;
           result.ImageUrl = readingExercise.ImageUrl;
           result.Content = readingExercise.Content;
        
           _context.ReadingExercises.Update(result);
           await _context.SaveChangesAsync();
           return result;

   }

   public async Task<ReadingExercise> DeleteAsync(int id)
   {
       var result = await _context.ReadingExercises.FindAsync(id);
       if (result == null)
       {
           return null;
       }
       _context.ReadingExercises.Remove(result);
       await _context.SaveChangesAsync();
       return result;
   }
   
}