using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class UserReadingAttemptRepository :IUserReadingAttemptRepository
{
    private readonly AppDbContext _context;
    public UserReadingAttemptRepository(AppDbContext context)
    {
        _context = context;
    }

  public async Task<List<UserReadingAttempt>> GetAllAsync()
    {
        return await _context.UserReadingAttempts
            .AsNoTracking()
            .OrderBy(a => a.CompletedAt)
            .Include(a => a.UserReadingAnswers)
            .ThenInclude(a => a.Question).ThenInclude(a => a.ReadingQuestionOptions)
            .Include(a => a.UserReadingAnswers)
            .ThenInclude(a => a.Question).ThenInclude(a => a.FillinBlanksAnswers)
            .ToListAsync();
    }

   public async Task<UserReadingAttempt?> GetByIdAsync(int id)
    {
        return await _context.UserReadingAttempts
            .AsNoTracking()
            .Include(a => a.UserReadingAnswers)
            .ThenInclude(a => a.Question).ThenInclude(a => a.ReadingQuestionOptions)
            .Include(a => a.UserReadingAnswers)
            .ThenInclude(a => a.Question).ThenInclude(a => a.FillinBlanksAnswers)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<UserReadingAttempt> AddAsync(UserReadingAttempt readingTest)
    {
        Console.WriteLine(
            $"Số Answers nhận được: {readingTest.UserReadingAnswers.Count}"
        );
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var attempt = new UserReadingAttempt
            {
                UserId = readingTest.UserId,
                TestId = readingTest.TestId,
                StartedAt = readingTest.StartedAt,
                CompletedAt = readingTest.CompletedAt,
                Score = readingTest.Score,
                TotalQuestions = readingTest.TotalQuestions,
                CorrectAnswersNum = readingTest.CorrectAnswersNum,
            };
            _context.UserReadingAttempts.Add(attempt);
            await _context.SaveChangesAsync();
            Console.WriteLine($"AttemptId vừa tạo: {attempt.Id}");
            int attemptId = attempt.Id;
            foreach (var answer in readingTest.UserReadingAnswers)
            {
                var UserAnswer = new UserReadingAnswer
                {
                    AttemptId = attemptId,
                    QuestionId = answer.QuestionId,
                    UserAnswer = answer.UserAnswer,
                    IsCorrect = answer.IsCorrect,
                    Question = answer.Question,
                };
                _context.UserReadingAnswers.Add(UserAnswer);
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return attempt;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<UserReadingAttempt> DeleteAsync(int id)
   {
       var result = await _context.UserReadingAttempts.FindAsync(id);
       if (result == null)
       {
           return null;
       }
        _context.UserReadingAttempts.Remove(result);
        await _context.SaveChangesAsync();
        return result;
   }

   public async Task<List<UserReadingAttempt>> GetByUserID(int userId)
   {
       return await _context.UserReadingAttempts
           .AsNoTracking()
           .Where(a => a.UserId == userId)
           .OrderBy(a => a.CompletedAt)
           .Include(a => a.UserReadingAnswers)
           .ThenInclude(a => a.Question).ThenInclude(a => a.ReadingQuestionOptions)
           .Include(a => a.UserReadingAnswers)
           .ThenInclude(a => a.Question).ThenInclude(a => a.FillinBlanksAnswers)
           .ToListAsync();
   }
    
}