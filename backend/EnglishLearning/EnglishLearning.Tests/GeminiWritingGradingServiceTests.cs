using System.Net;
using System.Text;
using System.Text.Json;
using EnglishLearning.BLL.DTOs.WritingGrading;
using EnglishLearning.BLL.Services;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class GeminiWritingGradingServiceTests
{
    [Theory]
    [InlineData(
        "TASK_1",
        "TASK_ACHIEVEMENT",
        "TASK_RESPONSE",
        "150",
        "clear overview",
        "IELTS ACADEMIC WRITING TASK 1 RUBRIC",
        "IELTS WRITING TASK 2 RUBRIC")]
    [InlineData(
        "TASK_2",
        "TASK_RESPONSE",
        "TASK_ACHIEVEMENT",
        "250",
        "consistent position",
        "IELTS WRITING TASK 2 RUBRIC",
        "IELTS ACADEMIC WRITING TASK 1 RUBRIC")]
    public async Task GradeAsync_UsesTaskSpecificInstructionsAndCriterion(
        string writingType,
        string expectedCriterion,
        string unexpectedCriterion,
        string minimumWords,
        string taskFocus,
        string expectedRubric,
        string unexpectedRubric)
    {
        var result = new GeminiGradingResultDto
        {
            OverallScore = 6,
            OverallFeedback = "Đánh giá tổng thể.",
            ImprovedVersion = "Reference answer.",
            Criteria =
            [
                Criterion(expectedCriterion),
                Criterion("COHERENCE_COHESION"),
                Criterion("LEXICAL_RESOURCE"),
                Criterion("GRAMMAR")
            ]
        };
        var resultJson = JsonSerializer.Serialize(result);
        var responseBody = JsonSerializer.Serialize(new
        {
            candidates = new[]
            {
                new
                {
                    content = new
                    {
                        parts = new[] { new { text = resultJson } }
                    }
                }
            }
        });
        var handler = new CapturingHandler(responseBody);
        using var httpClient = new HttpClient(handler);
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Gemini:ApiKey"] = "test-key",
                ["Gemini:Model"] = "test-model"
            })
            .Build();
        var service = new GeminiWritingGradingService(httpClient, configuration);

        await service.GradeAsync(
            "Writing exercise",
            "Describe or discuss the question.",
            null,
            writingType,
            "Student response");

        using var request = JsonDocument.Parse(handler.RequestBody!);
        var root = request.RootElement;
        var systemInstruction = root
            .GetProperty("systemInstruction")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();
        var input = root
            .GetProperty("contents")[0]
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();

        Assert.Contains(expectedCriterion, systemInstruction);
        Assert.DoesNotContain(unexpectedCriterion, systemInstruction);
        Assert.Contains(expectedRubric, systemInstruction);
        Assert.DoesNotContain(unexpectedRubric, systemInstruction);
        Assert.Contains($"{minimumWords} words", systemInstruction);
        Assert.Contains(taskFocus, systemInstruction);
        Assert.Contains(writingType, input);
        for (var band = 0; band <= 9; band++)
            Assert.Contains($"Band {band}:", systemInstruction);
    }

    [Fact]
    public async Task GradeAsync_DoesNotRetryWhenGeminiIsUnavailable()
    {
        var handler = new CapturingHandler(
            """{"error":{"message":"temporarily unavailable"}}""",
            HttpStatusCode.ServiceUnavailable);
        using var httpClient = new HttpClient(handler);
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Gemini:ApiKey"] = "test-key",
                ["Gemini:Model"] = "test-model"
            })
            .Build();
        var service = new GeminiWritingGradingService(httpClient, configuration);

        await Assert.ThrowsAsync<HttpRequestException>(() =>
            service.GradeAsync(
                "Writing exercise",
                "Describe or discuss the question.",
                null,
                "TASK_1",
                "Student response"));

        Assert.Equal(1, handler.RequestCount);
    }

    private static CriterionResultDto Criterion(string code) =>
        new()
        {
            CriterionCode = code,
            Score = 6,
            Issues = []
        };

    private sealed class CapturingHandler(
        string responseBody,
        HttpStatusCode statusCode = HttpStatusCode.OK) : HttpMessageHandler
    {
        public string? RequestBody { get; private set; }
        public int RequestCount { get; private set; }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            RequestCount++;
            RequestBody = await request.Content!.ReadAsStringAsync(
                cancellationToken);
            return new HttpResponseMessage(statusCode)
            {
                Content = new StringContent(
                    responseBody,
                    Encoding.UTF8,
                    "application/json")
            };
        }
    }
}
