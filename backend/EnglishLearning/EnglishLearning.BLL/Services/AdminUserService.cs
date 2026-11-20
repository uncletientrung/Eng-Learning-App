using System.ComponentModel.DataAnnotations;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Services;

public sealed class AdminUserService : IAdminUserService
{
    private readonly IAdminUserRepository _repository;
    private readonly IAdminUserPasswordHasher _passwordHasher;

    public AdminUserService(
        IAdminUserRepository repository,
        IAdminUserPasswordHasher passwordHasher)
    {
        _repository = repository;
        _passwordHasher = passwordHasher;
    }

    public Task<AdminUserPageDto> GetUsersAsync(
        AdminUserQueryDto query,
        CancellationToken cancellationToken)
    {
        query.Page = Math.Max(1, query.Page);
        query.PageSize = Math.Clamp(query.PageSize, 1, 100);
        query.Search = NormalizeOptional(query.Search);
        query.Role = NormalizeOptional(query.Role);
        query.Status = string.IsNullOrWhiteSpace(query.Status)
            ? null
            : query.Status.Trim().ToUpperInvariant();

        if (query.Search?.Length > 255)
            throw new ArgumentException("Từ khóa tìm kiếm tối đa 255 ký tự.");
        if (query.Role?.Length > 255)
            throw new ArgumentException("Vai trò không hợp lệ.");
        if (query.Status is not (null or "ACTIVE" or "INACTIVE"))
            throw new ArgumentException("Trạng thái tài khoản không hợp lệ.");

        return _repository.GetUsersAsync(query, cancellationToken);
    }

    public Task<AdminUserDto?> GetUserAsync(
        int id,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID người dùng không hợp lệ.");
        return _repository.GetUserAsync(id, cancellationToken);
    }

    public async Task<AdminUserDto> CreateUserAsync(
        CreateAdminUserRequestDto request,
        CancellationToken cancellationToken)
    {
        request.Name = NormalizeRequired(request.Name, "Tên");
        request.Username = NormalizeRequired(request.Username, "Username");
        request.Email = NormalizeRequired(request.Email, "Email");
        request.Phone = NormalizeRequired(request.Phone, "Số điện thoại");

        if (request.Name.Length > 255 ||
            request.Username.Length > 255 ||
            request.Email.Length > 255 ||
            request.Phone.Length > 255)
        {
            throw new ArgumentException("Thông tin tài khoản tối đa 255 ký tự.");
        }

        if (!new EmailAddressAttribute().IsValid(request.Email))
            throw new ArgumentException("Email không đúng định dạng.");
        if (string.IsNullOrWhiteSpace(request.Password) ||
            request.Password.Length < 8 ||
            request.Password.Length > 255)
        {
            throw new ArgumentException("Mật khẩu phải có từ 8 đến 255 ký tự.");
        }

        var user = new User
        {
            Name = request.Name,
            Username = request.Username,
            Email = request.Email,
            Phone = request.Phone,
            Role = "USER",
            Status = 1
        };
        user.Password = _passwordHasher.HashPassword(user, request.Password);

        var result = await _repository.CreateUserAsync(user, cancellationToken);
        if (result.Status == AdminUserCreateStatus.DuplicateEmailOrUsername)
            throw new InvalidOperationException("Email hoặc username đã được sử dụng.");

        return await _repository.GetUserAsync(result.UserId, cancellationToken)
            ?? throw new InvalidOperationException("Không thể tải hồ sơ người dùng vừa tạo.");
    }

    public async Task<AdminUserDto?> UpdateProfileAsync(
        int id,
        UpdateAdminUserProfileRequestDto request,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID người dùng không hợp lệ.");

        request.Name = NormalizeRequired(request.Name, "Tên");
        request.Username = NormalizeRequired(request.Username, "Username");
        request.Email = NormalizeRequired(request.Email, "Email");
        request.Phone = NormalizeRequired(request.Phone, "Số điện thoại");

        if (request.Name.Length > 255 ||
            request.Username.Length > 255 ||
            request.Email.Length > 255 ||
            request.Phone.Length > 255)
        {
            throw new ArgumentException("Thông tin tài khoản tối đa 255 ký tự.");
        }

        if (!new EmailAddressAttribute().IsValid(request.Email))
            throw new ArgumentException("Email không đúng định dạng.");

        var result = await _repository.UpdateProfileAsync(
            id,
            request,
            cancellationToken);
        if (result == AdminUserUpdateResult.NotFound)
            return null;
        if (result == AdminUserUpdateResult.DuplicateEmailOrUsername)
            throw new InvalidOperationException("Email hoặc username đã được sử dụng.");

        return await _repository.GetUserAsync(id, cancellationToken)
            ?? throw new InvalidOperationException("Không thể tải hồ sơ người dùng vừa cập nhật.");
    }

    public async Task<bool> SetStatusAsync(
        int id,
        bool isActive,
        int actorUserId,
        CancellationToken cancellationToken)
    {
        if (id <= 0 || actorUserId <= 0)
            throw new ArgumentException("ID người dùng không hợp lệ.");

        var result = await _repository.SetStatusAsync(
            id,
            isActive,
            actorUserId,
            cancellationToken);
        if (result == AdminUserStatusResult.CannotDisableSelf)
            throw new InvalidOperationException("Bạn không thể tự khóa tài khoản đang đăng nhập.");
        if (result == AdminUserStatusResult.LastActiveAdmin)
            throw new InvalidOperationException("Không thể khóa Admin hoạt động cuối cùng.");

        return result == AdminUserStatusResult.Updated;
    }

    private static string NormalizeRequired(string? value, string fieldName)
    {
        var normalized = value?.Trim() ?? "";
        if (normalized.Length == 0)
            throw new ArgumentException($"{fieldName} không được để trống.");
        return normalized;
    }

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
