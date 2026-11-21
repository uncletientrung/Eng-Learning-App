using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class AdminTopicServiceTests
{
    private readonly Mock<IAdminTopicRepository> _repository = new();
    private readonly AdminTopicService _service;

    public AdminTopicServiceTests()
    {
        _service = new AdminTopicService(_repository.Object);
    }

    [Fact]
    public async Task GetTopicsAsync_NormalizesPaginationAndFilters()
    {
        _repository
            .Setup(repository => repository.GetTopicsAsync(
                It.IsAny<AdminTopicQueryDto>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicPageDto());

        var query = new AdminTopicQueryDto
        {
            Page = 0,
            PageSize = 500,
            Search = "  chart  ",
            ModuleType = " writing "
        };

        await _service.GetTopicsAsync(query, CancellationToken.None);

        Assert.Equal(1, query.Page);
        Assert.Equal(100, query.PageSize);
        Assert.Equal("chart", query.Search);
        Assert.Equal("WRITING", query.ModuleType);
    }

    [Theory]
    [InlineData("  ", "WRITING", null)]
    [InlineData("Pie Chart", "READING", null)]
    [InlineData("Pie Chart", "WRITING", "javascript:alert(1)")]
    [InlineData("Pie Chart", "WRITING", "//evil.example/a.png")]
    [InlineData("Pie Chart", "WRITING", "/assets/../secret.png")]
    [InlineData("Pie Chart", "WRITING", "http://example.com/a.png")]
    public async Task CreateTopicAsync_RejectsInvalidInput(
        string name,
        string moduleType,
        string? imageUrl)
    {
        await Assert.ThrowsAsync<ArgumentException>(() =>
            _service.CreateTopicAsync(
                new SaveAdminTopicRequestDto
                {
                    Name = name,
                    ModuleType = moduleType,
                    ImageURL = imageUrl
                },
                CancellationToken.None));

        _repository.Verify(repository => repository.CreateTopicAsync(
            It.IsAny<Topic>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task CreateTopicAsync_CreatesSystemTopicWithNormalizedValues()
    {
        Topic? saved = null;
        _repository
            .Setup(repository => repository.CreateTopicAsync(
                It.IsAny<Topic>(),
                It.IsAny<CancellationToken>()))
            .Callback<Topic, CancellationToken>((topic, _) => saved = topic)
            .ReturnsAsync(new AdminTopicCreateResult(AdminTopicCreateStatus.Created, 7));
        _repository
            .Setup(repository => repository.GetTopicAsync(7, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicDto { Id = 7 });

        var result = await _service.CreateTopicAsync(
            new SaveAdminTopicRequestDto
            {
                Name = " Pie Chart ",
                ModuleType = "writing",
                ImageURL = "/assets/topics/pie.webp",
                Description = "  "
            },
            CancellationToken.None);

        Assert.Equal(7, result.Id);
        Assert.NotNull(saved);
        Assert.Equal("Pie Chart", saved.Name);
        Assert.Equal("WRITING", saved.ModuleType);
        Assert.Null(saved.Description);
        Assert.Null(saved.CreateByUserId);
        Assert.True(saved.IsActive);
    }

    [Fact]
    public async Task CreateTopicAsync_ThrowsConflictForDuplicateName()
    {
        _repository
            .Setup(repository => repository.CreateTopicAsync(
                It.IsAny<Topic>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicCreateResult(AdminTopicCreateStatus.DuplicateName, 0));

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.CreateTopicAsync(
                new SaveAdminTopicRequestDto { Name = "Map", ModuleType = "WRITING" },
                CancellationToken.None));
    }

    [Fact]
    public async Task UpdateTopicAsync_AllowsLegacyModuleWhenUnchanged()
    {
        _repository
            .Setup(repository => repository.GetTopicAsync(3, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicDto { Id = 3, ModuleType = "READING" });
        _repository
            .Setup(repository => repository.UpdateTopicAsync(
                3,
                It.IsAny<SaveAdminTopicRequestDto>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicUpdateResult(AdminTopicUpdateStatus.Updated));

        var result = await _service.UpdateTopicAsync(
            3,
            new SaveAdminTopicRequestDto { Name = "Renamed", ModuleType = "reading" },
            CancellationToken.None);

        Assert.NotNull(result);
    }

    [Fact]
    public async Task UpdateTopicAsync_RejectsModuleChangeWhenTopicInUse()
    {
        _repository
            .Setup(repository => repository.GetTopicAsync(3, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicDto { Id = 3, ModuleType = "WRITING" });
        _repository
            .Setup(repository => repository.UpdateTopicAsync(
                3,
                It.IsAny<SaveAdminTopicRequestDto>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicUpdateResult(
                AdminTopicUpdateStatus.ModuleInUse,
                new AdminTopicUsageDto { Writing = 4 }));

        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.UpdateTopicAsync(
                3,
                new SaveAdminTopicRequestDto { Name = "Map", ModuleType = "SPEAKING" },
                CancellationToken.None));

        Assert.Contains("4 đề Writing", exception.Message);
    }

    [Fact]
    public async Task DeleteTopicAsync_ThrowsConflictWithUsageWhenInUse()
    {
        _repository
            .Setup(repository => repository.DeleteTopicAsync(5, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicDeleteResult(
                AdminTopicDeleteStatus.InUse,
                new AdminTopicUsageDto { Vocabulary = 12 }));

        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.DeleteTopicAsync(5, CancellationToken.None));

        Assert.Contains("12 từ vựng", exception.Message);
    }

    [Fact]
    public async Task DeleteTopicAsync_ReturnsFalseWhenMissingAndTrueWhenDeleted()
    {
        _repository
            .Setup(repository => repository.DeleteTopicAsync(1, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicDeleteResult(AdminTopicDeleteStatus.NotFound));
        _repository
            .Setup(repository => repository.DeleteTopicAsync(2, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AdminTopicDeleteResult(AdminTopicDeleteStatus.Deleted));

        Assert.False(await _service.DeleteTopicAsync(1, CancellationToken.None));
        Assert.True(await _service.DeleteTopicAsync(2, CancellationToken.None));
    }
}
