using System.ComponentModel.DataAnnotations;

namespace EnglishLearning.DAL.ReadModels;

public sealed class AdminVocabularyQuery
{
    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;
    [Range(1, 100)]
    public int PageSize { get; set; } = 10;
    [StringLength(255)]
    public string? Search { get; set; }
    [StringLength(255)]
    public string? PartOfSpeech { get; set; }
}

public sealed record AdminVocabularySetDto(int Id, string Name, string? Description, int WordCount);
public sealed record AdminVocabularyWordDto(
    int Id, int TopicId, string Word, string Meaning, string Phonetic, string PartOfSpeech, string Example);
public sealed record AdminVocabularyWordsDto(
    AdminPageDto<AdminVocabularyWordDto> Words, List<string> PartOfSpeechOptions);

public sealed class AdminVocabularySetRequest
{
    [Required, StringLength(255)]
    public string Name { get; set; } = "";
    [StringLength(10000)]
    public string? Description { get; set; }
}

public sealed class AdminVocabularyWordRequest
{
    [Required, StringLength(255)]
    public string Word { get; set; } = "";
    [Required, StringLength(10000)]
    public string Meaning { get; set; } = "";
    [StringLength(255)]
    public string? Phonetic { get; set; }
    [Required, StringLength(255)]
    public string PartOfSpeech { get; set; } = "";
    [StringLength(10000)]
    public string? Example { get; set; }
}
