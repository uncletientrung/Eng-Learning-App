using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

// Admin chỉ quản lý topic hệ thống (CreateByUserId == null); topic cá nhân của học viên không thuộc phạm vi này.
public sealed class AdminTopicRepository : IAdminTopicRepository
{
    private readonly AppDbContext _context;

    public AdminTopicRepository(AppDbContext context)
    {
        _context = context;
    }

    private IQueryable<Topic> SystemTopics =>
        _context.Topics.Where(topic => topic.CreateByUserId == null);

    public async Task<AdminTopicPageDto> GetTopicsAsync(
        AdminTopicQueryDto query,
        CancellationToken cancellationToken)
    {
        var topics = SystemTopics.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            topics = topics.Where(topic =>
                topic.Name.Contains(search) ||
                (topic.Description != null && topic.Description.Contains(search)));
        }

        if (!string.IsNullOrWhiteSpace(query.ModuleType))
            topics = topics.Where(topic => topic.ModuleType == query.ModuleType);

        if (query.IsActive.HasValue)
            topics = topics.Where(topic => topic.IsActive == query.IsActive.Value);

        var totalCount = await topics.CountAsync(cancellationToken);
        var moduleTypes = await SystemTopics
            .AsNoTracking()
            .Select(topic => topic.ModuleType)
            .Distinct()
            .OrderBy(module => module)
            .ToListAsync(cancellationToken);
        var items = await topics
            .OrderBy(topic => topic.ModuleType)
            .ThenBy(topic => topic.Id)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(TopicProjection())
            .ToListAsync(cancellationToken);

        return new AdminTopicPageDto
        {
            Items = items,
            ModuleTypes = moduleTypes,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        };
    }

    public Task<AdminTopicDto?> GetTopicAsync(
        int id,
        CancellationToken cancellationToken) =>
        SystemTopics
            .AsNoTracking()
            .Where(topic => topic.Id == id)
            .Select(TopicProjection())
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<AdminTopicCreateResult> CreateTopicAsync(
        Topic topic,
        CancellationToken cancellationToken)
    {
        if (await NameExistsAsync(topic.ModuleType, topic.Name, null, cancellationToken))
            return new AdminTopicCreateResult(AdminTopicCreateStatus.DuplicateName, 0);

        await _context.Topics.AddAsync(topic, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new AdminTopicCreateResult(AdminTopicCreateStatus.Created, topic.Id);
    }

    public async Task<AdminTopicUpdateResult> UpdateTopicAsync(
        int id,
        SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken)
    {
        var topic = await SystemTopics.SingleOrDefaultAsync(
            candidate => candidate.Id == id,
            cancellationToken);
        if (topic is null)
            return new AdminTopicUpdateResult(AdminTopicUpdateStatus.NotFound);

        if (await NameExistsAsync(request.ModuleType, request.Name, id, cancellationToken))
            return new AdminTopicUpdateResult(AdminTopicUpdateStatus.DuplicateName);

        if (!string.Equals(topic.ModuleType, request.ModuleType, StringComparison.Ordinal))
        {
            var usage = await GetUsageAsync(id, cancellationToken);
            if (usage.Total > 0)
                return new AdminTopicUpdateResult(AdminTopicUpdateStatus.ModuleInUse, usage);
        }

        topic.Name = request.Name;
        topic.Description = request.Description;
        topic.ImageURL = request.ImageURL;
        topic.ModuleType = request.ModuleType;
        await _context.SaveChangesAsync(cancellationToken);
        return new AdminTopicUpdateResult(AdminTopicUpdateStatus.Updated);
    }

    public async Task<bool> SetStatusAsync(
        int id,
        bool isActive,
        CancellationToken cancellationToken) =>
        await SystemTopics
            .Where(topic => topic.Id == id)
            .ExecuteUpdateAsync(
                setters => setters.SetProperty(topic => topic.IsActive, isActive),
                cancellationToken) > 0;

    public async Task<AdminTopicDeleteResult> DeleteTopicAsync(
        int id,
        CancellationToken cancellationToken)
    {
        var topic = await SystemTopics.SingleOrDefaultAsync(
            candidate => candidate.Id == id,
            cancellationToken);
        if (topic is null)
            return new AdminTopicDeleteResult(AdminTopicDeleteStatus.NotFound);

        var usage = await GetUsageAsync(id, cancellationToken);
        if (usage.Total > 0)
            return new AdminTopicDeleteResult(AdminTopicDeleteStatus.InUse, usage);

        _context.Topics.Remove(topic);
        await _context.SaveChangesAsync(cancellationToken);
        return new AdminTopicDeleteResult(AdminTopicDeleteStatus.Deleted);
    }

    private Task<bool> NameExistsAsync(
        string moduleType,
        string name,
        int? excludeId,
        CancellationToken cancellationToken) =>
        SystemTopics.AnyAsync(
            topic => topic.ModuleType == moduleType &&
                topic.Name == name &&
                (excludeId == null || topic.Id != excludeId),
            cancellationToken);

    private async Task<AdminTopicUsageDto> GetUsageAsync(
        int topicId,
        CancellationToken cancellationToken) =>
        new()
        {
            Writing = await _context.WritingExercises.CountAsync(e => e.TopicId == topicId, cancellationToken),
            Speaking = await _context.SpeakingExercises.CountAsync(e => e.TopicId == topicId, cancellationToken),
            Vocabulary = await _context.Words.CountAsync(w => w.TopicId == topicId, cancellationToken),
            Idioms = await _context.Idioms.CountAsync(i => i.TopicId == topicId, cancellationToken),
            Reading = await _context.ReadingExercises.CountAsync(e => e.TopicId == topicId, cancellationToken),
            Listening = await _context.ListeningExercises.CountAsync(e => e.TopicId == topicId, cancellationToken),
            Translation = await _context.TranslationExercises.CountAsync(e => e.TopicId == topicId, cancellationToken)
        };

    private System.Linq.Expressions.Expression<Func<Topic, AdminTopicDto>> TopicProjection() =>
        topic => new AdminTopicDto
        {
            Id = topic.Id,
            Name = topic.Name,
            Description = topic.Description,
            ImageURL = topic.ImageURL,
            ModuleType = topic.ModuleType,
            CreateBy = topic.CreateBy,
            IsActive = topic.IsActive,
            Usage = new AdminTopicUsageDto
            {
                Writing = _context.WritingExercises.Count(e => e.TopicId == topic.Id),
                Speaking = _context.SpeakingExercises.Count(e => e.TopicId == topic.Id),
                Vocabulary = _context.Words.Count(w => w.TopicId == topic.Id),
                Idioms = _context.Idioms.Count(i => i.TopicId == topic.Id),
                Reading = _context.ReadingExercises.Count(e => e.TopicId == topic.Id),
                Listening = _context.ListeningExercises.Count(e => e.TopicId == topic.Id),
                Translation = _context.TranslationExercises.Count(e => e.TopicId == topic.Id)
            }
        };
}
