using EnglishLearning.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace EnglishLearning.DAL.Data.Seeders;

public static class TranslationExerciseSeeder
{
    private static readonly (string Title, string BandTarget, int DisplayOrder)[] Exercises =
    [
        ("Giáo dục", "Bước 2", 1),
        ("Giáo dục", "Bước 3", 1),
        ("Môi trường", "Bước 2", 2),
        ("Môi trường", "Bước 3", 2),
        ("Công nghệ", "Bước 2", 3),
        ("Công nghệ", "Bước 3", 3),
        ("Sức khoẻ", "Bước 2", 4),
        ("Sức khoẻ", "Bước 3", 4),
        ("Công việc", "Bước 2", 5),
        ("Công việc", "Bước 3", 5),
        ("Du lịch", "Bước 2", 6),
        ("Du lịch", "Bước 3", 6),
        ("Thực phẩm", "Bước 2", 7),
        ("Thực phẩm", "Bước 3", 7),
        ("Sở thích", "Bước 2", 8),
        ("Sở thích", "Bước 3", 8),
        ("Gia đình", "Bước 2", 9),
        ("Gia đình", "Bước 3", 9),
        ("Mạng xã hội", "Bước 2", 10),
        ("Mạng xã hội", "Bước 3", 10),
        ("Mua sắm", "Bước 2", 11),
        ("Mua sắm", "Bước 3", 11),
        ("Cuộc sống đô thị", "Bước 2", 12),
        ("Cuộc sống đô thị", "Bước 3", 12),
        ("Giao thông", "Bước 2", 13),
        ("Giao thông", "Bước 3", 13),
        ("Văn hoá", "Bước 2", 14),
        ("Văn hoá", "Bước 3", 14),
        ("Tội phạm", "Bước 2", 15),
        ("Tội phạm", "Bước 3", 15),
        ("Hiện tại tiếp diễn (Present Continuous)", "Bước 1", 101),
        ("Hiện tại hoàn thành (Present Perfect)", "Bước 1", 102),
        ("Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)", "Bước 1", 103),
        ("Danh từ không đếm được (Uncountable Nouns)", "Bước 1", 104),
        ("Số ít / Số nhiều (Singular / Plural)", "Bước 1", 105),
        ("Câu bị động (Passive Voice)", "Bước 1", 106),
        ("Câu so sánh (Comparison)", "Bước 1", 107),
        ("Đoạn Văn Band 8.0: Education", "Bước 4", 400),
        ("Đoạn Văn Band 8.0: Environment", "Bước 4", 401),
        ("Đoạn Văn Band 8.0: Technology", "Bước 4", 402),
        ("Đoạn Văn Band 8.0: Health", "Bước 4", 403),
        ("Đoạn Văn Band 8.0: Work", "Bước 4", 404),
        ("Đoạn Văn Band 8.0: Travel", "Bước 4", 405),
        ("Đoạn Văn Band 8.0: Food", "Bước 4", 406),
        ("Đoạn Văn Band 8.0: Hobbies", "Bước 4", 407),
        ("Đoạn Văn Band 8.0: Family", "Bước 4", 408),
        ("Đoạn Văn Band 8.0: Social Media", "Bước 4", 409)
    ];

    private static readonly (string Title, string Level, int DisplayOrder)[] Parents =
    [
        ("Cấu trúc câu cơ bản", "1", 1),
        ("Collocations & Vocab", "2", 2),
        ("Dịch đoạn văn Band 6.5", "3", 3),
        ("Dịch đoạn văn Band 8.0", "4", 4)
    ];

