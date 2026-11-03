using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IVocabularyRepository
{
    Task<User?> GetUserAsync(int userId, CancellationToken ct);
    // Task<List<Topic>> -> bất đồng bộ -> List<Topic>
    Task<List<Topic>> GetSetsAsync(int userId, bool personal, CancellationToken ct); // n topic
    Task<Topic?> GetSetAsync(int id, int userId, bool ownedOnly, CancellationToken ct); // 1 topic
    Task<Dictionary<int, int>> GetWordCountsAsync(int[] topicIds, CancellationToken ct);
    Task<List<Word>> GetWordsAsync(int[] topicIds, CancellationToken ct);
    Task<List<UserWordProgress>> GetProgressAsync(int userId, CancellationToken ct);
    Task<UserWordProgress?> ReviewWordAsync(int setId, int wordId, int userId, Action<UserWordProgress> review, CancellationToken ct);
    Task AddSetAsync(Topic topic, CancellationToken ct);
    Task UpdateSetAsync(Topic topic, CancellationToken ct);
    Task DeleteSetAsync(Topic topic, CancellationToken ct);
    Task AddWordsAsync(List<Word> words, CancellationToken ct);
    Task UpdateWordAsync(Word word, CancellationToken ct);
    Task DeleteWordsAsync(List<Word> words, CancellationToken ct);
}
