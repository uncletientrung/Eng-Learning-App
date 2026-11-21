using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Interfaces;

public interface IAdminTopicService
{
    Task<AdminTopicPageDto> GetTopicsAsync(
        AdminTopicQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminTopicDto?> GetTopicAsync(int id, CancellationToken cancellationToken);
    Task<AdminTopicDto> CreateTopicAsync(
        SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken);
    Task<AdminTopicDto?> UpdateTopicAsync(
        int id,
        SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken);
    Task<bool> SetStatusAsync(int id, bool isActive, CancellationToken cancellationToken);
    Task<bool> DeleteTopicAsync(int id, CancellationToken cancellationToken);
}
