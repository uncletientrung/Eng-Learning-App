using EnglishLearning.API.Controllers;
using EnglishLearning.API.Services;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class WritingImageUploadTests
{
    [Fact]
    public async Task CreateWithImage_BindsMultipartForm()
    {
        var directory = Path.Combine(Path.GetTempPath(), $"writing-http-test-{Guid.NewGuid():N}");
        Directory.CreateDirectory(directory);
        string? savedPath = null;
        var builder = WebApplication.CreateBuilder();
        builder.WebHost.UseUrls("http://127.0.0.1:0");
        builder.Services.AddControllers().AddApplicationPart(typeof(AdminWritingImagesController).Assembly);
        builder.Services.AddAuthentication("test").AddScheme<AuthenticationSchemeOptions, AdminTestAuthHandler>("test", _ => { });
        builder.Services.AddAuthorization();
        var service = new Mock<IAdminService>();
        AdminWritingExerciseRequestDto? savedRequest = null;
        service.Setup(value => value.CreateWritingExerciseAsync(It.IsAny<AdminWritingExerciseRequestDto>(), It.IsAny<CancellationToken>()))
            .Callback<AdminWritingExerciseRequestDto, CancellationToken>((request, _) => savedRequest = request)
            .ReturnsAsync(new AdminWritingExerciseDto { Id = 7 });
        builder.Services.AddSingleton(service.Object);
        builder.Configuration["WritingImages:Directory"] = directory;
        builder.Services.AddSingleton<WritingImageStorage>();
        await using var app = builder.Build();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        try
        {
            await app.StartAsync();
            var address = app.Services.GetRequiredService<IServer>().Features.Get<IServerAddressesFeature>()!.Addresses.Single();
            using var client = new HttpClient { BaseAddress = new Uri(address) };
            using var form = new MultipartFormDataContent();
            form.Add(new StringContent("2"), "topicId");
            form.Add(new StringContent("Example"), "title");
            form.Add(new StringContent("Prompt"), "questionText");
            form.Add(new StringContent("DRAFT"), "status");
            form.Add(new ByteArrayContent([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4]), "image", "example.png");

            var response = await client.PostAsync("/api/admin/writing/with-image", form);

            Assert.Equal(System.Net.HttpStatusCode.Created, response.StatusCode);
            Assert.NotNull(savedRequest);
            Assert.Equal(2, savedRequest.TopicId);
            Assert.Equal("Example", savedRequest.Title);
            Assert.Equal("Prompt", savedRequest.QuestionText);
            var url = Assert.IsType<string>(savedRequest.ImageUrl);
            Assert.StartsWith("/assets/writing/", url);
            savedPath = Path.Combine(directory, url["/assets/writing/".Length..]);
            Assert.True(File.Exists(savedPath));
        }
        finally
        {
            await app.StopAsync();
            if (savedPath is not null) File.Delete(savedPath);
            Directory.Delete(directory);
        }
    }

    [Theory]
    [InlineData(false)]
    [InlineData(true)]
    public async Task SaveWithImage_StoresImageAndPassesUrlToService(bool editing)
    {
        var directory = Path.Combine(Path.GetTempPath(), $"writing-image-test-{Guid.NewGuid():N}");
        Directory.CreateDirectory(directory);
        string? savedPath = null;
        try
        {
            var environment = new Mock<IWebHostEnvironment>();
            environment.SetupGet(value => value.ContentRootPath).Returns(directory);
            var configuration = new ConfigurationBuilder().AddInMemoryCollection(
                new Dictionary<string, string?> { ["WritingImages:Directory"] = directory }).Build();
            var service = new Mock<IAdminService>();
            AdminWritingExerciseRequestDto? savedRequest = null;
            service.Setup(value => value.GetWritingExerciseAsync(7, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new AdminWritingExerciseDto { Id = 7 });
            service.Setup(value => value.CreateWritingExerciseAsync(It.IsAny<AdminWritingExerciseRequestDto>(), It.IsAny<CancellationToken>()))
                .Callback<AdminWritingExerciseRequestDto, CancellationToken>((request, _) => savedRequest = request)
                .ReturnsAsync(new AdminWritingExerciseDto { Id = 7 });
            service.Setup(value => value.UpdateWritingExerciseAsync(7, It.IsAny<AdminWritingExerciseRequestDto>(), It.IsAny<CancellationToken>()))
                .Callback<int, AdminWritingExerciseRequestDto, CancellationToken>((_, request, _) => savedRequest = request)
                .ReturnsAsync(new AdminWritingExerciseDto { Id = 7 });
            var controller = new AdminWritingImagesController(
                service.Object, new WritingImageStorage(environment.Object, configuration),
                NullLogger<AdminWritingImagesController>.Instance);
            var bytes = new byte[] { 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4 };
            using var stream = new MemoryStream(bytes);
            var file = new FormFile(stream, 0, bytes.Length, "image", "../image.png");
            var request = new AdminWritingExerciseRequestDto { TopicId = 2, Title = "Example" };

            var result = editing
                ? await controller.Update(7, request, file, CancellationToken.None)
                : await controller.Create(request, file, CancellationToken.None);

            if (editing) Assert.IsType<OkObjectResult>(result);
            else Assert.IsType<CreatedAtActionResult>(result);
            Assert.NotNull(savedRequest);
            var url = Assert.IsType<string>(savedRequest.ImageUrl);
            Assert.StartsWith("/assets/writing/", url);
            Assert.EndsWith(".png", url);
            savedPath = Path.Combine(directory, url["/assets/writing/".Length..]);
            Assert.Equal(bytes, await File.ReadAllBytesAsync(savedPath));
        }

        finally
        {
            if (savedPath is not null) File.Delete(savedPath);
            Directory.Delete(directory);
        }
    }

    [Fact]
    public async Task CreateWithImage_RejectsInvalidImage()
    {
        var environment = new Mock<IWebHostEnvironment>();
        environment.SetupGet(value => value.ContentRootPath).Returns(Path.GetTempPath());
        var service = new Mock<IAdminService>();
        var images = new WritingImageStorage(environment.Object, new ConfigurationBuilder().Build());
        var controller = new AdminWritingImagesController(service.Object, images, NullLogger<AdminWritingImagesController>.Instance);
        using var stream = new MemoryStream(new byte[12]);
        var image = new FormFile(stream, 0, stream.Length, "image", "invalid.png");

        var result = await controller.Create(new AdminWritingExerciseRequestDto(), image, CancellationToken.None);

        Assert.IsType<BadRequestObjectResult>(result);
        service.Verify(value => value.CreateWritingExerciseAsync(It.IsAny<AdminWritingExerciseRequestDto>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    public sealed class AdminTestAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder) : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
    {
        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var identity = new ClaimsIdentity([new Claim(ClaimTypes.Role, "ADMIN")], Scheme.Name);
            var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name);
            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
