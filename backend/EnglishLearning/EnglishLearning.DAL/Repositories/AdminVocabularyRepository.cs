using System.Data;
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public sealed class AdminVocabularyRepository(AppDbContext db) : IAdminVocabularyRepository
{
    private IQueryable<Topic> SystemSets => db.Topics
        .Where(t => t.ModuleType == "VOCABULARY" && t.CreateByUserId == null);
    private IQueryable<Word> SetWords(int id) => db.Words
        .Where(w => w.TopicId == id && w.Topic.ModuleType == "VOCABULARY" && w.Topic.CreateByUserId == null);

    public async Task<AdminPageDto<AdminVocabularySetDto>> GetSetsAsync(AdminVocabularyQuery query, CancellationToken ct)
    {
        var sets = SystemSets.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(query.Search))
            sets = sets.Where(t => t.Name.Contains(query.Search) || (t.Description != null && t.Description.Contains(query.Search)));
        var total = await sets.CountAsync(ct);
        var page = ClampPage(query.Page, query.PageSize, total);
        var items = await sets.OrderBy(t => t.Id).Skip((page - 1) * query.PageSize).Take(query.PageSize)
            .Select(t => new AdminVocabularySetDto(t.Id, t.Name, t.Description, db.Words.Count(w => w.TopicId == t.Id), t.ImageURL))
            .ToListAsync(ct);
        return new() { Items = items, Page = page, PageSize = query.PageSize, TotalCount = total };
    }

    public Task<AdminVocabularySetDto?> GetSetAsync(int id, CancellationToken ct) => SystemSets.AsNoTracking()
        .Where(t => t.Id == id)
        .Select(t => new AdminVocabularySetDto(t.Id, t.Name, t.Description, db.Words.Count(w => w.TopicId == t.Id), t.ImageURL))
        .SingleOrDefaultAsync(ct);

    public async Task<AdminVocabularyWordsDto?> GetWordsAsync(int id, AdminVocabularyQuery query, CancellationToken ct)
    {
        if (!await SystemSets.AnyAsync(t => t.Id == id, ct)) return null;
        var words = SetWords(id).AsNoTracking();
        var options = await words.Select(w => w.PartOfSpeech).Distinct().OrderBy(p => p).ToListAsync(ct);
        if (!string.IsNullOrWhiteSpace(query.Search))
            words = words.Where(w => w.WordText.Contains(query.Search) || w.Meaning.Contains(query.Search)
                || w.Phonetic.Contains(query.Search) || w.Example.Contains(query.Search));
        if (!string.IsNullOrWhiteSpace(query.PartOfSpeech))
            words = words.Where(w => w.PartOfSpeech == query.PartOfSpeech);
        var total = await words.CountAsync(ct);
        var page = ClampPage(query.Page, query.PageSize, total);
        var items = await words.OrderBy(w => w.Id).Skip((page - 1) * query.PageSize).Take(query.PageSize)
            .Select(w => new AdminVocabularyWordDto(w.Id, w.TopicId, w.WordText, w.Meaning, w.Phonetic, w.PartOfSpeech, w.Example))
            .ToListAsync(ct);
        return new(new() { Items = items, Page = page, PageSize = query.PageSize, TotalCount = total }, options);
    }

    public Task<AdminVocabularyWordDto?> GetWordAsync(int id, int wordId, CancellationToken ct) => SetWords(id).AsNoTracking()
        .Where(w => w.Id == wordId)
        .Select(w => new AdminVocabularyWordDto(w.Id, w.TopicId, w.WordText, w.Meaning, w.Phonetic, w.PartOfSpeech, w.Example))
        .SingleOrDefaultAsync(ct);

    public async Task<AdminVocabularySetDto> SaveSetAsync(int? id, Topic values, CancellationToken ct)
    {
        await using var transaction = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable, ct);
        var existingId = id.GetValueOrDefault();
        var topic = id.HasValue
            ? await SystemSets.SingleOrDefaultAsync(t => t.Id == existingId, ct)
                ?? throw new KeyNotFoundException("Không tìm thấy bộ từ hệ thống.")
            : values;
        if (await SystemSets.AnyAsync(t => t.Id != existingId && t.Name == values.Name, ct))
            throw new InvalidOperationException("Tên bộ từ này đã tồn tại.");
        topic.Name = values.Name;
        topic.Description = values.Description;
        topic.ImageURL = values.ImageURL;
        if (!id.HasValue) db.Topics.Add(topic);
        await db.SaveChangesAsync(ct);
        var count = await db.Words.CountAsync(w => w.TopicId == topic.Id, ct);
        await transaction.CommitAsync(ct);
        return new(topic.Id, topic.Name, topic.Description, count, topic.ImageURL);
    }

    public async Task<AdminVocabularyWordDto> SaveWordAsync(int id, int? wordId, Word values, CancellationToken ct)
    {
        await using var transaction = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable, ct);
        var existingWordId = wordId.GetValueOrDefault();
        if (!await SystemSets.AnyAsync(t => t.Id == id, ct))
            throw new KeyNotFoundException("Không tìm thấy bộ từ hệ thống.");
        var word = wordId.HasValue
            ? await SetWords(id).SingleOrDefaultAsync(w => w.Id == existingWordId, ct)
                ?? throw new KeyNotFoundException("Không tìm thấy từ vựng trong bộ từ này.")
            : values;
        var otherWords = await SetWords(id).AsNoTracking().Where(w => w.Id != existingWordId)
            .Select(w => new { w.WordText, w.PartOfSpeech, w.Meaning }).ToListAsync(ct);
        if (otherWords.Any(w => Identity(w.WordText, w.PartOfSpeech, w.Meaning)
            == Identity(values.WordText, values.PartOfSpeech, values.Meaning)))
            throw new InvalidOperationException("Từ, từ loại và nghĩa này đã có trong bộ từ.");
        word.TopicId = id;
        word.WordText = values.WordText;
        word.Meaning = values.Meaning;
        word.Phonetic = values.Phonetic;
        word.PartOfSpeech = values.PartOfSpeech;
        word.Example = values.Example;
        if (!wordId.HasValue) db.Words.Add(word);
        await db.SaveChangesAsync(ct);
        await transaction.CommitAsync(ct);
        return new(word.Id, id, word.WordText, word.Meaning, word.Phonetic, word.PartOfSpeech, word.Example);
    }

    public async Task DeleteSetAsync(int id, CancellationToken ct)
    {
        await using var transaction = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable, ct);
        var topic = await SystemSets.SingleOrDefaultAsync(t => t.Id == id, ct)
            ?? throw new KeyNotFoundException("Không tìm thấy bộ từ hệ thống.");
        // Serializable reads also protect the progress check against concurrent reviews.
        var words = await SetWords(id).ToListAsync(ct);
        if (await db.UserWordProgresses.AnyAsync(p => p.Word.TopicId == id, ct))
            throw new InvalidOperationException("Bộ từ đã có tiến độ học của người dùng nên không thể xóa. Bạn vẫn có thể chỉnh sửa nội dung.");
        db.Words.RemoveRange(words);
        db.Topics.Remove(topic);
        await db.SaveChangesAsync(ct);
        await transaction.CommitAsync(ct);
    }

    public async Task DeleteWordAsync(int id, int wordId, CancellationToken ct)
    {
        await using var transaction = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable, ct);
        var word = await SetWords(id).SingleOrDefaultAsync(w => w.Id == wordId, ct)
            ?? throw new KeyNotFoundException("Không tìm thấy từ vựng trong bộ từ hệ thống này.");
        if (await db.UserWordProgresses.AnyAsync(p => p.WordId == wordId, ct))
            throw new InvalidOperationException("Từ này đã có tiến độ học của người dùng nên không thể xóa. Bạn vẫn có thể chỉnh sửa nội dung.");
        db.Words.Remove(word);
        await db.SaveChangesAsync(ct);
        await transaction.CommitAsync(ct);
    }

    private static int ClampPage(int page, int size, int total) => Math.Min(page, Math.Max(1, (int)Math.Ceiling((double)total / size)));
    private static string Identity(params string[] values) => string.Join('\u001f', values.Select(value =>
        string.Join(' ', value.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries)).ToLowerInvariant()));
}
