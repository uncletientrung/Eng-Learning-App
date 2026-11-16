using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Interfaces;

public interface IAdminVocabularyService
{
    Task<AdminPageDto<AdminVocabularySetDto>> GetSetsAsync(AdminVocabularyQuery query, CancellationToken ct);
    Task<AdminVocabularySetDto> GetSetAsync(int id, CancellationToken ct);
    Task<AdminVocabularyWordsDto> GetWordsAsync(int id, AdminVocabularyQuery query, CancellationToken ct);
    Task<AdminVocabularyWordDto> GetWordAsync(int id, int wordId, CancellationToken ct);
    Task<AdminVocabularySetDto> SaveSetAsync(int? id, AdminVocabularySetRequest request, CancellationToken ct);
    Task<AdminVocabularyWordDto> SaveWordAsync(int id, int? wordId, AdminVocabularyWordRequest request, CancellationToken ct);
    Task DeleteSetAsync(int id, CancellationToken ct);
    Task DeleteWordAsync(int id, int wordId, CancellationToken ct);
}
