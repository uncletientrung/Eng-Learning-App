using System.ComponentModel.DataAnnotations;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Services;

public sealed class AdminVocabularyService(IAdminVocabularyRepository repository) : IAdminVocabularyService
{
    public Task<AdminPageDto<AdminVocabularySetDto>> GetSetsAsync(AdminVocabularyQuery query, CancellationToken ct)
    {
        Validate(query);
        query.Search = query.Search?.Trim();
        return repository.GetSetsAsync(query, ct);
    }

    public async Task<AdminVocabularySetDto> GetSetAsync(int id, CancellationToken ct) =>
        await repository.GetSetAsync(id, ct) ?? throw new KeyNotFoundException("Không tìm thấy bộ từ hệ thống.");

    public async Task<AdminVocabularyWordsDto> GetWordsAsync(int id, AdminVocabularyQuery query, CancellationToken ct)
    {
        Validate(query);
        query.Search = query.Search?.Trim();
        query.PartOfSpeech = query.PartOfSpeech?.Trim();
        return await repository.GetWordsAsync(id, query, ct) ?? throw new KeyNotFoundException("Không tìm thấy bộ từ hệ thống.");
    }

    public async Task<AdminVocabularyWordDto> GetWordAsync(int id, int wordId, CancellationToken ct) =>
        await repository.GetWordAsync(id, wordId, ct) ?? throw new KeyNotFoundException("Không tìm thấy từ vựng.");

    public Task<AdminVocabularySetDto> SaveSetAsync(int? id, AdminVocabularySetRequest request, CancellationToken ct)
    {
        Validate(request);
        return repository.SaveSetAsync(id, new Topic
        {
            Name = Normalize(request.Name), Description = request.Description?.Trim(),
            ModuleType = "VOCABULARY", CreateBy = "ADMIN", CreateByUserId = null
        }, ct);
    }

    public Task<AdminVocabularyWordDto> SaveWordAsync(int id, int? wordId, AdminVocabularyWordRequest request, CancellationToken ct)
    {
        Validate(request);
        return repository.SaveWordAsync(id, wordId, new Word
        {
            WordText = Normalize(request.Word), Meaning = request.Meaning.Trim(),
            Phonetic = request.Phonetic?.Trim() ?? "", PartOfSpeech = Normalize(request.PartOfSpeech).ToLowerInvariant(),
            Example = request.Example?.Trim() ?? ""
        }, ct);
    }

    public Task DeleteSetAsync(int id, CancellationToken ct) => repository.DeleteSetAsync(id, ct);
    public Task DeleteWordAsync(int id, int wordId, CancellationToken ct) => repository.DeleteWordAsync(id, wordId, ct);

    private static string Normalize(string value) => string.Join(' ', value.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries));
    private static void Validate(object value)
    {
        var errors = new List<ValidationResult>();
        if (!Validator.TryValidateObject(value, new ValidationContext(value), errors, true))
            throw new ArgumentException(string.Join(" ", errors.Select(e => e.ErrorMessage)));
    }
}
