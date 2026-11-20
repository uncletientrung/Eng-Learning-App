using EnglishLearning.DAL.ReadModels;

namespace EnglishLearning.BLL.Interfaces;

public interface IAdminUserService
{
    Task<AdminUserPageDto> GetUsersAsync(
        AdminUserQueryDto query,
        CancellationToken cancellationToken);
    Task<AdminUserDto?> GetUserAsync(int id, CancellationToken cancellationToken);
    Task<AdminUserDto> CreateUserAsync(
        CreateAdminUserRequestDto request,
        CancellationToken cancellationToken);
    Task<AdminUserDto?> UpdateProfileAsync(
        int id,
        UpdateAdminUserProfileRequestDto request,
        CancellationToken cancellationToken);
    Task<bool> SetStatusAsync(
        int id,
        bool isActive,
        int actorUserId,
        CancellationToken cancellationToken);
}
