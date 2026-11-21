using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Services;

public sealed class AdminTopicService : IAdminTopicService
{
    private static readonly string[] AllowedModuleTypes =
        ["WRITING", "SPEAKING", "VOCABULARY", "IDIOM"];

    private readonly IAdminTopicRepository _repository;

    public AdminTopicService(IAdminTopicRepository repository)
    {
        _repository = repository;
    }

    public Task<AdminTopicPageDto> GetTopicsAsync(
        AdminTopicQueryDto query,
        CancellationToken cancellationToken)
    {
        query.Page = Math.Max(1, query.Page);
        query.PageSize = Math.Clamp(query.PageSize, 1, 100);
        query.Search = NormalizeOptional(query.Search);
        query.ModuleType = NormalizeOptional(query.ModuleType)?.ToUpperInvariant();

        if (query.Search?.Length > 255)
            throw new ArgumentException("Từ khóa tìm kiếm tối đa 255 ký tự.");
        if (query.ModuleType?.Length > 255)
            throw new ArgumentException("Module không hợp lệ.");

        return _repository.GetTopicsAsync(query, cancellationToken);
    }

    public Task<AdminTopicDto?> GetTopicAsync(int id, CancellationToken cancellationToken)
    {
        EnsureValidId(id);
        return _repository.GetTopicAsync(id, cancellationToken);
    }

    public async Task<AdminTopicDto> CreateTopicAsync(
        SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken)
    {
        Normalize(request);
        EnsureModuleAllowed(request.ModuleType);

        var result = await _repository.CreateTopicAsync(
            new Topic
            {
                Name = request.Name,
                Description = request.Description,
                ImageURL = request.ImageURL,
                ModuleType = request.ModuleType,
                CreateBy = "ADMIN",
                CreateByUserId = null,
                IsActive = true
            },
            cancellationToken);

        if (result.Status == AdminTopicCreateStatus.DuplicateName)
            throw new InvalidOperationException("Đã có topic cùng tên trong module này.");

        return await _repository.GetTopicAsync(result.TopicId, cancellationToken)
            ?? throw new InvalidOperationException("Không thể tải topic vừa tạo.");
    }

    public async Task<AdminTopicDto?> UpdateTopicAsync(
        int id,
        SaveAdminTopicRequestDto request,
        CancellationToken cancellationToken)
    {
        EnsureValidId(id);
        Normalize(request);

        var existing = await _repository.GetTopicAsync(id, cancellationToken);
        if (existing is null)
            return null;

        // Topic cũ có module ngoài danh sách vẫn được sửa các trường khác nếu giữ nguyên module.
        if (!string.Equals(existing.ModuleType, request.ModuleType, StringComparison.Ordinal))
            EnsureModuleAllowed(request.ModuleType);

        var result = await _repository.UpdateTopicAsync(id, request, cancellationToken);
        return result.Status switch
        {
            AdminTopicUpdateStatus.NotFound => null,
            AdminTopicUpdateStatus.DuplicateName =>
                throw new InvalidOperationException("Đã có topic cùng tên trong module này."),
            AdminTopicUpdateStatus.ModuleInUse =>
                throw new InvalidOperationException(
                    $"Không thể đổi module vì topic đang được dùng bởi {DescribeUsage(result.Usage)}."),
            _ => await _repository.GetTopicAsync(id, cancellationToken)
        };
    }

    public Task<bool> SetStatusAsync(
        int id,
        bool isActive,
        CancellationToken cancellationToken)
    {
        EnsureValidId(id);
        return _repository.SetStatusAsync(id, isActive, cancellationToken);
    }

    public async Task<bool> DeleteTopicAsync(int id, CancellationToken cancellationToken)
    {
        EnsureValidId(id);

        var result = await _repository.DeleteTopicAsync(id, cancellationToken);
        return result.Status switch
        {
            AdminTopicDeleteStatus.NotFound => false,
            AdminTopicDeleteStatus.InUse =>
                throw new InvalidOperationException(
                    $"Không thể xóa topic đang được dùng bởi {DescribeUsage(result.Usage)}. Hãy ẩn topic thay vì xóa."),
            _ => true
        };
    }

    private static void Normalize(SaveAdminTopicRequestDto request)
    {
        request.Name = NormalizeOptional(request.Name)
            ?? throw new ArgumentException("Tên topic không được để trống.");
        request.Description = NormalizeOptional(request.Description);
        request.ImageURL = NormalizeOptional(request.ImageURL);
        request.ModuleType = NormalizeOptional(request.ModuleType)?.ToUpperInvariant()
            ?? throw new ArgumentException("Module không được để trống.");

        if (request.Name.Length > 255)
            throw new ArgumentException("Tên topic tối đa 255 ký tự.");
        if (request.ModuleType.Length > 255)
            throw new ArgumentException("Module không hợp lệ.");
        if (request.ImageURL is not null && !IsValidImageUrl(request.ImageURL))
        {
            throw new ArgumentException(
                "Ảnh phải là đường dẫn bắt đầu bằng \"/\" hoặc URL https, tối đa 255 ký tự.");
        }
    }

    private static void EnsureModuleAllowed(string moduleType)
    {
        if (!AllowedModuleTypes.Contains(moduleType))
        {
            throw new ArgumentException(
                $"Module phải thuộc: {string.Join(", ", AllowedModuleTypes)}.");
        }
    }

    private static bool IsValidImageUrl(string imageUrl)
    {
        if (imageUrl.Length > 255 || imageUrl.Contains('\\') || imageUrl.Contains(".."))
            return false;
        if (imageUrl.StartsWith('/'))
            return !imageUrl.StartsWith("//");
        return Uri.TryCreate(imageUrl, UriKind.Absolute, out var uri) &&
            uri.Scheme == Uri.UriSchemeHttps;
    }

    private static void EnsureValidId(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID topic không hợp lệ.");
    }

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static string DescribeUsage(AdminTopicUsageDto? usage)
    {
        if (usage is null)
            return "nội dung khác";

        var parts = new List<string>();
        void Add(int count, string label)
        {
            if (count > 0) parts.Add($"{count} {label}");
        }

        Add(usage.Writing, "đề Writing");
        Add(usage.Speaking, "đề Speaking");
        Add(usage.Vocabulary, "từ vựng");
        Add(usage.Idioms, "thành ngữ");
        Add(usage.Reading, "đề Reading");
        Add(usage.Listening, "đề Listening");
        Add(usage.Translation, "đề Translation");
        return string.Join(", ", parts);
    }
}
