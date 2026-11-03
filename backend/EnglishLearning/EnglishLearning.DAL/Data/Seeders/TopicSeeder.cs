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
        (31, "Nghệ thuật & Giải trí", "VOCABULARY")
    ];

    public static async Task<IReadOnlyDictionary<int, int>> SeedAsync(
        AppDbContext context,
        CancellationToken cancellationToken = default)
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

        foreach (var seed in Topics)
        {
            var key = (Normalize(seed.ModuleType), Normalize(seed.Name));
            if (!known.TryGetValue(key, out var topic))
            {
                topic = new Topic
                {
                    Name = seed.Name,
                    Description = null,
                    ModuleType = seed.ModuleType,
                    CreateBy = "ADMIN",
                    CreateByUserId = null
                };
                additions.Add(topic);
                known.Add(key, topic);
            }

            seededTopics.Add(seed.SourceId, topic);
        }

        if (additions.Count > 0)
        {
            context.Topics.AddRange(additions);
            await context.SaveChangesAsync(cancellationToken);
        }

        return seededTopics.ToDictionary(pair => pair.Key, pair => pair.Value.Id);
    }

    private static string Normalize(string value) => value.Trim().ToUpperInvariant();
}
