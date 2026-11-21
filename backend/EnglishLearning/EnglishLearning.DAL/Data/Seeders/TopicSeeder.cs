using EnglishLearning.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Data.Seeders;

public static class TopicSeeder
{
    // SourceId dùng để đối chiếu với topic_id trong dữ liệu SQL, không gán làm khóa chính.
    private static readonly (int SourceId, string Name, string ModuleType)[] Topics =
    [
        (2, "Pie Chart", "WRITING"),
        (3, "Bar chart", "WRITING"),
        (4, "Line Graph", "WRITING"),
        (5, "Map", "WRITING"),
        (6, "Mixed Graph", "WRITING"),
        (7, "Process", "WRITING"),
        (8, "Table", "WRITING"),
        (9, "Discuss Both Views", "WRITING"),
        (10, "Opinion Essay", "WRITING"),
        (11, "Advantages & Disadvantages", "WRITING"),
        (12, "Problem & Solution", "WRITING"),
        (13, "Two-part Question", "WRITING"),
        (14, "Bản thân & Gia đình", "SPEAKING"),
        (15, "Học tập & Nghề nghiệp", "SPEAKING"),
        (16, "Giải trí & Sở thích", "SPEAKING"),
        (17, "Công nghệ & Xã hội", "SPEAKING"),
        (18, "Lối sống & Sức khỏe", "SPEAKING"),
        (19, "Môi trường & Du lịch", "SPEAKING"),
        (20, "Ý tưởng & Cuộc sống", "SPEAKING"),
        (21, "Khoa học & Công nghệ", "VOCABULARY"),
        (22, "Môi trường & Sinh thái", "VOCABULARY"),
        (23, "Xã hội & Văn hóa", "VOCABULARY"),
        (24, "Lịch sử & Khảo cổ học", "VOCABULARY"),
        (25, "Kinh tế & Kinh doanh", "VOCABULARY"),
        (26, "Sức khỏe & Y tế", "VOCABULARY"),
        (27, "Giáo dục & Tâm lý học", "VOCABULARY"),
        (28, "Đô thị & Kiến trúc", "VOCABULARY"),
        (29, "Truyền thông & Báo chí", "VOCABULARY"),
        (30, "Vấn đề Toàn cầu", "VOCABULARY"),
        (31, "Nghệ thuật & Giải trí", "VOCABULARY"),
        (32, "Emotions & Feelings", "IDIOM"),
        (33, "Money & Business", "IDIOM"),
        (34, "Time", "IDIOM"),
        (35, "Communication", "IDIOM"),
        (36, "Success & Achievement", "IDIOM"),
        (37, "Failure & Difficulty", "IDIOM"),
        (38, "People & Relationships", "IDIOM"),
        (39, "Work & Effort", "IDIOM"),
        (40, "Food-related Idioms", "IDIOM"),
        (41, "Animal Idioms", "IDIOM"),
        (42, "Body Idioms", "IDIOM"),
        (43, "Weather Idioms", "IDIOM"),
        (44, "Decision Making & Opinion", "IDIOM"),
        (45, "Quantity & Degree", "IDIOM"),
        (46, "Knowledge & Understanding", "IDIOM"),
        (47, "Trouble & Risk", "IDIOM"),
        (48, "General & Everyday Idioms", "IDIOM")
    ];

    private static readonly IReadOnlyDictionary<int, string> TopicImageUrls = new Dictionary<int, string>
    {
        [21] = "/assets/topics/tech.webp",
        [22] = "/assets/topics/forest.webp",
        [23] = "/assets/topics/people.webp",
        [24] = "/assets/topics/ruins.webp",
        [25] = "/assets/topics/business.webp",
        [26] = "/assets/topics/doctor.webp",
        [27] = "/assets/topics/students.webp",
        [28] = "/assets/topics/city.webp",
        [29] = "/assets/topics/news.webp",
        [30] = "/assets/topics/earth.webp",
        [31] = "/assets/topics/concert.webp",
        [32] = "/assets/topics/happy.webp",
        [33] = "/assets/topics/money.webp",
        [34] = "/assets/topics/clock.webp",
        [35] = "/assets/topics/talk.webp",
        [36] = "/assets/topics/concert.webp",
        [37] = "/assets/topics/storm.webp",
        [38] = "/assets/topics/people.webp",
        [39] = "/assets/topics/construct.webp",
        [40] = "/assets/topics/food.webp",
        [41] = "/assets/topics/fox.webp",
        [42] = "/assets/topics/hands.webp",
        [43] = "/assets/topics/clouds.webp",
        [44] = "/assets/topics/road.webp",
        [45] = "/assets/topics/coins.webp",
        [46] = "/assets/topics/brain.webp",
        [47] = "/assets/topics/storm.webp",
        [48] = "/assets/topics/people.webp"
    };

    public static async Task<IReadOnlyDictionary<int, int>> SeedAsync(
        AppDbContext context,
        CancellationToken cancellationToken = default,
        bool includeVocabulary = true)
    {
        var existingTopics = await context.Topics
            .Where(topic => topic.CreateByUserId == null)
            .OrderBy(topic => topic.Id)
            .ToListAsync(cancellationToken);
        var known = existingTopics
            .GroupBy(topic => (Normalize(topic.ModuleType), Normalize(topic.Name)))
            .ToDictionary(group => group.Key, group => group.First());
        var seededTopics = new Dictionary<int, Topic>();
        var additions = new List<Topic>();
        var imageUpdates = 0;

        foreach (var seed in Topics)
        {
            if (seed.ModuleType == "VOCABULARY" && !includeVocabulary) continue;
            var key = (Normalize(seed.ModuleType), Normalize(seed.Name));
            if (!known.TryGetValue(key, out var topic))
            {
                topic = new Topic
                {
                    Name = seed.Name,
                    Description = null,
                    ImageURL = TopicImageUrls.GetValueOrDefault(seed.SourceId),
                    ModuleType = seed.ModuleType,
                    CreateBy = "ADMIN",
                    CreateByUserId = null
                };
                additions.Add(topic);
                known.Add(key, topic);
            }

            if (string.IsNullOrWhiteSpace(topic.ImageURL) && TopicImageUrls.TryGetValue(seed.SourceId, out var imageUrl))
            {
                topic.ImageURL = imageUrl;
                imageUpdates++;
            }

            seededTopics.Add(seed.SourceId, topic);
        }

        if (additions.Count > 0 || imageUpdates > 0)
        {
            context.Topics.AddRange(additions);
            await context.SaveChangesAsync(cancellationToken);
        }

        return seededTopics.ToDictionary(pair => pair.Key, pair => pair.Value.Id);
    }

    private static string Normalize(string value) => value.Trim().ToUpperInvariant();
}
