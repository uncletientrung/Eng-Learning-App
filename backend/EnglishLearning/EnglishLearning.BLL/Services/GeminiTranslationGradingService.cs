using System.Net.Http.Json;
using System.Text.Json;

using EnglishLearning.BLL.DTOs.TranslationGrading;
using EnglishLearning.BLL.Interfaces;
using Microsoft.Extensions.Configuration;

namespace EnglishLearning.BLL.Services;

public sealed class GeminiTranslationGradingService(
    HttpClient httpClient,
    IConfiguration configuration) : ITranslationGradingService
{
    // Fill in the grading instructions when the desired rubric is ready.
    private const string GradingInstructions = "";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public async Task<TranslationGradingResult> GradeAsync(
        string exerciseName,
        string parentExerciseName,
        string? parentExerciseLevel,
        string sourceText,
        string referenceTranslation,
        string userResponse,
        CancellationToken cancellationToken)
    {
        var apiKey = configuration["Gemini:ApiKey"];
        var model = configuration["Gemini:Model"];
        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("Chưa cấu hình Gemini:ApiKey.");
        if (string.IsNullOrWhiteSpace(model))
            throw new InvalidOperationException("Chưa cấu hình Gemini:Model.");

        var prompt = $$"""
            INSTRUCTIONS:
            {{GradingInstructions}}

            Exercise name: {{exerciseName}}
            Parent exercise name: {{parentExerciseName}}
            Parent exercise level: {{parentExerciseLevel ?? "Not specified"}}
            Vietnamese source: {{sourceText}}
            Reference translation: {{referenceTranslation}}
            Student translation: {{userResponse}}
            """;

        using var request = new HttpRequestMessage(
            HttpMethod.Post,
            $"https://generativelanguage.googleapis.com/v1beta/models/{Uri.EscapeDataString(model)}:generateContent");
        request.Headers.Add("x-goog-api-key", apiKey);
        request.Content = JsonContent.Create(new
        {
            contents = new[] { new { parts = new[] { new { text = prompt } } } },
            systemInstruction = new { parts = new[] { new { text = GradingInstructions } } },
            generationConfig = new
            {
                responseMimeType = "application/json",
                responseSchema = new
                {
                    type = "OBJECT",
                    properties = new
                    {
                        score = new { type = "INTEGER" },
                        feedback = new { type = "STRING" },
                        issues = new
                        {
                            type = "ARRAY",
                            items = new
                            {
                                type = "OBJECT",
                                properties = new
                                {
                                    originalText = new { type = "STRING" },
                                    correction = new { type = "STRING" },
                                    explanation = new { type = "STRING" }
                                },
                                required = new[] { "originalText", "correction", "explanation" }
                            }
                        },
                        improvedVersion = new { type = "STRING" }
                    },
                    required = new[] { "score", "feedback", "issues", "improvedVersion" }
                }
            }
        });

        using var response = await httpClient.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            var detail = await response.Content.ReadAsStringAsync(cancellationToken);
            throw new HttpRequestException(
                $"Gemini API returned HTTP {(int)response.StatusCode}: {detail[..Math.Min(detail.Length, 500)]}",
                null,
                response.StatusCode);
        }

        using var document = JsonDocument.Parse(
            await response.Content.ReadAsStringAsync(cancellationToken));
        var text = document.RootElement.GetProperty("candidates")[0]
            .GetProperty("content").GetProperty("parts")[0]
            .GetProperty("text").GetString();
        var result = JsonSerializer.Deserialize<TranslationGradingResult>(text ?? "", JsonOptions)
            ?? throw new InvalidOperationException("Gemini returned an empty translation evaluation.");
        if (result.Score is < 0 or > 100 || string.IsNullOrWhiteSpace(result.Feedback) ||
            result.Issues is null || string.IsNullOrWhiteSpace(result.ImprovedVersion))
            throw new InvalidOperationException("Gemini returned an invalid translation evaluation.");
        return result;
    }
}

