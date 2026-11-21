using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.DAL.Interfaces;

public interface IAdminTopicRepository
{
    Task<AdminTopicPageDto> GetTopicsAsync(
        AdminTopicQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminTopicDto?> GetTopicAsync(int id, CancellationToken cancellationToken);
    Task<AdminTopicCreateResult> CreateTopicAsync(
        Topic topic,
        CancellationToken cancellationToken);
    Task<AdminTopicUpdateResult> UpdateTopicAsync(
        int id,
        SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken);
    Task<bool> SetStatusAsync(int id, bool isActive, CancellationToken cancellationToken);
    Task<AdminTopicDeleteResult> DeleteTopicAsync(
        int id,
        CancellationToken cancellationToken);
}

public enum AdminTopicCreateStatus
{
    Created,
    DuplicateName
}

public sealed record AdminTopicCreateResult(AdminTopicCreateStatus Status, int TopicId);

public enum AdminTopicUpdateStatus
{
    Updated,
    NotFound,
    DuplicateName,
    ModuleInUse
}

public sealed record AdminTopicUpdateResult(
    AdminTopicUpdateStatus Status,
    AdminTopicUsageDto? Usage = null);

public enum AdminTopicDeleteStatus
{
    Deleted,
    NotFound,
    InUse
}

public sealed record AdminTopicDeleteResult(
    AdminTopicDeleteStatus Status,
    AdminTopicUsageDto? Usage = null);
