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

        var exerciseExists = await _context.WritingExercises
            .AnyAsync(
                e => e.Id == attempt.ExerciseId,
                cancellationToken);

        if (!exerciseExists)
            throw new InvalidOperationException(
                "Không tìm thấy bài Writing.");

        await using var transaction =
            await _context.Database.BeginTransactionAsync(
                cancellationToken);

        try
        {
            await _context.UserWritingAttempts.AddAsync(
                attempt, cancellationToken);

            // Lưu lần làm bài trước để lấy ID tự tăng.
            await _context.SaveChangesAsync(cancellationToken);

            foreach (var score in scores)
            {
                score.AttemptId = attempt.Id;
            }

            await _context.UserWritingCriterionScores.AddRangeAsync(
                scores, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            await transaction.CommitAsync(cancellationToken);
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }
}