using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.DAL.Interfaces;

public interface IAdminVocabularyRepository
{
    Task<AdminPageDto<AdminVocabularySetDto>> GetSetsAsync(AdminVocabularyQuery query, CancellationToken ct);
    Task<AdminVocabularySetDto?> GetSetAsync(int id, CancellationToken ct);
    Task<AdminVocabularyWordsDto?> GetWordsAsync(int id, AdminVocabularyQuery query, CancellationToken ct);
    Task<AdminVocabularyWordDto?> GetWordAsync(int id, int wordId, CancellationToken ct);
    Task<AdminVocabularySetDto> SaveSetAsync(int? id, Topic values, CancellationToken ct);
    Task<AdminVocabularyWordDto> SaveWordAsync(int id, int? wordId, Word values, CancellationToken ct);
    Task DeleteSetAsync(int id, CancellationToken ct);
    Task DeleteWordAsync(int id, int wordId, CancellationToken ct);
}
