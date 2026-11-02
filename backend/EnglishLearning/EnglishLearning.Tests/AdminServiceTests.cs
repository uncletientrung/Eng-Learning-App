using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class AdminServiceTests
{
    private readonly Mock<IAdminRepository> _repository = new();
    private readonly AdminService _service;

    public AdminServiceTests()
    {
        _service = new AdminService(_repository.Object);
    }

    [Fact]
    public async Task UpdateWritingSubmissionAsync_RecalculatesOverallScoreFromCriteria()
    {
        var criteria = new List<AdminWritingCriterionUpdateDto>
        {
            Criterion("TASK_RESPONSE", 6),
            Criterion("COHERENCE_COHESION", 6.5m),
            Criterion("LEXICAL_RESOURCE", 7),
            Criterion("GRAMMAR", 7.5m)
        };
        var updatedSubmission = new AdminWritingSubmissionDetailDto
        {
            AttemptId = 12,
            OverallScore = 7
        };
        _repository
            .Setup(repository => repository.UpdateWritingSubmissionAsync(
                12,
                7,
                It.IsAny<List<AdminWritingCriterionUpdateDto>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);
        _repository
            .Setup(repository => repository.GetWritingSubmissionAsync(
                12,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(updatedSubmission);

        var result = await _service.UpdateWritingSubmissionAsync(
            12,
            new AdminWritingSubmissionUpdateDto { Criteria = criteria },
            CancellationToken.None);

        Assert.Same(updatedSubmission, result);
        _repository.Verify(repository => repository.UpdateWritingSubmissionAsync(
            12,
            7,
            It.Is<List<AdminWritingCriterionUpdateDto>>(items =>
                items[0].Feedback == "Feedback"),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateWritingSubmissionAsync_RejectsInvalidCriterionScore()
    {
        var criteria = ValidCriteria();
        criteria[0].Score = 4.2m;

        await Assert.ThrowsAsync<ArgumentException>(() =>
            _service.UpdateWritingSubmissionAsync(
                12,
                new AdminWritingSubmissionUpdateDto { Criteria = criteria },
                CancellationToken.None));

        _repository.Verify(repository => repository.UpdateWritingSubmissionAsync(
            It.IsAny<int>(),
            It.IsAny<decimal>(),
            It.IsAny<List<AdminWritingCriterionUpdateDto>>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task UpdateWritingSubmissionAsync_RejectsDuplicateCriterionCodes()
    {
        var criteria = ValidCriteria();
        criteria[1].CriterionCode = criteria[0].CriterionCode;

        await Assert.ThrowsAsync<ArgumentException>(() =>
            _service.UpdateWritingSubmissionAsync(
                12,
                new AdminWritingSubmissionUpdateDto { Criteria = criteria },
                CancellationToken.None));
    }

    [Fact]
    public async Task DeleteWritingSubmissionAsync_ReturnsFalseWhenAttemptDoesNotExist()
    {
        _repository
            .Setup(repository => repository.DeleteWritingSubmissionAsync(
                12,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        var deleted = await _service.DeleteWritingSubmissionAsync(
            12,
            CancellationToken.None);

        Assert.False(deleted);
    }

    private static List<AdminWritingCriterionUpdateDto> ValidCriteria() =>
    [
        Criterion("TASK_RESPONSE", 6),
        Criterion("COHERENCE_COHESION", 6.5m),
        Criterion("LEXICAL_RESOURCE", 7),
        Criterion("GRAMMAR", 7.5m)
    ];

    private static AdminWritingCriterionUpdateDto Criterion(
        string code,
        decimal score) =>
        new()
        {
            CriterionCode = code,
            Score = score,
            Feedback = " Feedback "
        };
}
