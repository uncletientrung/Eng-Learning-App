using System.ComponentModel.DataAnnotations; // [...]

namespace EnglishLearning.BLL.DTOs.Vocabulary;

// 1 từ
public sealed record VocabularyWordDto( // record -> ko phải viết { get; init; }
    int Id, int TopicId, string Word, string Meaning,
    string Phonetic, string PartOfSpeech, string Example);

// 1 bộ từ
public sealed record VocabularySetDto(
    int Id, string Name, string? Description, int? CreateByUserId,
    int WordCount, List<VocabularyWordDto>? Words = null); // Số từ của bộ từ đấy, List từ

public sealed class SaveVocabularySetRequest
{
    [Required, StringLength(80)]
    public string Name { get; set; } = string.Empty;
}

public sealed class SaveVocabularyWordRequest
{
    [Required, StringLength(255)]
    public string Word { get; set; } = string.Empty;
    [Required, StringLength(10000)]
    public string Meaning { get; set; } = string.Empty;
    [StringLength(255)]
    public string Phonetic { get; set; } = string.Empty;
    [Required, StringLength(255)]
    public string PartOfSpeech { get; set; } = string.Empty;
    [StringLength(10000)]
    public string Example { get; set; } = string.Empty;
}

public sealed class AddVocabularyWordsRequest
{
    [Required, MinLength(1), MaxLength(100)]
    public List<SaveVocabularyWordRequest> Words { get; set; } = [];
}

public sealed class DeleteVocabularyWordsRequest
{
    [Required, MinLength(1), MaxLength(1000)]
    public int[] WordIds { get; set; } = [];
}

public sealed class MoveVocabularyWordRequest
{
    [Range(1, int.MaxValue)]
    public int TargetSetId { get; set; }
}

public sealed record AddVocabularyWordsResult(int AddedCount, int DuplicateCount);

public sealed class ReviewVocabularyWordRequest
{
    [Range(1, 3)]
    public byte Status { get; set; }
}

public sealed record VocabularyProgressDto(
    VocabularyWordDto Word, string SetName, int WordCount,
    byte Status, byte Level, DateOnly LastReviewedAt, DateOnly NextReviewAt,
    int RememberedDelayDays);

public sealed record VocabularyStreakDto(
    int CurrentStreak, DateOnly? LastStudyDate, DateOnly? StreakStartDate,
    DateOnly Today, bool StudiedToday);
