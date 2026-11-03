using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public sealed class VocabularyRepository(AppDbContext db) : IVocabularyRepository
{
    public Task<User?> GetUserAsync(int userId, CancellationToken ct) =>
        db.Users.AsNoTracking().FirstOrDefaultAsync(user => user.Id == userId, ct);

    public Task<List<Topic>> GetSetsAsync(int userId, bool personal, CancellationToken ct) =>
        db.Topics.AsNoTracking() // read -> no tracking
            .Where(t => t.ModuleType == "VOCABULARY" &&
                (personal ? t.CreateByUserId == userId : t.CreateByUserId == null))
            .OrderBy(t => t.Id).ToListAsync(ct);

    public Task<Topic?> GetSetAsync(int id, int userId, bool ownedOnly, CancellationToken ct) =>
        db.Topics.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id &&
            t.ModuleType == "VOCABULARY" &&
            (t.CreateByUserId == userId || (!ownedOnly && t.CreateByUserId == null)), ct);

    public Task<Dictionary<int, int>> GetWordCountsAsync(int[] topicIds, CancellationToken ct) =>
        db.Words.AsNoTracking()
            .Where(w => Enumerable.Contains(topicIds, w.TopicId)) // Từ nằm trong Topic không?
            .GroupBy(w => w.TopicId)
            .Select(g => new { 
                Id = g.Key, 
                Count = g.Count() 
            })
            .ToDictionaryAsync(g => g.Id, g => g.Count, ct); // Dictionary<int, int> { {id:1, count:3}, {2, 5} .. }

    public Task<List<Word>> GetWordsAsync(int[] topicIds, CancellationToken ct) =>
        db.Words.AsNoTracking()
            .Where(w => Enumerable.Contains(topicIds, w.TopicId))
            .OrderBy(w => w.Id).ToListAsync(ct);
    // Tương tự GetWordCountsAsync. (Không groupby, không đếm)

    public Task<List<UserWordProgress>> GetProgressAsync(int userId, CancellationToken ct) =>
        db.UserWordProgresses.AsNoTracking()
            .Include(p => p.Word).ThenInclude(w => w.Topic)
            .Where(p => p.UserId == userId && p.Word.Topic.ModuleType == "VOCABULARY" &&
                (p.Word.Topic.CreateByUserId == null || p.Word.Topic.CreateByUserId == userId))
            .OrderBy(p => p.Id).ToListAsync(ct);

    public async Task<UserWordProgress?> ReviewWordAsync(int setId, int wordId, int userId,
        Action<UserWordProgress> review, CancellationToken ct)
    {
        await using var transaction = await db.Database.BeginTransactionAsync(ct);
        // Serialize this user's reviews across tabs and sets before reading progress.
        var users = await db.Users.FromSqlInterpolated(
            $"SELECT * FROM `user` WHERE Id = {userId} FOR UPDATE").ToListAsync(ct);
        var user = users.SingleOrDefault();
        if (user is null) return null;

        // Lock the word while updating its progress to avoid duplicate rows or lost level increments.
        var words = await db.Words.FromSqlInterpolated(
            $"SELECT * FROM words WHERE Id = {wordId} AND topic_id = {setId} FOR UPDATE").ToListAsync(ct);
        var word = words.SingleOrDefault();
        if (word is null) return null;
        var progress = await db.UserWordProgresses
            .FirstOrDefaultAsync(p => p.UserId == userId && p.WordId == wordId, ct);
        if (progress is null)
        {
            progress = new UserWordProgress { UserId = userId, WordId = wordId, Word = word };
            db.UserWordProgresses.Add(progress);
        }
        review(progress);
        await db.SaveChangesAsync(ct);

        var today = DateOnly.FromDateTime(progress.LastReviewedAt);
        if ((user.LastStudyDate is null || user.LastStudyDate < today) &&
            !await db.Words.Where(w => w.TopicId == setId).AnyAsync(w =>
                !db.UserWordProgresses.Any(p => p.UserId == userId && p.WordId == w.Id &&
                    p.LastReviewedAt == progress.LastReviewedAt), ct))
        {
            user.CurrentStreak = user.LastStudyDate == today.AddDays(-1)
                ? user.CurrentStreak + 1 : 1;
            user.LastStudyDate = today;
            await db.SaveChangesAsync(ct);
        }

        await transaction.CommitAsync(ct);
        return progress;
    }

    public async Task AddSetAsync(Topic topic, CancellationToken ct)
    {
        db.Topics.Add(topic);
        await db.SaveChangesAsync(ct);
    }

    public async Task UpdateSetAsync(Topic topic, CancellationToken ct)
    {
        db.Topics.Update(topic);
        await db.SaveChangesAsync(ct);
    }

    public async Task DeleteSetAsync(Topic topic, CancellationToken ct)
    {
        db.Topics.Remove(topic);
        await db.SaveChangesAsync(ct);
    }

    public async Task AddWordsAsync(List<Word> words, CancellationToken ct)
    {
        db.Words.AddRange(words);
        await db.SaveChangesAsync(ct);
    }

    public async Task UpdateWordAsync(Word word, CancellationToken ct)
    {
        db.Words.Update(word);
        await db.SaveChangesAsync(ct);
    }

    public async Task DeleteWordsAsync(List<Word> words, CancellationToken ct)
    {
        db.Words.RemoveRange(words);
        await db.SaveChangesAsync(ct);
    }
}
