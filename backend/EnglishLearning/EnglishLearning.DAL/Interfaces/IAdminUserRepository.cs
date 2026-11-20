using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.DAL.Interfaces;

public interface IAdminUserRepository
{
    Task<AdminUserPageDto> GetUsersAsync(
        AdminUserQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminUserDto?> GetUserAsync(int id, CancellationToken cancellationToken);
    Task<AdminUserCreateResult> CreateUserAsync(
        User user,
        CancellationToken cancellationToken);
    Task<AdminUserUpdateResult> UpdateProfileAsync(
        int id,
        UpdateAdminUserProfileRequestDto request,
        CancellationToken cancellationToken);
    Task<AdminUserStatusResult> SetStatusAsync(
        int id,
        bool isActive,
        int actorUserId,
        CancellationToken cancellationToken);
}

public enum AdminUserCreateStatus
{
    Created,
    DuplicateEmailOrUsername
}

public sealed record AdminUserCreateResult(AdminUserCreateStatus Status, int UserId);

public enum AdminUserUpdateResult
{
    Updated,
    NotFound,
    DuplicateEmailOrUsername
}

public enum AdminUserStatusResult
{
    Updated,
    NotFound,
    CannotDisableSelf,
    LastActiveAdmin
}
