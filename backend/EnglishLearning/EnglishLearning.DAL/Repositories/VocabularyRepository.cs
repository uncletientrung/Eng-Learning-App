using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public sealed class VocabularyRepository(AppDbContext db) : IVocabularyRepository
{
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
