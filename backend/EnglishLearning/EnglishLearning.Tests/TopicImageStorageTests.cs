using EnglishLearning.API.Controllers;
using EnglishLearning.API.Services;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class TopicImageStorageTests
{
    [Fact]
    public async Task SaveAsync_StoresImageWithGeneratedNameAndReturnsPublicUrl()
    {
        var directory = Path.Combine(Path.GetTempPath(), $"topic-image-test-{Guid.NewGuid():N}");
        Directory.CreateDirectory(directory);
        try
        {
            var bytes = new byte[] { 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4 };
            using var stream = new MemoryStream(bytes);
            var file = new FormFile(stream, 0, bytes.Length, "image", "../untrusted.svg");
            var storage = CreateStorage(directory);

            var url = await storage.SaveAsync(file, CancellationToken.None);

            Assert.StartsWith("/assets/topics/", url);
            Assert.EndsWith(".png", url);
            var savedPath = Path.Combine(directory, url["/assets/topics/".Length..]);
            Assert.Equal(bytes, await File.ReadAllBytesAsync(savedPath));
            File.Delete(savedPath);
        }
        finally
        {
            Directory.Delete(directory);
        }
    }

    [Fact]
    public async Task SaveAsync_RejectsInvalidOrOversizedFiles()
    {
        var storage = CreateStorage(Path.GetTempPath());
        using var stream = new MemoryStream(new byte[12]);
        var invalid = new FormFile(stream, 0, stream.Length, "image", "image.png");
        var oversized = new FormFile(stream, 0, TopicImageStorage.MaxFileSize + 1, "image", "image.png");

        await Assert.ThrowsAsync<ArgumentException>(() => storage.SaveAsync(invalid, CancellationToken.None));
        await Assert.ThrowsAsync<ArgumentException>(() => storage.SaveAsync(oversized, CancellationToken.None));
    }

    [Fact]
    public async Task CreateTopicWithImage_PassesStoredImageUrlToService()
    {
        var directory = Path.Combine(Path.GetTempPath(), $"topic-image-test-{Guid.NewGuid():N}");
        Directory.CreateDirectory(directory);
        string? savedPath = null;
        try
        {
            var service = new Mock<IAdminTopicService>();
            SaveAdminTopicRequestDto? savedRequest = null;
            service.Setup(value => value.CreateTopicAsync(It.IsAny<SaveAdminTopicRequestDto>(), It.IsAny<CancellationToken>()))
                .Callback<SaveAdminTopicRequestDto, CancellationToken>((request, _) => savedRequest = request)
                .ReturnsAsync(new AdminTopicDto { Id = 7 });
            var controller = new AdminTopicsController(service.Object, CreateStorage(directory), NullLogger<AdminTopicsController>.Instance)
            {
                ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext() }
            };
            using var stream = new MemoryStream(new byte[] { 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4 });
            var request = new AdminTopicsController.SaveTopicWithImageRequest
            {
                Name = "Example",
                ModuleType = "VOCABULARY",
                Image = new FormFile(stream, 0, stream.Length, "image", "example.png")
            };

            var result = await controller.CreateTopicWithImage(request, CancellationToken.None);

            Assert.IsType<CreatedAtActionResult>(result);
            Assert.NotNull(savedRequest);
            var imageUrl = Assert.IsType<string>(savedRequest.ImageURL);
            Assert.StartsWith("/assets/topics/", imageUrl);
            savedPath = Path.Combine(directory, imageUrl["/assets/topics/".Length..]);
            Assert.True(File.Exists(savedPath));
        }
        finally
        {
            if (savedPath is not null) File.Delete(savedPath);
            Directory.Delete(directory);
        }
    }

    private static TopicImageStorage CreateStorage(string directory)
    {
        var environment = new Mock<IWebHostEnvironment>();
        environment.SetupGet(value => value.ContentRootPath).Returns(directory);
        var configuration = new ConfigurationBuilder().AddInMemoryCollection(
            new Dictionary<string, string?> { ["TopicImages:Directory"] = directory }).Build();
        return new TopicImageStorage(environment.Object, configuration);
    }
}