    // Band targets in the source data point to the existing parent category titles.
    private static readonly IReadOnlyDictionary<string, string> ParentTitleByBandTarget =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            ["Bước 1"] = "Cấu trúc câu cơ bản",
            ["Bước 2"] = "Collocations & Vocab",
            ["Bước 3"] = "Dịch đoạn văn Band 6.5",
            ["Bước 4"] = "Dịch đoạn văn Band 8.0"
        };

    public static async Task SeedAsync(AppDbContext context, CancellationToken cancellationToken = default)
    {
        var parents = await context.TranslationExercises
            .Where(exercise => exercise.ParentId == null)
            .ToListAsync(cancellationToken);
        var parentByTitle = new Dictionary<string, TranslationExercise>(StringComparer.OrdinalIgnoreCase);

        foreach (var seedParent in Parents)
        {
            var parent = parents.SingleOrDefault(exercise =>
                string.Equals(exercise.Title, seedParent.Title, StringComparison.OrdinalIgnoreCase));
            if (parent is null)
            {
                parent = new TranslationExercise { Title = seedParent.Title };
                context.TranslationExercises.Add(parent);
                parents.Add(parent);
            }

            parent.Level = seedParent.Level;
            parent.DisplayOrder = seedParent.DisplayOrder;
            parentByTitle[seedParent.Title] = parent;
        }

        await context.SaveChangesAsync(cancellationToken);

        var parentIds = parentByTitle.Values.Select(parent => parent.Id).ToHashSet();
        var children = (await context.TranslationExercises
                .Where(exercise => exercise.ParentId.HasValue)
                .ToListAsync(cancellationToken))
            .Where(exercise => parentIds.Contains(exercise.ParentId!.Value))
            .ToList();
        var claimedChildren = new HashSet<TranslationExercise>();

        foreach (var seedExercise in Exercises)
        {
            if (!ParentTitleByBandTarget.TryGetValue(seedExercise.BandTarget, out var parentTitle) ||
                !parentByTitle.TryGetValue(parentTitle, out var parent))
            {
                continue;
            }

            var child = children
                .Where(exercise => !claimedChildren.Contains(exercise) &&
                    string.Equals(exercise.Title, seedExercise.Title, StringComparison.Ordinal))
                .OrderBy(exercise => exercise.ParentId == parent.Id ? 0 : 1)
                .ThenBy(exercise => Math.Abs(exercise.DisplayOrder - seedExercise.DisplayOrder))
                .FirstOrDefault();

            if (child is null)
            {
                child = new TranslationExercise { Title = seedExercise.Title };
                context.TranslationExercises.Add(child);
                children.Add(child);
            }
            claimedChildren.Add(child);

            child.ParentId = parent.Id;
            child.DisplayOrder = seedExercise.DisplayOrder;
        }

        await context.SaveChangesAsync(cancellationToken);
        await SeedContentsAsync(context, parentByTitle, children, cancellationToken);
    }

    private static async Task SeedContentsAsync(
        AppDbContext context,
        IReadOnlyDictionary<string, TranslationExercise> parentByTitle,
        IReadOnlyCollection<TranslationExercise> exercises,
        CancellationToken cancellationToken)
    {
        var resourceName = $"{typeof(TranslationExerciseSeeder).Namespace}.TranslationExerciseContentSeed.json";
        await using var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName)
            ?? throw new InvalidOperationException($"Embedded translation seed resource '{resourceName}' was not found.");
        var sourceExercises = await JsonSerializer.DeserializeAsync<List<ContentExerciseSeed>>(stream, cancellationToken: cancellationToken)
            ?? [];

        // Load once and filter in memory. This also avoids the problematic array Contains
        // parameter evaluation in the configured EF Core/.NET runtime.
        var contents = await context.TranslationExerciseContents
            .Where(content => content.ParentId.HasValue)
            .ToListAsync(cancellationToken);

        foreach (var sourceExercise in sourceExercises)
        {
            if (!ParentTitleByBandTarget.TryGetValue(sourceExercise.BandTarget, out var parentTitle) ||
                !parentByTitle.TryGetValue(parentTitle, out var parent))
            {
                continue;
            }

            var exercise = exercises.SingleOrDefault(item =>
                item.ParentId == parent.Id &&
                item.DisplayOrder == sourceExercise.OrderIndex &&
                string.Equals(item.Title, sourceExercise.Title, StringComparison.Ordinal));
            if (exercise is null)
            {
                // Source exercise isn't represented in translation_exercises; omit its sentences.
                continue;
            }

            var order = 0;
            foreach (var sentence in sourceExercise.Sentences)
            {
                if (string.IsNullOrWhiteSpace(sentence.Vi) || string.IsNullOrWhiteSpace(sentence.Answer))
                {
                    continue;
                }

                order++;
                var content = contents.FirstOrDefault(item =>
                    item.ParentId == exercise.Id && item.DisplayOrder == order);
                if (content is null)
                {
                    content = new TranslationExerciseContent
                    {
                        ParentId = exercise.Id,
                        DisplayOrder = order
                    };
                    context.TranslationExerciseContents.Add(content);
                    contents.Add(content);
                }

                content.viText = sentence.Vi;
                content.Answer = sentence.Answer;
            }
        }

        await context.SaveChangesAsync(cancellationToken);
    }

    private sealed class ContentExerciseSeed
    {
        [JsonPropertyName("exercise_id")]
        public string ExerciseId { get; init; } = string.Empty;

        [JsonPropertyName("title")]
        public string Title { get; init; } = string.Empty;

        [JsonPropertyName("band_target")]
        public string BandTarget { get; init; } = string.Empty;

        [JsonPropertyName("order_index")]
        public int OrderIndex { get; init; }

        [JsonPropertyName("sentences")]
        public List<ContentSentenceSeed> Sentences { get; init; } = [];
    }

    private sealed class ContentSentenceSeed
    {
        [JsonPropertyName("vi")]
        public string Vi { get; init; } = string.Empty;

        [JsonPropertyName("answer")]
        public string Answer { get; init; } = string.Empty;
    }
}
