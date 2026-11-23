
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ListeningExerciseRepository : IListeningExerciseRepository
{
    public readonly AppDbContext _context;

    public ListeningExerciseRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<List<ListeningExercise>> GetAllAsync(int id)
    {
        return _context.ListeningExercises
            .AsNoTracking()
            .Where(a => a.ListeningTestId == id)
            .OrderBy(a => a.Passage)
            .Include(a => a.Topic)
            .Include(a => a.ListeningQuestions)
            .ToListAsync();
    }

    public Task<ListeningExercise?> GetByIdAsync(int exerciseId)
    {
        return _context.ListeningExercises
            .AsNoTracking()
            .Include(a => a.Topic)
            .Include(a => a.ListeningQuestions)
            .FirstOrDefaultAsync(e => e.Id == exerciseId);
    }

    public async Task<ListeningExercise> AddAsync(ListeningExercise listeningExercise)
    {
        await _context.ListeningExercises.AddAsync(listeningExercise);
        await _context.SaveChangesAsync();

        return listeningExercise;
    }

    public async Task<ListeningExercise> UpdateAsync(int id, ListeningExercise listeningExercise)
    {
        var result = await _context.ListeningExercises.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        result.Title = listeningExercise.Title;
        result.Level = listeningExercise.Level;
        result.TopicId = listeningExercise.TopicId;
        result.Passage = listeningExercise.Passage;
        result.ImageUrl = listeningExercise.ImageUrl;
        result.AudioType = listeningExercise.AudioType;
        result.AudioUrl = listeningExercise.AudioUrl;
        result.Transcript = listeningExercise.Transcript;

        _context.ListeningExercises.Update(result);
        await _context.SaveChangesAsync();

        return result;
    }

    public async Task<ListeningExercise> DeleteAsync(int id)
    {
        var result = await _context.ListeningExercises.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        _context.ListeningExercises.Remove(result);
        await _context.SaveChangesAsync();

        return result;
    }
}
