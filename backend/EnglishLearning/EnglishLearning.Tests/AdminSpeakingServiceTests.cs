using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class AdminSpeakingServiceTests
{
    private readonly Mock<IAdminSpeakingRepository> _repository = new();
    private readonly AdminSpeakingService _service;

    public AdminSpeakingServiceTests()
    {
        var configuration = new Mock<IConfiguration>();
        configuration
            .Setup(item => item["Speaking:AudioStoragePath"])
            .Returns(Path.GetTempPath());
        _service = new AdminSpeakingService(_repository.Object, configuration.Object);
    }

    [Fact]
    public async Task UpdateSubmissionAsync_RecalculatesOverallScoreFromCriteria()
    {
        var criteria = ValidCriteria();
        var attempt = CreateGradedAttempt();
        _repository
            .SetupSequence(repository => repository.GetSubmissionAsync(
                12,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt)
            .ReturnsAsync(CreateGradedAttempt(7));
        _repository
            .Setup(repository => repository.UpdateSubmissionAsync(
                12,
                7,
                It.IsAny<IReadOnlyCollection<AdminSpeakingCriterionUpdateDto>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        var result = await _service.UpdateSubmissionAsync(
            12,
            new AdminSpeakingSubmissionUpdateDto { Criteria = criteria },
            CancellationToken.None);

        Assert.NotNull(result);
        Assert.Equal(7, result.OverallScore);
        _repository.Verify(repository => repository.UpdateSubmissionAsync(
            12,
            7,
            It.Is<IReadOnlyCollection<AdminSpeakingCriterionUpdateDto>>(items =>
                items.First().Feedback == "Feedback"),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateSubmissionAsync_RejectsInvalidScore()
    {
        var criteria = ValidCriteria();
        criteria[0].Score = 4.2m;

        await Assert.ThrowsAsync<ArgumentException>(() =>
            _service.UpdateSubmissionAsync(
                12,
                new AdminSpeakingSubmissionUpdateDto { Criteria = criteria },
                CancellationToken.None));

        _repository.Verify(repository => repository.UpdateSubmissionAsync(
            It.IsAny<int>(),
            It.IsAny<decimal>(),
            It.IsAny<IReadOnlyCollection<AdminSpeakingCriterionUpdateDto>>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task UpdateSubmissionAsync_RejectsUnfinishedSubmission()
    {
        var attempt = CreateGradedAttempt();
        attempt.Status = "GRADING";
        _repository
            .Setup(repository => repository.GetSubmissionAsync(
                12,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.UpdateSubmissionAsync(
                12,
                new AdminSpeakingSubmissionUpdateDto { Criteria = ValidCriteria() },
                CancellationToken.None));

        _repository.Verify(repository => repository.UpdateSubmissionAsync(
            It.IsAny<int>(),
            It.IsAny<decimal>(),
            It.IsAny<IReadOnlyCollection<AdminSpeakingCriterionUpdateDto>>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task DeleteSubmissionAsync_RejectsSubmissionBeingGraded()
    {
        var attempt = CreateGradedAttempt();
        attempt.Status = "SUBMITTED";
        _repository
            .Setup(repository => repository.GetSubmissionAsync(
                12,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(attempt);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.DeleteSubmissionAsync(12, CancellationToken.None));

        _repository.Verify(repository => repository.DeleteSubmissionAsync(
            It.IsAny<int>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task DeleteExerciseAsync_RejectsExerciseWithAttempts()
    {
        _repository
            .Setup(repository => repository.DeleteExerciseAsync(
                7,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new SpeakingExerciseDeleteResult(true, true));

        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _service.DeleteExerciseAsync(7, CancellationToken.None));

        Assert.Contains("đã có bài làm", exception.Message);
    }

    [Fact]
    public async Task DeleteExerciseAsync_ThrowsWhenExerciseDoesNotExist()
    {
        _repository
            .Setup(repository => repository.DeleteExerciseAsync(
                7,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new SpeakingExerciseDeleteResult(false, false));

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            _service.DeleteExerciseAsync(7, CancellationToken.None));
    }

    private static List<AdminSpeakingCriterionUpdateDto> ValidCriteria() =>
    [
        Criterion("FLUENCY_COHERENCE", 6),
        Criterion("LEXICAL_RESOURCE", 6.5m),
        Criterion("GRAMMAR_ACCURACY", 7),
        Criterion("PRONUNCIATION", 7.5m)
    ];

    private static AdminSpeakingCriterionUpdateDto Criterion(
        string code,
        decimal score) =>
        new()
        {
            CriterionCode = code,
            Score = score,
            Feedback = " Feedback "
        };

    private static UserSpeakingAttempt CreateGradedAttempt(decimal overallScore = 6) =>
        new()
        {
            Id = 12,
            Status = "GRADED",
            OverallScore = overallScore,
            User = new User { Name = "Student", Email = "student@example.test" },
            Exercise = new SpeakingExercise
            {
                Title = "Speaking task",
                SpeakingType = "TOPIC",
                Topic = new Topic { Name = "Travel" }
            }
        };
}
