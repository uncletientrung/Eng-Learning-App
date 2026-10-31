using EnglishLearning.BLL.DTOs.SpeakingAssessment;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class SpeakingAssessmentServiceTests : IDisposable
{
    private readonly Mock<ISpeakingAssessmentRepository> _repository = new();
    private readonly Mock<ISpeakingGradingLlmService> _llm = new();
    private readonly string _audioRoot = Path.Combine(
        Path.GetTempPath(),
        "speaking-tests",
        Guid.NewGuid().ToString("N"));
    private readonly UserSpeakingAttempt _attempt;
    private readonly SpeakingQuestion _question;
    private readonly List<SpeakingCriterionScore> _savedScores = [];
    private int _gradingSaveCount;
    private readonly SpeakingAssessmentService _service;

    public SpeakingAssessmentServiceTests()
    {
        _question = new SpeakingQuestion
        {
            Id = 12,
            QuestionNumber = 1,
            QuestionText = "Describe your hometown."
        };
        _attempt = new UserSpeakingAttempt
        {
            Id = 5,
            UserId = 3,
            ExerciseId = 11,
            Status = "SUBMITTED",
            Exercise = new SpeakingExercise
            {
                Id = 11,
                Questions = [_question]
            },
            UserSpeakingAnswers =
            [
                new UserSpeakingAnswer
                {
                    Id = 20,
                    AttemptId = 5,
                    QuestionId = 12,
                    AudioUrl = "3/5/12.wav",
                    Transcript = "I live in a small coastal town.",
                    Question = _question
                }
            ]
        };

        var audioPath = Path.Combine(_audioRoot, "3", "5", "12.wav");
        Directory.CreateDirectory(Path.GetDirectoryName(audioPath)!);
        File.WriteAllBytes(audioPath, [1, 2, 3, 4]);

        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Speaking:AudioStoragePath"] = _audioRoot
            })
            .Build();

        _repository
            .Setup(repository => repository.GetAttemptForGradingAsync(
                _attempt.Id,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(_attempt);
        _repository
            .Setup(repository => repository.SaveAttemptAsync(
                It.IsAny<UserSpeakingAttempt>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _repository
            .Setup(repository => repository.SaveGradingResultAsync(
                It.IsAny<UserSpeakingAttempt>(),
                It.IsAny<List<SpeakingCriterionScore>>(),
                It.IsAny<string>(),
                It.IsAny<CancellationToken>()))
            .Callback<UserSpeakingAttempt, List<SpeakingCriterionScore>,
                string, CancellationToken>(
                (attempt, scores, gradingResult, _) =>
                {
                    _gradingSaveCount++;
                    _savedScores.Clear();
                    _savedScores.AddRange(scores);
                    attempt.GradingResult = gradingResult;
                    attempt.Status = "GRADED";
                })
            .Returns(Task.CompletedTask);

        _llm
            .Setup(service => service.GradeAsync(
                It.IsAny<IReadOnlyList<SpeakingGradingInputDto>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(ValidResult());

        _service = new SpeakingAssessmentService(
            _repository.Object,
            _llm.Object,
            configuration,
            Mock.Of<ILogger<SpeakingAssessmentService>>());
    }

    [Fact]
    public async Task ProcessGradingAsync_SavesValidatedCriteriaAndOverallScore()
    {
        await _service.ProcessGradingAsync(_attempt.Id);

        Assert.Equal("GRADED", _attempt.Status);
        Assert.Equal(6.5m, _attempt.OverallScore);
        Assert.Equal(4, _savedScores.Count);
        Assert.All(_savedScores, score => Assert.Equal(_attempt.Id, score.AttemptId));
        Assert.Contains(_savedScores, score =>
            score.CriterionCode == "GRAMMAR_ACCURACY" &&
            score.Issues.Contains("I has"));
        Assert.NotNull(_attempt.GradingResult);
        _repository.Verify(repository => repository.SaveGradingResultAsync(
            _attempt,
            It.Is<List<SpeakingCriterionScore>>(scores => scores.Count == 4),
            It.IsAny<string>(),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetAttemptAsync_LoadsCriteriaAndIssuesFromAttemptScores()
    {
        await _service.ProcessGradingAsync(_attempt.Id);
        _repository
            .Setup(repository => repository.GetOwnedAttemptAsync(
                3,
                _attempt.Id,
                true,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(_attempt);
        _repository
            .Setup(repository => repository.GetCriterionScoresAsync(
                _attempt.Id,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(_savedScores);

        var status = await _service.GetAttemptAsync(3, _attempt.Id);

        Assert.NotNull(status?.Result);
        Assert.Contains(
            status.Result.Criteria,
            criterion => criterion.Issues.Any(issue =>
                issue.OriginalText == "I has"));
        Assert.Equal(6.5m, status.OverallScore);
    }

    [Fact]
    public async Task ProcessGradingAsync_InvalidAiResultMarksAttemptFailed()
    {
        _llm
            .Setup(service => service.GradeAsync(
                It.IsAny<IReadOnlyList<SpeakingGradingInputDto>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GeminiSpeakingGradingResultDto
            {
                OverallFeedback = "Nhận xét",
                Criteria = [],
                AnswerFeedback =
                [
                    new SpeakingAnswerFeedbackDto
                    {
                        QuestionId = 12,
                        Feedback = "Nhận xét câu trả lời."
                    }
                ]
            });

        await Assert.ThrowsAsync<InvalidOperationException>(
            () => _service.ProcessGradingAsync(_attempt.Id));

        Assert.Equal("GRADING_FAILED", _attempt.Status);
        Assert.Empty(_savedScores);
    }

    [Fact]
    public async Task ProcessGradingAsync_TimeoutMarksAttemptFailed()
    {
        _llm
            .Setup(service => service.GradeAsync(
                It.IsAny<IReadOnlyList<SpeakingGradingInputDto>>(),
                It.IsAny<CancellationToken>()))
            .ThrowsAsync(new TaskCanceledException("Gemini request timed out."));

        await Assert.ThrowsAsync<TaskCanceledException>(
            () => _service.ProcessGradingAsync(_attempt.Id));

        Assert.Equal("GRADING_FAILED", _attempt.Status);
        Assert.Empty(_savedScores);
    }

    [Fact]
    public async Task SubmitAttemptAsync_RejectsMissingTranscript()
    {
        _attempt.Status = "IN_PROGRESS";
        _attempt.UserSpeakingAnswers.Single().Transcript = null;
        _repository
            .Setup(repository => repository.GetOwnedAttemptAsync(
                3,
                _attempt.Id,
                false,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(_attempt);
        _repository
            .Setup(repository => repository.GetQuestionIdsAsync(
                _attempt.ExerciseId,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync([_question.Id]);
        _repository
            .Setup(repository => repository.GetAnswersAsync(
                _attempt.Id,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(_attempt.UserSpeakingAnswers.ToList());

        await Assert.ThrowsAsync<ArgumentException>(
            () => _service.SubmitAttemptAsync(3, _attempt.Id));

        _repository.Verify(repository => repository.SaveAttemptAsync(
            It.IsAny<UserSpeakingAttempt>(),
            It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task CreateAttemptAsync_StartNewAttemptAbandonsPriorUnfinishedAttempt()
    {
        var oldAttempt = new UserSpeakingAttempt
        {
            Id = 40,
            UserId = 3,
            ExerciseId = 11,
            Status = "IN_PROGRESS",
            StartedAt = DateTime.UtcNow.AddMinutes(-5)
        };
        var exercise = new SpeakingExercise
        {
            Id = 11,
            Questions = [_question]
        };
        _repository
            .Setup(repository => repository.GetExerciseWithQuestionsAsync(
                exercise.Id,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(exercise);
        _repository
            .Setup(repository => repository.GetInProgressAttemptAsync(
                3,
                exercise.Id,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(oldAttempt);
        _repository
            .Setup(repository => repository.SaveAttemptAsync(
                oldAttempt,
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _repository
            .Setup(repository => repository.AddAttemptAsync(
                It.IsAny<UserSpeakingAttempt>(),
                It.IsAny<CancellationToken>()))
            .Callback<UserSpeakingAttempt, CancellationToken>(
                (attempt, _) => attempt.Id = 41)
            .Returns(Task.CompletedTask);

        var created = await _service.CreateAttemptAsync(
            3,
            exercise.Id,
            startNewAttempt: true);

        Assert.Equal("ABANDONED", oldAttempt.Status);
        Assert.NotNull(oldAttempt.CompletedAt);
        Assert.Equal(41, created.AttemptId);
        Assert.Equal("IN_PROGRESS", created.Status);
        _repository.Verify(repository => repository.AddAttemptAsync(
            It.Is<UserSpeakingAttempt>(attempt =>
                attempt.Status == "IN_PROGRESS" &&
                attempt.ExerciseId == exercise.Id),
            It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task RetryGradingAsync_ReplacesCriteriaForTheSameAttempt()
    {
        await _service.ProcessGradingAsync(_attempt.Id);
        _repository
            .Setup(repository => repository.GetOwnedAttemptAsync(
                3,
                _attempt.Id,
                false,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(_attempt);

        await _service.RetryGradingAsync(3, _attempt.Id);
        await _service.ProcessGradingAsync(_attempt.Id);

        Assert.Equal(2, _gradingSaveCount);
        Assert.Equal(4, _savedScores.Count);
        Assert.All(_savedScores, score => Assert.Equal(_attempt.Id, score.AttemptId));
        Assert.Equal("GRADED", _attempt.Status);
    }

    public void Dispose()
    {
        if (Directory.Exists(_audioRoot))
            Directory.Delete(_audioRoot, recursive: true);
    }

    private static GeminiSpeakingGradingResultDto ValidResult()
    {
        return new GeminiSpeakingGradingResultDto
        {
            OverallScore = 6.5m,
            OverallFeedback = "Bạn diễn đạt khá rõ ràng.",
            Criteria =
            [
                Criterion("FLUENCY_COHERENCE", 6.0m),
                Criterion("LEXICAL_RESOURCE", 6.5m),
                Criterion("GRAMMAR_ACCURACY", 6.0m),
                Criterion("PRONUNCIATION", 6.5m)
            ],
            AnswerFeedback =
            [
                new SpeakingAnswerFeedbackDto
                {
                    QuestionId = 12,
                    Feedback = "Câu trả lời rõ ràng, cần phát triển thêm ý."
                }
            ]
        };
    }

    private static SpeakingCriterionResultDto Criterion(
        string code,
        decimal score)
    {
        return new SpeakingCriterionResultDto
        {
            CriterionCode = code,
            Score = score,
            Feedback = "Nhận xét tiêu chí.",
            Strengths = "Điểm mạnh.",
            Weaknesses = "Điểm cần cải thiện.",
            Suggestions = "Gợi ý luyện tập.",
            Issues = code == "GRAMMAR_ACCURACY"
                ?
                [
                    new SpeakingIssueDto
                    {
                        OriginalText = "I has",
                        Correction = "I have",
                        Explanation = "Chủ ngữ số ít không dùng have.",
                        Category = "Ngữ pháp"
                    }
                ]
                : []
        };
    }
}
