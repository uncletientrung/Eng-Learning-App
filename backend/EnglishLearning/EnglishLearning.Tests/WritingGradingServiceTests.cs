using EnglishLearning.BLL.DTOs.WritingGrading;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class WritingGradingServiceTests
{
    [Fact]
    public async Task GradeAsync_RejectsTaskTypeThatDoesNotMatchExercise()
    {
        var exerciseRepository = new Mock<IWritingExerciseRepository>();
        var gradingRepository = new Mock<IWritingGradingRepository>();
        var llm = new Mock<ILlmGradingService>();
        exerciseRepository
            .Setup(repository => repository.GetByIdAsync(42))
            .ReturnsAsync(new WritingExercise
            {
                Id = 42,
                WritingType = "TASK_1"
            });
        var service = new WritingGradingService(
            exerciseRepository.Object,
            gradingRepository.Object,
            llm.Object);

        await Assert.ThrowsAsync<ArgumentException>(() =>
            service.GradeAsync(
                7,
                new WritingGradingRequestDto
                {
                    ExerciseId = 42,
                    WritingType = "TASK_2",
                    UserResponse = "A submitted response."
                }));

        llm.Verify(
            grader => grader.GradeAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string?>(),
                It.IsAny<string?>(),
                It.IsAny<string>(),
                It.IsAny<CancellationToken>()),
            Times.Never);
        gradingRepository.Verify(
            repository => repository.SaveAsync(
                It.IsAny<UserWritingAttempt>(),
                It.IsAny<List<UserWritingCriterionScore>>(),
                It.IsAny<CancellationToken>()),
            Times.Never);
    }
}
