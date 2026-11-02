using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Services;

public sealed class AdminService : IAdminService
{
    private static readonly HashSet<string> AllowedStatuses =
        new(StringComparer.Ordinal) { "DRAFT", "PUBLISHED", "HIDDEN" };
    private static readonly HashSet<string> WritingCriterionCodes =
        new(StringComparer.Ordinal)
        {
            "TASK_RESPONSE",
            "COHERENCE_COHESION",
            "LEXICAL_RESOURCE",
            "GRAMMAR"
        };

    private readonly IAdminRepository _repository;

    public AdminService(IAdminRepository repository)
    {
        _repository = repository;
    }

    public Task<AdminDashboardDto> GetDashboardAsync(CancellationToken cancellationToken) =>
        _repository.GetDashboardAsync(cancellationToken);

    public Task<AdminPageDto<AdminWritingExerciseDto>> GetWritingExercisesAsync(
        AdminWritingExerciseQueryDto query,
        CancellationToken cancellationToken)
    {
        query.Page = Math.Max(1, query.Page);
        query.PageSize = Math.Clamp(query.PageSize, 1, 100);
        query.Status = NormalizeOptionalStatus(query.Status);
        if (query.TopicId is <= 0)
            throw new ArgumentException("ID chủ đề không hợp lệ.");
        return _repository.GetWritingExercisesAsync(query, cancellationToken);
    }

    public Task<AdminWritingExerciseDto?> GetWritingExerciseAsync(
        int id,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID đề Writing không hợp lệ.");
        return _repository.GetWritingExerciseAsync(id, cancellationToken);
    }

    public async Task<AdminWritingExerciseDto> CreateWritingExerciseAsync(
        AdminWritingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        var exercise = await ValidateAndMapAsync(request, cancellationToken);
        exercise.CreatedAt = DateTime.UtcNow;
        await _repository.AddWritingExerciseAsync(exercise, cancellationToken);
        return await _repository.GetWritingExerciseAsync(exercise.Id, cancellationToken)
            ?? throw new InvalidOperationException("Không thể tải đề Writing vừa tạo.");
    }

    public async Task<AdminWritingExerciseDto?> UpdateWritingExerciseAsync(
        int id,
        AdminWritingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID đề Writing không hợp lệ.");
        var exercise = await ValidateAndMapAsync(request, cancellationToken);
        if (!await _repository.UpdateWritingExerciseAsync(id, exercise, cancellationToken))
            return null;
        return await _repository.GetWritingExerciseAsync(id, cancellationToken)
            ?? throw new InvalidOperationException("Không thể tải đề Writing vừa cập nhật.");
    }

    public Task<bool> SetWritingExerciseStatusAsync(
        int id,
        string status,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID đề Writing không hợp lệ.");
        return _repository.SetWritingExerciseStatusAsync(
            id,
            NormalizeStatus(status),
            cancellationToken);
    }

    public async Task DeleteWritingExerciseAsync(
        int id,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID đề Writing không hợp lệ.");

        var result = await _repository.DeleteWritingExerciseAsync(id, cancellationToken);
        if (!result.Exists)
            throw new KeyNotFoundException("Không tìm thấy đề Writing.");
        if (result.HasSubmissions)
            throw new InvalidOperationException(
                "Không thể xóa đề đã có bài nộp. Hãy chuyển đề sang trạng thái Ẩn để giữ lịch sử học tập.");
    }

    public Task<AdminPageDto<AdminWritingSubmissionDto>> GetWritingSubmissionsAsync(
        AdminWritingSubmissionQueryDto query,
        CancellationToken cancellationToken)
    {
        query.Page = Math.Max(1, query.Page);
        query.PageSize = Math.Clamp(query.PageSize, 1, 100);
        if (!string.IsNullOrWhiteSpace(query.Status))
        {
            query.Status = query.Status.Trim().ToUpperInvariant();
            if (query.Status is not ("PENDING" or "COMPLETED"))
                throw new ArgumentException("Trạng thái bài nộp không hợp lệ.");
        }
        if (query.MinimumScore is < 0 or > 9 || query.MaximumScore is < 0 or > 9 ||
            query.MinimumScore > query.MaximumScore)
            throw new ArgumentException("Khoảng điểm lọc không hợp lệ.");
        if (query.ExerciseId is <= 0)
            throw new ArgumentException("ID đề Writing không hợp lệ.");
        if (query.UserId is <= 0)
            throw new ArgumentException("ID học viên không hợp lệ.");
        if (query.From.HasValue && query.To.HasValue && query.From > query.To)
            throw new ArgumentException("Khoảng thời gian lọc không hợp lệ.");
        return _repository.GetWritingSubmissionsAsync(query, cancellationToken);
    }

