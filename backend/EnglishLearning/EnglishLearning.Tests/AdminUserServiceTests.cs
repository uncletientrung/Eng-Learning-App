using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class AdminUserServiceTests
{
    private readonly Mock<IAdminUserRepository> _repository = new();
    private readonly Mock<EnglishLearning.BLL.Interfaces.IAdminUserPasswordHasher> _passwordHasher = new();
    private readonly AdminUserService _service;

    public AdminUserServiceTests()
    {
        _service = new AdminUserService(_repository.Object, _passwordHasher.Object);
    }

    [Fact]
    public async Task GetUsersAsync_NormalizesPaginationAndFilters()
    {
        _repository
            .Setup(repository => repository.GetUsersAsync(
                It.IsAny<AdminUserQueryDto>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminUserPageDto());

        var query = new AdminUserQueryDto
        {
            Page = 0,
            PageSize = 500,
            Search = "  learner  ",
            Role = " USER ",
            Status = " active "
        };

        await _service.GetUsersAsync(query, CancellationToken.None);

        Assert.Equal(1, query.Page);
        Assert.Equal(100, query.PageSize);
        Assert.Equal("learner", query.Search);
        Assert.Equal("USER", query.Role);
        Assert.Equal("ACTIVE", query.Status);
    }

    [Fact]
    public async Task GetUsersAsync_RejectsUnsupportedStatus()
    {
        await Assert.ThrowsAsync<ArgumentException>(() =>
            _service.GetUsersAsync(
                new AdminUserQueryDto { Status = "DELETED" },
                CancellationToken.None));

        _repository.Verify(repository => repository.GetUsersAsync(
            It.IsAny<AdminUserQueryDto>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task UpdateProfileAsync_TrimsValuesBeforeSaving()
    {
        var updatedUser = new AdminUserDto { Id = 7, Name = "Learner" };
        _repository
            .Setup(repository => repository.UpdateProfileAsync(
                7,
                It.IsAny<UpdateAdminUserProfileRequestDto>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(AdminUserUpdateResult.Updated);
        _repository
            .Setup(repository => repository.GetUserAsync(7, It.IsAny<CancellationToken>()))
            .ReturnsAsync(updatedUser);

        var result = await _service.UpdateProfileAsync(
            7,
            new UpdateAdminUserProfileRequestDto
            {
                Name = " Learner ",
                Username = " learner ",
                Email = " learner@example.com ",
                Phone = " 123 "
            },
            CancellationToken.None);

        Assert.Same(updatedUser, result);
        _repository.Verify(repository => repository.UpdateProfileAsync(
            7,
            It.Is<UpdateAdminUserProfileRequestDto>(request =>
                request.Name == "Learner" &&
                request.Username == "learner" &&
                request.Email == "learner@example.com" &&
                request.Phone == "123"),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateProfileAsync_RejectsDuplicateEmailOrUsername()
    {
        _repository
            .Setup(repository => repository.UpdateProfileAsync(
                7,
                It.IsAny<UpdateAdminUserProfileRequestDto>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(AdminUserUpdateResult.DuplicateEmailOrUsername);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.UpdateProfileAsync(
                7,
                new UpdateAdminUserProfileRequestDto
                {
                    Name = "Learner",
                    Username = "learner",
                    Email = "learner@example.com",
                    Phone = "123"
                },
                CancellationToken.None));
    }

    [Fact]
    public async Task CreateUserAsync_UsesUserRoleAndHashesTheInitialPassword()
    {
        _passwordHasher
            .Setup(hasher => hasher.HashPassword(It.IsAny<User>(), "initial-pass"))
            .Callback<User, string>((user, _) =>
            {
                Assert.Equal("USER", user.Role);
                Assert.Equal(1, user.Status);
            })
            .Returns("hashed-password");
        _repository
            .Setup(repository => repository.CreateUserAsync(
                It.Is<User>(user =>
                    user.Email == "learner@example.com" &&
                    user.Password == "hashed-password"),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminUserCreateResult(AdminUserCreateStatus.Created, 12));
        var createdUser = new AdminUserDto { Id = 12, Role = "USER" };
        _repository
            .Setup(repository => repository.GetUserAsync(12, It.IsAny<CancellationToken>()))
            .ReturnsAsync(createdUser);

        var result = await _service.CreateUserAsync(
            new CreateAdminUserRequestDto
            {
                Name = " Learner ",
                Username = " learner ",
                Email = " learner@example.com ",
                Phone = " 123 ",
                Password = "initial-pass"
            },
            CancellationToken.None);

        Assert.Same(createdUser, result);
        _repository.Verify(repository => repository.CreateUserAsync(
            It.Is<User>(user => user.Password == "hashed-password"),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateUserAsync_RejectsShortPasswordBeforeHashing()
    {
        await Assert.ThrowsAsync<ArgumentException>(() =>
            _service.CreateUserAsync(
                new CreateAdminUserRequestDto
                {
                    Name = "Learner",
                    Username = "learner",
                    Email = "learner@example.com",
                    Phone = "123",
                    Password = "short"
                },
                CancellationToken.None));

        _passwordHasher.Verify(
            hasher => hasher.HashPassword(It.IsAny<User>(), It.IsAny<string>()),
            Times.Never);
        _repository.Verify(repository => repository.CreateUserAsync(
            It.IsAny<User>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task SetStatusAsync_RejectsDisablingLastActiveAdmin()
    {
        _repository
            .Setup(repository => repository.SetStatusAsync(
                5,
                false,
                2,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(AdminUserStatusResult.LastActiveAdmin);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.SetStatusAsync(5, false, 2, CancellationToken.None));
    }
}
