using EnglishLearning.BLL.DTOs.Vocabulary;

namespace EnglishLearning.BLL.Interfaces;

public interface IVocabularyService
{
    Task<VocabularyStreakDto?> GetStreakAsync(int userId, CancellationToken ct);
    Task<List<VocabularySetDto>> GetSetsAsync(int userId, bool personal, CancellationToken ct);
    Task<VocabularySetDto?> GetSetAsync(int id, int userId, CancellationToken ct);
    Task<List<VocabularyProgressDto>> GetProgressAsync(int userId, CancellationToken ct);
    Task<VocabularyProgressDto?> ReviewWordAsync(int id, int wordId, int userId, ReviewVocabularyWordRequest request, CancellationToken ct);
    Task<VocabularySetDto> CreateSetAsync(int userId, SaveVocabularySetRequest request, CancellationToken ct);
    Task<bool> RenameSetAsync(int id, int userId, SaveVocabularySetRequest request, CancellationToken ct);
    Task<bool> DeleteSetAsync(int id, int userId, CancellationToken ct);
    Task<AddVocabularyWordsResult?> AddWordsAsync(int id, int userId, AddVocabularyWordsRequest request, CancellationToken ct);
    Task<bool> UpdateWordAsync(int id, int wordId, int userId, SaveVocabularyWordRequest request, CancellationToken ct);
    Task<int?> DeleteWordsAsync(int id, int userId, int[] wordIds, CancellationToken ct);
    Task<string?> MoveWordAsync(int id, int wordId, int userId, int targetId, CancellationToken ct);
}
