using EnglishLearning.BLL.DTOs.Vocabulary;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public sealed class VocabularyService(IVocabularyRepository repository, TimeProvider? clock = null) : IVocabularyService
{
    private static readonly int[] ReviewDays = [0, 3, 7, 15, 30, 60, 90, 180];

    public async Task<VocabularyStreakDto?> GetStreakAsync(int userId, CancellationToken ct)
    {
        var user = await repository.GetUserAsync(userId, ct);
        if (user is null) return null;
        var today = DateOnly.FromDateTime(
            (clock ?? TimeProvider.System).GetUtcNow().ToOffset(TimeSpan.FromHours(7)).Date);
        var currentStreak = user.LastStudyDate >= today.AddDays(-1) && user.LastStudyDate <= today
            ? user.CurrentStreak : 0;
        var start = user.LastStudyDate is { } last && user.CurrentStreak > 0
            ? last.AddDays(1 - user.CurrentStreak) : (DateOnly?)null;
        return new(currentStreak, user.LastStudyDate, start, today, user.LastStudyDate == today);
    }

    private static int RememberedDelay(int level) =>
        level < ReviewDays.Length ? ReviewDays[level] : 365 * (level - 7);

    private static VocabularyProgressDto ToProgressDto(UserWordProgress progress, int wordCount) => new(
        ToDto(progress.Word), progress.Word.Topic.Name, wordCount,
        progress.Status, progress.Level, DateOnly.FromDateTime(progress.LastReviewedAt),
        DateOnly.FromDateTime(progress.NextReviewAt), RememberedDelay(Math.Min(127, progress.Level + 1)));

    public async Task<List<VocabularyProgressDto>> GetProgressAsync(int userId, CancellationToken ct)
    {
        var progress = await repository.GetProgressAsync(userId, ct);
        if (progress.Count == 0) return [];
        var counts = await repository.GetWordCountsAsync(progress.Select(p => p.Word.TopicId).Distinct().ToArray(), ct);
        return progress.Select(p => ToProgressDto(p, counts.GetValueOrDefault(p.Word.TopicId))).ToList();
    }

    public async Task<VocabularyProgressDto?> ReviewWordAsync(int id, int wordId, int userId,
        ReviewVocabularyWordRequest request, CancellationToken ct)
    {
        if (request.Status is < 1 or > 3) throw new ArgumentOutOfRangeException(nameof(request.Status));
        var topic = await repository.GetSetAsync(id, userId, false, ct);
        if (topic is null) return null;
        var progress = await repository.ReviewWordAsync(id, wordId, userId, entry =>
        {
            var today = (clock ?? TimeProvider.System).GetUtcNow().ToOffset(TimeSpan.FromHours(7)).Date;
            entry.Level = request.Status switch
            {
                1 => 0,
                2 => entry.Level,
                _ => (byte)Math.Min(127, entry.Level + 1),
            };
            var days = request.Status == 1 ? 0 : request.Status == 2 ? 1 : RememberedDelay(entry.Level);
            entry.Status = request.Status;
            entry.LastReviewedAt = today;
            entry.NextReviewAt = today.AddDays(days);
        }, ct);
        if (progress is null) return null;
        progress.Word.Topic = topic;
        var counts = await repository.GetWordCountsAsync([id], ct);
        return ToProgressDto(progress, counts.GetValueOrDefault(id));
    }

    // Entity db -> Dto
    private static VocabularyWordDto ToDto(Word w) =>
        new(w.Id, w.TopicId, w.WordText, w.Meaning, w.Phonetic, w.PartOfSpeech, w.Example);

    // Cá nhân: chi tiết các từ / Bộ chung: Thông tin + Số lượng từ
    public async Task<List<VocabularySetDto>> GetSetsAsync(int userId, bool personal, CancellationToken ct)
    {
        var sets = await repository.GetSetsAsync(userId, personal, ct);
        var ids = sets.Select(t => t.Id).ToArray();
        if (ids.Length == 0) return [];
        
        if (personal) // Cá nhân
        {
            var words = (await repository.GetWordsAsync(ids, ct)).ToLookup(w => w.TopicId);
            return sets.Select(t => new VocabularySetDto(t.Id, t.Name, t.Description,
                t.CreateByUserId, words[t.Id].Count(), words[t.Id].Select(ToDto).ToList())).ToList();
        }
        var counts = await repository.GetWordCountsAsync(ids, ct);
        return sets.Select(t => new VocabularySetDto(t.Id, t.Name, t.Description,
            t.CreateByUserId, counts.GetValueOrDefault(t.Id))).ToList();
    }

    public async Task<VocabularySetDto?> GetSetAsync(int id, int userId, CancellationToken ct)
    {
        var topic = await repository.GetSetAsync(id, userId, false, ct);
        if (topic is null) return null;
        var words = await repository.GetWordsAsync([id], ct);
        return new(
            id, 
            topic.Name, 
            topic.Description, 
            topic.CreateByUserId,
            words.Count, 
            words.Select(ToDto).ToList());
    }

    public async Task<VocabularySetDto> CreateSetAsync(int userId, SaveVocabularySetRequest request, CancellationToken ct)
    {
        var topic = new Topic { // Entity
            Name = request.Name.Trim(), 
            ModuleType = "VOCABULARY",
            CreateBy = "USER", 
            CreateByUserId = userId 
        };
        await repository.AddSetAsync(topic, ct); // save to db
        return new( // return dto
            topic.Id, 
            topic.Name, 
            null, 
            userId, 
            0, 
            []
        );
    }

    public async Task<bool> RenameSetAsync(int id, int userId, SaveVocabularySetRequest request, CancellationToken ct)
    {
        var topic = await repository.GetSetAsync(id, userId, true, ct);
        if (topic is null) return false;
        topic.Name = request.Name.Trim();
        await repository.UpdateSetAsync(topic, ct);
        return true;
    }

    public async Task<bool> DeleteSetAsync(int id, int userId, CancellationToken ct)
    {
        var topic = await repository.GetSetAsync(id, userId, true, ct);
        if (topic is null) return false;
        await repository.DeleteSetAsync(topic, ct);
        return true;
    }

    private static string Identity(string word, string type, string meaning) =>
        string.Join("\u001f", new[] { word, type, meaning }.Select(value =>
            string.Join(" ", value.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries)).ToLowerInvariant()));
    // Identity("  Hello   WORLD ", "Noun", "A   greeting") -> hello world␟noun␟a greeting

    public async Task<AddVocabularyWordsResult?> AddWordsAsync(int id, int userId, AddVocabularyWordsRequest request, CancellationToken ct)
    {
        if (await repository.GetSetAsync(id, userId, true, ct) is null) return null; // ko thuộc về user này thì ko cho tác động
        var existing = await repository.GetWordsAsync([id], ct);
        var known = existing.Select(w => Identity(w.WordText, w.PartOfSpeech, w.Meaning)).ToHashSet(); // check trùng nhanh
        var additions = new List<Word>();
        foreach (var item in request.Words)
        {
            if (!known.Add(Identity(item.Word, item.PartOfSpeech, item.Meaning))) continue;
            additions.Add(new Word { 
                TopicId = id, 
                WordText = item.Word.Trim(), 
                Meaning = item.Meaning.Trim(),
                Phonetic = item.Phonetic?.Trim() ?? "", 
                PartOfSpeech = item.PartOfSpeech.Trim(), 
                Example = item.Example?.Trim() ?? "" 
            });
        }
        if (additions.Count > 0) await repository.AddWordsAsync(additions, ct);
        return new(additions.Count, request.Words.Count - additions.Count);
    }

    public async Task<bool> UpdateWordAsync(int id, int wordId, int userId, SaveVocabularyWordRequest request, CancellationToken ct)
    {
        if (await repository.GetSetAsync(id, userId, true, ct) is null) return false;
        var words = await repository.GetWordsAsync([id], ct);
        var word = words.FirstOrDefault(w => w.Id == wordId);
        if (word is null) return false;
        var identity = Identity(request.Word, request.PartOfSpeech, request.Meaning);
        if (words.Any(w => w.Id != wordId && Identity(w.WordText, w.PartOfSpeech, w.Meaning) == identity))
            throw new ArgumentException("Từ và nghĩa này đã có trong bộ từ.");
        word.WordText = request.Word.Trim();
        word.Meaning = request.Meaning.Trim();
        word.PartOfSpeech = request.PartOfSpeech.Trim();
        word.Phonetic = request.Phonetic?.Trim() ?? "";
        word.Example = request.Example?.Trim() ?? "";
        await repository.UpdateWordAsync(word, ct);
        return true;
    }

    public async Task<int?> DeleteWordsAsync(int id, int userId, int[] wordIds, CancellationToken ct)
    {
        if (await repository.GetSetAsync(id, userId, true, ct) is null) return null;
        var words = (await repository.GetWordsAsync([id], ct)).Where(w => wordIds.Contains(w.Id)).ToList();
        if (words.Count > 0) await repository.DeleteWordsAsync(words, ct);
        return words.Count;
    }

    public async Task<string?> MoveWordAsync(int id, int wordId, int userId, int targetId, CancellationToken ct)
    {
        if (id == targetId) throw new ArgumentException("Vui lòng chọn một bộ từ khác.");
        if (await repository.GetSetAsync(id, userId, true, ct) is null) return null;
        var target = await repository.GetSetAsync(targetId, userId, true, ct);
        if (target is null) return null;
        var words = await repository.GetWordsAsync([id, targetId], ct);
        var word = words.FirstOrDefault(w => w.TopicId == id && w.Id == wordId);
        if (word is null) return null;
        var identity = Identity(word.WordText, word.PartOfSpeech, word.Meaning);
        if (words.Any(w => w.TopicId == targetId && Identity(w.WordText, w.PartOfSpeech, w.Meaning) == identity))
            throw new ArgumentException("Bộ từ đích đã có từ và nghĩa này.");
        word.TopicId = targetId;
        await repository.UpdateWordAsync(word, ct);
        return target.Name;
    }
}
