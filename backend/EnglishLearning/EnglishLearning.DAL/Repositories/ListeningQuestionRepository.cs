
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class ListeningQuestionRepository : IListeningQuestionRepository
{
    public readonly AppDbContext _context;

    public ListeningQuestionRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<List<ListeningQuestion>> GetAllAsync(int id)
    {
        return _context.ListeningQuestions
            .AsNoTracking()
            .Where(a => a.ExerciseId == id)
            .OrderBy(a => a.QuestionNumber)
            .Include(a => a.ListeningQuestionOptions)
            .Include(a => a.FillinBlanksAnswers)
            .ToListAsync();
    }

    public Task<ListeningQuestion?> GetbyIdAsync(int id, int questionId)
    {
        return _context.ListeningQuestions
            .AsNoTracking()
            .Where(a => a.ExerciseId == id)
            .Include(a => a.ListeningQuestionOptions)
            .Include(a => a.FillinBlanksAnswers)
            .FirstOrDefaultAsync(a => a.Id == questionId);
    }

    public async Task<ListeningQuestion> AddAsync(ListeningQuestion listeningQuestion)
    {
        await _context.ListeningQuestions.AddAsync(listeningQuestion);
        await _context.SaveChangesAsync();

        return listeningQuestion;
    }

    public async Task<ListeningQuestion> UpdateAsync(int id, ListeningQuestion listeningQuestion)
    {
        var result = await _context.ListeningQuestions.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        result.QuestionNumber = listeningQuestion.QuestionNumber;
        result.QuestionType = listeningQuestion.QuestionType;
        result.QuestionText = listeningQuestion.QuestionText;
        result.Explanation = listeningQuestion.Explanation;

        _context.ListeningQuestions.Update(result);
        await _context.SaveChangesAsync();

        return result;
    }

    public async Task<ListeningQuestion> DeleteAsync(int id)
    {
        var result = await _context.ListeningQuestions.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        _context.ListeningQuestions.Remove(result);
        await _context.SaveChangesAsync();

        return result;
    }
}
