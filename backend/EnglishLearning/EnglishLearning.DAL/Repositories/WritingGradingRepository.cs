 using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class WritingGradingRepository : IWritingGradingRepository
{
    private readonly AppDbContext _context;

    public WritingGradingRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task SaveAsync(
        UserWritingAttempt attempt,
        List<UserWritingCriterionScore> scores,
        CancellationToken cancellationToken = default)
    {
        // Kiểm tra khóa ngoại trước khi lưu.
        var userExists = await _context.Users
            .AnyAsync(u => u.Id == attempt.UserId, cancellationToken);

        if (!userExists)
            throw new InvalidOperationException(
                "Không tìm thấy người dùng.");

        var exerciseExists = await _context.WritingExercises.AnyAsync(e => e.Id == attempt.ExerciseId, cancellationToken);

        if (!exerciseExists)
            throw new InvalidOperationException(
                "Không tìm thấy bài Writing.");

        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            await _context.UserWritingAttempts.AddAsync(attempt, cancellationToken);

            // Lưu lần làm bài trước để lấy ID tự tăng.
            await _context.SaveChangesAsync(cancellationToken);

            foreach (var score in scores)
            {
                score.AttemptId = attempt.Id;
            }

            await _context.UserWritingCriterionScores.AddRangeAsync(scores, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            await transaction.CommitAsync(cancellationToken);
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    public Task<List<UserWritingAttempt>> GetHistoryByUserIdAsync(
        int userId,
        CancellationToken cancellationToken = default)
    {
        return _context.UserWritingAttempts
            .AsNoTracking()
            .Where(attempt => attempt.UserId == userId)
            .OrderByDescending(attempt => attempt.CompletedAt)
            .ThenByDescending(attempt => attempt.Id)
            .Select(attempt => new UserWritingAttempt
            {
                Id = attempt.Id,
                ExerciseId = attempt.ExerciseId,
                Exercise = new WritingExercise
                {
                    Id = attempt.Exercise.Id,
                    TopicId = attempt.Exercise.TopicId,
                    Title = attempt.Exercise.Title,
                    ImageUrl = attempt.Exercise.ImageUrl,
                    QuestionText = attempt.Exercise.QuestionText,
                    Topic = new Topic
                    {
                        Name = attempt.Exercise.Topic.Name
                    }
                },
                OverallScore = attempt.OverallScore,
                CompletedAt = attempt.CompletedAt,
            })
            .ToListAsync(cancellationToken);
    }

    public Task<UserWritingAttempt?> GetHistoryAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        return _context.UserWritingAttempts
            .AsNoTracking()
            .Include(attempt => attempt.Exercise)
                .ThenInclude(exercise => exercise.Topic)
            .Include(attempt => attempt.CriterionScores)
            .SingleOrDefaultAsync(
                attempt => attempt.UserId == userId && attempt.Id == attemptId,
                cancellationToken);
    }

    public Task<List<int>> GetUnattemptedExerciseIdsAsync(
        int userId,
        CancellationToken cancellationToken = default)
    {
        return _context.WritingExercises
            .AsNoTracking()
            .Where(exercise => !_context.UserWritingAttempts.Any(
                attempt => attempt.UserId == userId &&
                    attempt.ExerciseId == exercise.Id))
            .Select(exercise => exercise.Id)
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> DeleteHistoryAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        var attempt = await _context.UserWritingAttempts
            .SingleOrDefaultAsync(
                item => item.UserId == userId && item.Id == attemptId,
                cancellationToken);

        if (attempt == null)
            return false;

        _context.UserWritingAttempts.Remove(attempt);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}