    public Task<AdminWritingSubmissionDetailDto?> GetWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (attemptId <= 0)
            throw new ArgumentException("ID bài nộp không hợp lệ.");
        return _repository.GetWritingSubmissionAsync(attemptId, cancellationToken);
    }

    public async Task<AdminWritingSubmissionDetailDto?> UpdateWritingSubmissionAsync(
        int attemptId,
        AdminWritingSubmissionUpdateDto request,
        CancellationToken cancellationToken)
    {
        if (attemptId <= 0)
            throw new ArgumentException("ID bài nộp không hợp lệ.");
        if (request.Criteria is null ||
            request.Criteria.Count != WritingCriterionCodes.Count ||
            request.Criteria.Any(criterion => criterion is null))
            throw new ArgumentException("Bài chấm phải có đủ bốn tiêu chí Writing.");

        var criteria = request.Criteria
            .Select(criterion => new AdminWritingCriterionUpdateDto
            {
                CriterionCode = criterion.CriterionCode?.Trim() ?? "",
                Score = criterion.Score,
                Feedback = criterion.Feedback?.Trim() ?? "",
                Strengths = criterion.Strengths?.Trim() ?? "",
                Weaknesses = criterion.Weaknesses?.Trim() ?? "",
                Suggestions = criterion.Suggestions?.Trim() ?? ""
            })
            .ToList();

        if (criteria.Any(criterion =>
                !WritingCriterionCodes.Contains(criterion.CriterionCode)) ||
            !criteria.Select(criterion => criterion.CriterionCode)
                .ToHashSet(StringComparer.Ordinal)
                .SetEquals(WritingCriterionCodes))
        {
            throw new ArgumentException("Mã tiêu chí không hợp lệ hoặc bị trùng.");
        }

        if (criteria.Any(criterion =>
                criterion.Score < 0 ||
                criterion.Score > 9 ||
                criterion.Score * 2 != decimal.Truncate(criterion.Score * 2)))
        {
            throw new ArgumentException("Điểm tiêu chí phải nằm trong khoảng 0 đến 9 và tăng theo bước 0,5.");
        }

        var averageScore = criteria.Average(criterion => criterion.Score);
        var overallScore = decimal.Round(
            averageScore * 2,
            0,
            MidpointRounding.AwayFromZero) / 2;

        if (!await _repository.UpdateWritingSubmissionAsync(
                attemptId,
                overallScore,
                criteria,
                cancellationToken))
        {
            return null;
        }

        return await _repository.GetWritingSubmissionAsync(attemptId, cancellationToken)
            ?? throw new InvalidOperationException("Không thể tải bài nộp vừa cập nhật.");
    }

    public Task<bool> DeleteWritingSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (attemptId <= 0)
            throw new ArgumentException("ID bài nộp không hợp lệ.");
        return _repository.DeleteWritingSubmissionAsync(attemptId, cancellationToken);
    }

    private async Task<WritingExercise> ValidateAndMapAsync(
        AdminWritingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        var title = request.Title?.Trim() ?? "";
        var questionText = request.QuestionText?.Trim() ?? "";
        if (title.Length == 0 || title.Length > 255)
            throw new ArgumentException("Tiêu đề phải có từ 1 đến 255 ký tự.");
        if (questionText.Length == 0)
            throw new ArgumentException("Nội dung đề bài không được để trống.");
        if (request.TopicId <= 0 ||
            !await _repository.TopicIsWritingAsync(request.TopicId, cancellationToken))
            throw new ArgumentException("Chủ đề không hợp lệ hoặc không thuộc Writing.");
        if (request.ImageUrl?.Trim().Length > 255)
            throw new ArgumentException("Đường dẫn hình ảnh tối đa 255 ký tự.");
        if (request.WritingType?.Trim().Length > 50)
            throw new ArgumentException("Loại bài Writing tối đa 50 ký tự.");

        return new WritingExercise
        {
            TopicId = request.TopicId,
            Title = title,
            ImageUrl = NormalizeOptional(request.ImageUrl),
            WritingType = NormalizeOptional(request.WritingType),
            QuestionText = questionText,
            Instruction = NormalizeOptional(request.Instruction),
            ReferenceAnswer = NormalizeOptional(request.ReferenceAnswer),
            Status = NormalizeStatus(request.Status)
        };
    }

    private static string NormalizeStatus(string? status)
    {
        var normalized = status?.Trim().ToUpperInvariant();
        if (normalized is null || !AllowedStatuses.Contains(normalized))
            throw new ArgumentException("Trạng thái đề Writing không hợp lệ.");
        return normalized;
    }

    private static string? NormalizeOptionalStatus(string? status) =>
        string.IsNullOrWhiteSpace(status) ? null : NormalizeStatus(status);

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
