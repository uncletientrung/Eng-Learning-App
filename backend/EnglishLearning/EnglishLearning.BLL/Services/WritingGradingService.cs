using System.Text.Json;
using EnglishLearning.BLL.DTOs.WritingGrading;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class WritingGradingService : IWritingGradingService
{
    private readonly IWritingExerciseRepository _exerciseRepository;
    private readonly IWritingGradingRepository _gradingRepository;
    private readonly ILlmGradingService _llm;

    public WritingGradingService(
        IWritingExerciseRepository exerciseRepository,
        IWritingGradingRepository gradingRepository,
        ILlmGradingService llm)
    {
        _exerciseRepository = exerciseRepository;
        _gradingRepository = gradingRepository;
        _llm = llm;
    }

    public async Task<WritingGradingResultDto> GradeAsync(
        int userId,
        WritingGradingRequestDto request,
        CancellationToken cancellationToken = default)
    {
        if (userId <= 0)
            throw new ArgumentException("User ID không hợp lệ.");

        if (string.IsNullOrWhiteSpace(request.UserResponse))
            throw new ArgumentException("Bạn chưa nhập bài viết.");

        var exercise = await _exerciseRepository.GetByIdAsync(request.ExerciseId);

        if (exercise == null)
            throw new KeyNotFoundException(
                "Không tìm thấy đề Writing.");

        var userResponse = request.UserResponse.Trim();

        // Gọi Gemini chấm bài.
        var (result, rawJson) = await _llm.GradeAsync(
            exercise.Title,
            exercise.QuestionText,
            exercise.Instruction,
            exercise.WritingType,
            userResponse,
            cancellationToken);

        // Tính lại điểm tổng thể từ bốn tiêu chí thay vì tin
        // hoàn toàn vào điểm tổng thể do LLM trả về.
        var average = result.Criteria.Average(c => c.Score);

        var overallScore = (decimal)(
            Math.Round(
                (double)average * 2,
                MidpointRounding.AwayFromZero) / 2);

        var completedAt = DateTime.UtcNow;

        var attempt = new UserWritingAttempt
        {
            UserId = userId,
            ExerciseId = exercise.Id,
            UserResponse = userResponse,
            OverallScore = overallScore,
            LlmRawResponse = rawJson,
            StartedAt = completedAt,
            CompletedAt = completedAt
        };

        var scores = result.Criteria.Select(c =>
            new UserWritingCriterionScore
            {
                CriterionCode = c.CriterionCode,
                Score = c.Score,
                Feedback = c.Feedback,
                Strengths = c.Strengths,
                Weaknesses = c.Weaknesses,
                Suggestions = c.Suggestions,
                Issues = JsonSerializer.Serialize(c.Issues)
            }).ToList();

        await _gradingRepository.SaveAsync(
            attempt, scores, cancellationToken);

        return new WritingGradingResultDto
        {
            AttemptId = attempt.Id,
            OverallScore = overallScore,
            OverallFeedback = result.OverallFeedback,
            ImprovedVersion = result.ImprovedVersion,
            Criteria = result.Criteria
        };
    }
}