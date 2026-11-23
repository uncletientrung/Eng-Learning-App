
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class UserListeningAttemptRepository : IUserListeningAttemptRepository
{
    private readonly AppDbContext _context;

    public UserListeningAttemptRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserListeningAttempt>> GetAllAsync()
    {
        return await _context.UserListeningAttempts
            .AsNoTracking()
            .OrderBy(a => a.CompletedAt)
            .Include(a => a.UserListeningAnswers)
                .ThenInclude(a => a.Question)
                .ThenInclude(a => a.ListeningQuestionOptions)
            .Include(a => a.UserListeningAnswers)
                .ThenInclude(a => a.Question)
                .ThenInclude(a => a.FillinBlanksAnswers)
            .ToListAsync();
    }

    public async Task<UserListeningAttempt?> GetByIdAsync(int id)
    {
        return await _context.UserListeningAttempts
            .AsNoTracking()
            .Include(a => a.UserListeningAnswers)
                .ThenInclude(a => a.Question)
                .ThenInclude(a => a.ListeningQuestionOptions)
            .Include(a => a.UserListeningAnswers)
                .ThenInclude(a => a.Question)
                .ThenInclude(a => a.FillinBlanksAnswers)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<UserListeningAttempt> AddAsync(UserListeningAttempt listeningTest)
    {
        Console.WriteLine(
            $"Số Answers nhận được: {listeningTest.UserListeningAnswers.Count}"
        );

        await using var transaction =
            await _context.Database.BeginTransactionAsync();

        try
        {
            var attempt = new UserListeningAttempt
            {
                UserId = listeningTest.UserId,
                TestId = listeningTest.TestId,
                StartedAt = listeningTest.StartedAt,
                CompletedAt = listeningTest.CompletedAt,
                Score = listeningTest.Score,
                TotalQuestions = listeningTest.TotalQuestions,
                CorrectAnswersNum = listeningTest.CorrectAnswersNum,
            };

            _context.UserListeningAttempts.Add(attempt);
            await _context.SaveChangesAsync();

            Console.WriteLine($"AttemptId vừa tạo: {attempt.Id}");

            int attemptId = attempt.Id;

            foreach (var answer in listeningTest.UserListeningAnswers)
            {
                var UserAnswer = new UserListeningAnswer
                {
                    AttemptId = attemptId,
                    QuestionId = answer.QuestionId,
                    UserAnswer = answer.UserAnswer,
                    IsCorrect = answer.IsCorrect,
                    Question = answer.Question,
                };

                _context.UserListeningAnswers.Add(UserAnswer);
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

    public async Task<UserListeningAttempt> DeleteAsync(int id)
    {
        var result = await _context.UserListeningAttempts.FindAsync(id);

        if (result == null)
        {
            return null;
        }

        _context.UserListeningAttempts.Remove(result);
        await _context.SaveChangesAsync();

        return result;
    }

    public async Task<List<UserListeningAttempt>> GetByUserID(int userId)
    {
        return await _context.UserListeningAttempts
            .AsNoTracking()
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.CompletedAt)
            .Include(a => a.UserListeningAnswers)
                .ThenInclude(a => a.Question)
                .ThenInclude(a => a.ListeningQuestionOptions)
            .Include(a => a.UserListeningAnswers)
                .ThenInclude(a => a.Question)
                .ThenInclude(a => a.FillinBlanksAnswers)
            .ToListAsync();
    }
}
