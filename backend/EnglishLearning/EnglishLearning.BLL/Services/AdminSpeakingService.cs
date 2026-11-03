using System.Text.Json;
using EnglishLearning.BLL.DTOs.SpeakingAssessment;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.Extensions.Configuration;

namespace EnglishLearning.BLL.Services;

public sealed class AdminSpeakingService : IAdminSpeakingService
{
    private static readonly string[] CriterionCodes =
    [
        "FLUENCY_COHERENCE",
        "LEXICAL_RESOURCE",
        "GRAMMAR_ACCURACY",
        "PRONUNCIATION"
    ];

    private static readonly HashSet<string> CriterionCodeSet =
        new(CriterionCodes, StringComparer.Ordinal);

    private static readonly HashSet<string> SpeakingTypes =
        new(StringComparer.Ordinal)
        {
            "INTRODUCTION_INTERVIEW",
            "TOPIC",
            "TOPIC_DISCUSS"
        };

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    private readonly IAdminSpeakingRepository _repository;
    private readonly string _audioStoragePath;

    public AdminSpeakingService(
        IAdminSpeakingRepository repository,
        IConfiguration configuration)
    {
        _repository = repository;
        _audioStoragePath = Path.GetFullPath(
            configuration["Speaking:AudioStoragePath"]
                ?? Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "App_Data",
                    "speaking"));
    }

    public Task<AdminPageDto<AdminSpeakingExerciseDto>> GetExercisesAsync(
        AdminSpeakingExerciseQueryDto query,
        CancellationToken cancellationToken)
    {
        ValidatePaging(query.Page, query.PageSize);
        if (query.TopicId is <= 0)
            throw new ArgumentException("TopicId phải lớn hơn 0.");
        if (!string.IsNullOrWhiteSpace(query.SpeakingType) &&
            !SpeakingTypes.Contains(query.SpeakingType))
            throw new ArgumentException("SpeakingType không hợp lệ.");

        return _repository.GetExercisesAsync(query, cancellationToken);
    }

    public async Task<AdminSpeakingExerciseDto?> GetExerciseAsync(
        int id,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID đề Speaking không hợp lệ.");
        var exercise = await _repository.GetExerciseAsync(id, cancellationToken);
        return exercise is null
            ? null
            : await MapExerciseAsync(exercise, cancellationToken);
    }

    public async Task<AdminSpeakingExerciseDto> CreateExerciseAsync(
        AdminSpeakingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        ValidateExerciseRequest(request);
        if (!await _repository.IsSpeakingTopicAsync(request.TopicId, cancellationToken))
            throw new ArgumentException("Chủ đề không tồn tại hoặc không thuộc module SPEAKING.");

        var exercise = new SpeakingExercise
        {
            TopicId = request.TopicId,
            Title = request.Title.Trim(),
            SpeakingType = request.SpeakingType,
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
            Questions = request.Questions.Select(MapQuestion).ToList()
        };

        var id = await _repository.CreateExerciseAsync(exercise, cancellationToken);
        return (await GetExerciseAsync(id, cancellationToken))!;
    }

    public async Task<AdminSpeakingExerciseDto?> UpdateExerciseAsync(
        int id,
        AdminSpeakingExerciseRequestDto request,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID đề Speaking không hợp lệ.");
        ValidateExerciseRequest(request);
        if (!await _repository.IsSpeakingTopicAsync(request.TopicId, cancellationToken))
            throw new ArgumentException("Chủ đề không tồn tại hoặc không thuộc module SPEAKING.");

        var exercise = await _repository.GetExerciseForUpdateAsync(id, cancellationToken);
        if (exercise is null)
            return null;
        if (await _repository.HasAttemptsAsync(id, cancellationToken))
            throw new InvalidOperationException(
                "Không thể sửa nội dung đề đã có lượt làm để bảo toàn lịch sử học viên. Hãy tạo đề mới.");

        exercise.TopicId = request.TopicId;
        exercise.Title = request.Title.Trim();
        exercise.SpeakingType = request.SpeakingType;
        var questions = request.Questions.Select(question => MapQuestion(question, id)).ToList();
        await _repository.UpdateExerciseAsync(exercise, questions, cancellationToken);
        return await GetExerciseAsync(id, cancellationToken);
    }

    public Task<bool> SetExerciseStatusAsync(
        int id,
        bool isActive,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            throw new ArgumentException("ID đề Speaking không hợp lệ.");
        return _repository.SetExerciseStatusAsync(id, isActive, cancellationToken);
    }

    public Task<AdminPageDto<AdminSpeakingSubmissionDto>> GetSubmissionsAsync(
        AdminSpeakingSubmissionQueryDto query,
        CancellationToken cancellationToken)
    {
        ValidatePaging(query.Page, query.PageSize);
        if (query.ExerciseId is <= 0)
            throw new ArgumentException("ExerciseId phải lớn hơn 0.");
        if (query.TopicId is <= 0)
            throw new ArgumentException("TopicId phải lớn hơn 0.");
        if (query.MinimumScore is < 0 or > 9 ||
            query.MaximumScore is < 0 or > 9)
            throw new ArgumentException("Điểm lọc phải nằm trong khoảng 0 đến 9.");
        if (query.MinimumScore > query.MaximumScore)
            throw new ArgumentException("Điểm thấp nhất không được lớn hơn điểm cao nhất.");
        if (query.From > query.To)
            throw new ArgumentException("Ngày bắt đầu không được sau ngày kết thúc.");
        if (!string.IsNullOrWhiteSpace(query.SpeakingType) &&
            !SpeakingTypes.Contains(query.SpeakingType))
            throw new ArgumentException("SpeakingType không hợp lệ.");

        return _repository.GetSubmissionsAsync(query, cancellationToken);
    }

    public async Task<AdminSpeakingSubmissionDetailDto?> GetSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (attemptId <= 0)
            throw new ArgumentException("ID bài nộp Speaking không hợp lệ.");
        var attempt = await _repository.GetSubmissionAsync(attemptId, cancellationToken);
        if (attempt is null)
            return null;

        var gradingResult = string.IsNullOrWhiteSpace(attempt.GradingResult)
            ? null
            : JsonSerializer.Deserialize<SpeakingGradingResultDto>(
                attempt.GradingResult,
                JsonOptions);

        return new AdminSpeakingSubmissionDetailDto
        {
            AttemptId = attempt.Id,
            UserId = attempt.UserId,
            UserName = attempt.User.Name,
            UserEmail = attempt.User.Email,
            ExerciseId = attempt.ExerciseId,
            ExerciseTitle = attempt.Exercise.Title,
            TopicName = attempt.Exercise.Topic.Name,
            SpeakingType = attempt.Exercise.SpeakingType,
            Status = attempt.Status,
            OverallScore = attempt.OverallScore,
            StartedAt = attempt.StartedAt,
            CompletedAt = attempt.CompletedAt,
            OverallFeedback = gradingResult?.OverallFeedback,
            Answers = attempt.UserSpeakingAnswers
                .OrderBy(answer => answer.Question.QuestionNumber)
                .Select(answer => new AdminSpeakingAnswerDto
                {
                    Id = answer.Id,
                    QuestionId = answer.QuestionId,
                    QuestionNumber = answer.Question.QuestionNumber,
                    QuestionText = answer.Question.QuestionText,
                    Transcript = answer.Transcript,
                    SubmittedAt = answer.SubmittedAt,
                    AudioEndpoint = $"/api/admin/speaking/answers/{answer.Id}/audio",
                    AnswerFeedback = gradingResult?.AnswerFeedback
                        .FirstOrDefault(feedback => feedback.QuestionId == answer.QuestionId)
                        ?.Feedback
                })
                .ToList(),
            Criteria = attempt.CriterionScores
                .OrderBy(score => score.CriterionCode)
                .Select(score => new AdminSpeakingCriterionDto
                {
                    CriterionCode = score.CriterionCode,
                    Score = score.Score,
                    Feedback = score.Feedback,
                    Strengths = score.Strengths,
                    Weaknesses = score.Weaknesses,
                    Suggestions = score.Suggestions,
                    Issues = JsonSerializer.Deserialize<List<AdminSpeakingIssueDto>>(
                        score.Issues,
                        JsonOptions) ?? []
                })
                .ToList()
        };
    }

    public async Task<AdminSpeakingSubmissionDetailDto?> UpdateSubmissionAsync(
        int attemptId,
        AdminSpeakingSubmissionUpdateDto request,
        CancellationToken cancellationToken)
    {
        if (attemptId <= 0)
            throw new ArgumentException("ID bài nộp Speaking không hợp lệ.");
        if (request.Criteria is null ||
            request.Criteria.Count != CriterionCodes.Length ||
            request.Criteria.Any(criterion => criterion is null))
        {
            throw new ArgumentException("Bài chấm phải có đủ bốn tiêu chí Speaking.");
        }

        var criteria = request.Criteria
            .Select(criterion => new AdminSpeakingCriterionUpdateDto
            {
                CriterionCode = criterion.CriterionCode?.Trim() ?? "",
                Score = criterion.Score,
                Feedback = criterion.Feedback?.Trim(),
                Strengths = criterion.Strengths?.Trim(),
                Weaknesses = criterion.Weaknesses?.Trim(),
                Suggestions = criterion.Suggestions?.Trim()
            })
            .ToList();

        if (criteria.Any(criterion => !CriterionCodeSet.Contains(criterion.CriterionCode)) ||
            !criteria.Select(criterion => criterion.CriterionCode)
                .ToHashSet(StringComparer.Ordinal)
                .SetEquals(CriterionCodeSet))
        {
            throw new ArgumentException("Mã tiêu chí không hợp lệ hoặc bị trùng.");
        }
        if (criteria.Any(criterion =>
                criterion.Score < 0 ||
                criterion.Score > 9 ||
                criterion.Score * 2 != decimal.Truncate(criterion.Score * 2)))
        {
            throw new ArgumentException(
                "Điểm tiêu chí phải nằm trong khoảng 0 đến 9 và tăng theo bước 0,5.");
        }

        var attempt = await _repository.GetSubmissionAsync(attemptId, cancellationToken);
        if (attempt is null)
            return null;
        if (attempt.Status != "GRADED")
            throw new InvalidOperationException(
                "Chỉ có thể sửa kết quả khi lượt Speaking đã được chấm xong.");

        var overallScore = decimal.Round(
            criteria.Average(criterion => criterion.Score) * 2,
            0,
            MidpointRounding.AwayFromZero) / 2;
        if (!await _repository.UpdateSubmissionAsync(
                attemptId,
                overallScore,
                criteria,
                cancellationToken))
        {
            throw new InvalidOperationException(
                "Bài nộp không còn ở trạng thái đã chấm để cập nhật kết quả.");
        }

        return await GetSubmissionAsync(attemptId, cancellationToken)
            ?? throw new InvalidOperationException("Không thể tải bài nộp vừa cập nhật.");
    }

    public async Task<bool> DeleteSubmissionAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (attemptId <= 0)
            throw new ArgumentException("ID bài nộp Speaking không hợp lệ.");

        var attempt = await _repository.GetSubmissionAsync(attemptId, cancellationToken);
        if (attempt is null)
            return false;
        if (attempt.Status is not ("GRADED" or "GRADING_FAILED" or "ABANDONED"))
        {
            throw new InvalidOperationException(
                "Không thể xóa lượt đang làm hoặc đang chờ chấm. Hãy đợi xử lý hoàn tất rồi thử lại.");
        }

        var audioPaths = attempt.UserSpeakingAnswers
            .Where(answer => !string.IsNullOrWhiteSpace(answer.AudioUrl))
            .Select(answer => GetSafeAudioPath(answer.AudioUrl))
            .Where(File.Exists)
            .ToList();

        if (!await _repository.DeleteSubmissionAsync(attemptId, cancellationToken))
        {
            if (await _repository.GetSubmissionAsync(attemptId, cancellationToken) is null)
                return false;
            throw new InvalidOperationException(
                "Lượt Speaking đã chuyển trạng thái xử lý nên không thể xóa lúc này.");
        }

        foreach (var audioPath in audioPaths)
        {
            try
            {
                File.Delete(audioPath);
            }
            catch (Exception exception) when (
                exception is IOException or UnauthorizedAccessException)
            {
                throw new IOException(
                    "Bài nộp đã được xóa nhưng không thể xóa một hoặc nhiều file ghi âm.",
                    exception);
            }
        }

        return true;
    }

    public async Task<AdminSpeakingAudioFile?> GetAudioFileAsync(
        int answerId,
        CancellationToken cancellationToken)
    {
        if (answerId <= 0)
            throw new ArgumentException("ID câu trả lời không hợp lệ.");

        var answer = await _repository.GetAnswerWithAttemptAsync(
            answerId,
            cancellationToken);
        if (answer is null)
            return null;

        var fullPath = GetSafeAudioPath(answer.AudioUrl);
        if (!File.Exists(fullPath))
            return null;

        return new AdminSpeakingAudioFile(
            fullPath,
            $"speaking-attempt-{answer.AttemptId}-answer-{answer.Id}.wav");
    }

    private string GetSafeAudioPath(string audioUrl)
    {
        var relativePath = audioUrl.Replace('/', Path.DirectorySeparatorChar);
        if (Path.IsPathRooted(relativePath))
            throw new InvalidOperationException("Đường dẫn audio lưu trong dữ liệu không hợp lệ.");

        var fullPath = Path.GetFullPath(Path.Combine(_audioStoragePath, relativePath));
        var rootPrefix = _audioStoragePath.TrimEnd(
            Path.DirectorySeparatorChar,
            Path.AltDirectorySeparatorChar) + Path.DirectorySeparatorChar;
        if (!fullPath.StartsWith(rootPrefix, StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("Audio nằm ngoài thư mục lưu trữ được cho phép.");
        if (!string.Equals(Path.GetExtension(fullPath), ".wav", StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("Định dạng audio được lưu không hợp lệ.");
        return fullPath;
    }

    public async Task<bool> RetryGradingAsync(
        int attemptId,
        CancellationToken cancellationToken)
    {
        if (attemptId <= 0)
            throw new ArgumentException("ID bài nộp Speaking không hợp lệ.");
        if (!await _repository.RetryGradingAsync(attemptId, cancellationToken))
        {
            if (await _repository.GetSubmissionAsync(attemptId, cancellationToken) is null)
                throw new KeyNotFoundException("Không tìm thấy bài nộp Speaking.");
            throw new InvalidOperationException(
                "Chỉ có thể gửi chấm lại khi lượt làm đang ở trạng thái GRADING_FAILED.");
        }

        return true;
    }

    private async Task<AdminSpeakingExerciseDto> MapExerciseAsync(
        SpeakingExercise exercise,
        CancellationToken cancellationToken)
    {
        return new AdminSpeakingExerciseDto
        {
            Id = exercise.Id,
            TopicId = exercise.TopicId,
            TopicName = exercise.Topic.Name,
            Title = exercise.Title,
            SpeakingType = exercise.SpeakingType,
            CreatedAt = exercise.CreatedAt,
            IsActive = exercise.IsActive,
            QuestionCount = exercise.Questions.Count,
            SubmissionCount = await _repository.GetAttemptCountAsync(
                exercise.Id,
                cancellationToken),
            Questions = exercise.Questions
                .OrderBy(question => question.QuestionNumber)
                .Select(question => new AdminSpeakingQuestionDto
                {
                    Id = question.Id,
                    QuestionNumber = question.QuestionNumber,
                    QuestionText = question.QuestionText,
                    Cues = question.Cues,
                    Closing = question.Closing,
                    PreparationTime = question.PreparationTime,
                    ResponseTime = question.ResponseTime
                })
                .ToList()
        };
    }

    private static void ValidatePaging(int page, int pageSize)
    {
        if (page < 1 || pageSize < 1 || pageSize > 100)
            throw new ArgumentException("Phân trang không hợp lệ (page >= 1, pageSize từ 1 đến 100).");
    }

    private static void ValidateExerciseRequest(
        AdminSpeakingExerciseRequestDto request)
    {
        if (request.TopicId <= 0)
            throw new ArgumentException("Cần chọn chủ đề Speaking.");
        if (string.IsNullOrWhiteSpace(request.Title) || request.Title.Trim().Length > 255)
            throw new ArgumentException("Tiêu đề đề Speaking không được để trống và tối đa 255 ký tự.");
        if (!SpeakingTypes.Contains(request.SpeakingType))
            throw new ArgumentException("SpeakingType phải là INTRODUCTION_INTERVIEW, TOPIC hoặc TOPIC_DISCUSS.");
        if (request.Questions is null || request.Questions.Count == 0)
            throw new ArgumentException("Đề Speaking phải có ít nhất một câu hỏi.");
        if (request.SpeakingType == "TOPIC" && request.Questions.Count != 1)
            throw new ArgumentException("Đề Part 2 (TOPIC) phải có đúng một cue card.");
        if (request.Questions.Any(question =>
                question is null ||
                question.QuestionNumber is < 1 or > byte.MaxValue ||
                string.IsNullOrWhiteSpace(question.QuestionText) ||
                question.PreparationTime is < 0 ||
                question.ResponseTime is < 0 ||
                question.Cues?.Any(string.IsNullOrWhiteSpace) == true) ||
            request.Questions.Select(question => question.QuestionNumber).Distinct().Count()
                != request.Questions.Count)
        {
            throw new ArgumentException(
                "Câu hỏi cần có số thứ tự duy nhất từ 1 đến 255, nội dung, cue hợp lệ và thời gian không âm.");
        }
    }

    private static SpeakingQuestion MapQuestion(
        AdminSpeakingQuestionRequestDto question,
        int exerciseId = 0)
    {
        return new SpeakingQuestion
        {
            ExerciseId = exerciseId,
            QuestionNumber = (byte)question.QuestionNumber,
            QuestionText = question.QuestionText.Trim(),
            Cues = question.Cues?
                .Select(cue => cue.Trim())
                .Where(cue => cue.Length > 0)
                .ToList(),
            Closing = string.IsNullOrWhiteSpace(question.Closing)
                ? null
                : question.Closing.Trim(),
            PreparationTime = question.PreparationTime,
            ResponseTime = question.ResponseTime
        };
    }
}
