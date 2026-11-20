using System.Data;
using System.Linq.Expressions;
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace EnglishLearning.DAL.Repositories;

public sealed class AdminUserRepository : IAdminUserRepository
{
    private readonly AppDbContext _context;

    public AdminUserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AdminUserPageDto> GetUsersAsync(
        AdminUserQueryDto query,
        CancellationToken cancellationToken)
    {
        var users = _context.Users.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            users = users.Where(user =>
                user.Name.Contains(search) ||
                user.Username.Contains(search) ||
                user.Email.Contains(search) ||
                user.Phone.Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(query.Role))
            users = users.Where(user => user.Role == query.Role);

        if (query.Status == "ACTIVE")
            users = users.Where(user => user.Status != 0);
        else if (query.Status == "INACTIVE")
            users = users.Where(user => user.Status == 0);

        var totalCount = await users.CountAsync(cancellationToken);
        var roles = await _context.Users
            .AsNoTracking()
            .Where(user => user.Role != "")
            .Select(user => user.Role)
            .Distinct()
            .OrderBy(role => role)
            .ToListAsync(cancellationToken);
        var items = await users
            .OrderByDescending(user => user.Id)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(UserProjection())
            .ToListAsync(cancellationToken);

        return new AdminUserPageDto
        {
            Items = items,
            Roles = roles,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        };
    }

    public Task<AdminUserDto?> GetUserAsync(
        int id,
        CancellationToken cancellationToken) =>
        _context.Users
            .AsNoTracking()
            .Where(user => user.Id == id)
            .Select(UserProjection())
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<AdminUserCreateResult> CreateUserAsync(
        User user,
        CancellationToken cancellationToken)
    {
        var duplicate = await _context.Users.AnyAsync(
            candidate => candidate.Email == user.Email ||
                candidate.Username == user.Username,
            cancellationToken);
        if (duplicate)
        {
            return new AdminUserCreateResult(
                AdminUserCreateStatus.DuplicateEmailOrUsername,
                0);
        }

        await _context.Users.AddAsync(user, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new AdminUserCreateResult(AdminUserCreateStatus.Created, user.Id);
    }

    public async Task<AdminUserUpdateResult> UpdateProfileAsync(
        int id,
        UpdateAdminUserProfileRequestDto request,
        CancellationToken cancellationToken)
    {
        if (!await _context.Users.AnyAsync(
                candidate => candidate.Id == id,
                cancellationToken))
        {
            return AdminUserUpdateResult.NotFound;
        }

        var duplicate = await _context.Users.AnyAsync(
            candidate => candidate.Id != id &&
                (candidate.Email == request.Email ||
                 candidate.Username == request.Username),
            cancellationToken);
        if (duplicate)
            return AdminUserUpdateResult.DuplicateEmailOrUsername;

        var updatedCount = await _context.Users
            .Where(candidate => candidate.Id == id)
            .ExecuteUpdateAsync(
                setters => setters
                    .SetProperty(candidate => candidate.Name, request.Name)
                    .SetProperty(candidate => candidate.Username, request.Username)
                    .SetProperty(candidate => candidate.Email, request.Email)
                    .SetProperty(candidate => candidate.Phone, request.Phone),
                cancellationToken);
        return updatedCount > 0
            ? AdminUserUpdateResult.Updated
            : AdminUserUpdateResult.NotFound;
    }

    public async Task<AdminUserStatusResult> SetStatusAsync(
        int id,
        bool isActive,
        int actorUserId,
        CancellationToken cancellationToken)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(
            IsolationLevel.ReadCommitted,
            cancellationToken);

        if (!isActive)
        {
            if (id == actorUserId)
                return AdminUserStatusResult.CannotDisableSelf;

            var activeAdminIds = await LockActiveAdminIdsAsync(cancellationToken);

            var targetIsActiveAdmin = activeAdminIds.Contains(id);
            if (targetIsActiveAdmin && activeAdminIds.Count <= 1)
                return AdminUserStatusResult.LastActiveAdmin;
        }

        var updatedCount = await _context.Users
            .Where(user => user.Id == id)
            .ExecuteUpdateAsync(
                setters => setters.SetProperty(user => user.Status, isActive ? 1 : 0),
                cancellationToken);
        if (updatedCount == 0)
            return AdminUserStatusResult.NotFound;

        await transaction.CommitAsync(cancellationToken);
        return AdminUserStatusResult.Updated;
    }

    private async Task<List<int>> LockActiveAdminIdsAsync(
        CancellationToken cancellationToken)
    {
        var connection = _context.Database.GetDbConnection();
        await using var command = connection.CreateCommand();
        command.CommandText =
            "SELECT `Id` FROM `user` WHERE BINARY `Role` = 'ADMIN' AND `Status` <> 0 ORDER BY `Id` FOR UPDATE";
        command.Transaction = _context.Database.CurrentTransaction?.GetDbTransaction()
            ?? throw new InvalidOperationException("Status update requires an active transaction.");

        var ids = new List<int>();
        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
            ids.Add(reader.GetInt32(0));
        return ids;
    }

    private Expression<Func<User, AdminUserDto>> UserProjection() =>
        user => new AdminUserDto
        {
            Id = user.Id,
            Name = user.Name,
            Role = user.Role,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone,
            IsActive = user.Status != 0,
            CurrentStreak = user.CurrentStreak,
            LastStudyDate = user.LastStudyDate,
            Activity = new AdminUserActivityDto
            {
                WritingAttempts = _context.UserWritingAttempts.Count(
                    attempt => attempt.UserId == user.Id),
                ReadingAttempts = _context.UserReadingAttempts.Count(
                    attempt => attempt.UserId == user.Id),
                ListeningAttempts = _context.UserListeningAttempts.Count(
                    attempt => attempt.UserId == user.Id),
                SpeakingAttempts = _context.UserSpeakingAttempts.Count(
                    attempt => attempt.UserId == user.Id),
                TranslationAttempts = _context.UserTranslationAttempts.Count(
                    attempt => attempt.UserId == user.Id),
                VocabularyProgressItems = _context.UserWordProgresses.Count(
                    progress => progress.UserId == user.Id),
                TranslationProgressItems = _context.UserTranslationContentProgresses.Count(
                    progress => progress.UserId == user.Id)
            }
        };
}
