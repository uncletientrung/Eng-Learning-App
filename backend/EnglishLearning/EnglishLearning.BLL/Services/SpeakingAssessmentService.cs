using System.Text.Json;
using EnglishLearning.BLL.DTOs.SpeakingAssessment;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EnglishLearning.BLL.Services;

public sealed class SpeakingAssessmentService : ISpeakingAssessmentService
{
    private const long MaxAudioFileBytes = 10 * 1024 * 1024;
    private const long MaxAttemptAudioBytes = 20 * 1024 * 1024;
    private const string InProgress = "IN_PROGRESS";
    private const string Submitted = "SUBMITTED";
    private const string Grading = "GRADING";
    private const string GradingFailed = "GRADING_FAILED";
    private const string Graded = "GRADED";
    private const string Abandoned = "ABANDONED";

    private static readonly string[] CriterionCodes =
    [
        "FLUENCY_COHERENCE",
        "LEXICAL_RESOURCE",
        "GRAMMAR_ACCURACY",
        "PRONUNCIATION"
    ];

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    private readonly ISpeakingAssessmentRepository _repository;
    private readonly ISpeakingGradingLlmService _llm;
    private readonly ILogger<SpeakingAssessmentService> _logger;
    private readonly string _audioStoragePath;

    public SpeakingAssessmentService(
        ISpeakingAssessmentRepository repository,
        ISpeakingGradingLlmService llm,
        IConfiguration configuration,
        ILogger<SpeakingAssessmentService> logger)
    {
        _repository = repository;
        _llm = llm;
        _logger = logger;
        _audioStoragePath = Path.GetFullPath(
            configuration["Speaking:AudioStoragePath"]
                ?? Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "App_Data",
                    "speaking"));
    }

    public async Task<SpeakingAttemptCreatedDto> CreateAttemptAsync(
        int userId,
        int exerciseId,
        bool startNewAttempt = false,
        CancellationToken cancellationToken = default)
    {
        if (userId <= 0 || exerciseId <= 0)
            throw new ArgumentException("Thông tin người dùng hoặc đề không hợp lệ.");

        var exercise = await _repository.GetExerciseWithQuestionsAsync(
            exerciseId,
            cancellationToken);

        if (exercise is null)
            throw new KeyNotFoundException("Không tìm thấy đề Speaking.");
        if (exercise.Questions.Count == 0)
            throw new InvalidOperationException("Đề Speaking chưa có câu hỏi.");

        var unfinishedAttempt = await _repository.GetInProgressAttemptAsync(
            userId,
            exerciseId,
            cancellationToken);

        if (unfinishedAttempt is not null && !startNewAttempt)
        {
            return new SpeakingAttemptCreatedDto
            {
                AttemptId = unfinishedAttempt.Id,
                Status = unfinishedAttempt.Status
            };
        }

        if (unfinishedAttempt is not null)
        {
            unfinishedAttempt.Status = Abandoned;
            unfinishedAttempt.CompletedAt = DateTime.UtcNow;
            await _repository.SaveAttemptAsync(
                unfinishedAttempt,
                cancellationToken);
        }

        var attempt = new UserSpeakingAttempt
        {
            UserId = userId,
            ExerciseId = exerciseId,
            Status = InProgress,
            StartedAt = DateTime.UtcNow
        };

        await _repository.AddAttemptAsync(attempt, cancellationToken);

        return new SpeakingAttemptCreatedDto
        {
            AttemptId = attempt.Id,
            Status = attempt.Status
        };
    }

    public async Task SaveAnswerAsync(
        int userId,
        int attemptId,
        int questionId,
        string transcript,
        Stream audio,
        long audioLength,
        string contentType,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(transcript))
            throw new ArgumentException("Transcript câu trả lời không được để trống.");
        if (audioLength <= 0 || audioLength > MaxAudioFileBytes)
            throw new ArgumentException("File ghi âm phải nhỏ hơn hoặc bằng 10 MB.");
        if (!string.Equals(
                contentType,
                "audio/wav",
                StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException(
                "File ghi âm phải ở định dạng WAV.");
        }

        var attempt = await _repository.GetOwnedAttemptAsync(
            userId,
            attemptId,
            cancellationToken: cancellationToken);

        if (attempt is null)
            throw new KeyNotFoundException("Không tìm thấy lượt làm Speaking.");
        if (attempt.Status != InProgress)
            throw new InvalidOperationException(
                "Lượt làm đã được nộp và không thể sửa câu trả lời.");

        var questionBelongsToExercise =
            await _repository.QuestionBelongsToExerciseAsync(
            questionId,
            attempt.ExerciseId,
            cancellationToken);

        if (!questionBelongsToExercise)
            throw new ArgumentException("Câu hỏi không thuộc đề Speaking này.");

        var folder = Path.Combine(
            _audioStoragePath,
            userId.ToString(),
            attemptId.ToString());
        Directory.CreateDirectory(folder);

        var fileName = $"{questionId}-{Guid.NewGuid():N}.wav";
        var fullPath = Path.Combine(folder, fileName);
        var relativePath = Path.GetRelativePath(_audioStoragePath, fullPath)
            .Replace(Path.DirectorySeparatorChar, '/');

        try
        {
            await using (var file = new FileStream(
                fullPath,
                FileMode.CreateNew,
                FileAccess.Write,
                FileShare.None,
                bufferSize: 81920,
                useAsync: true))
            {
                await audio.CopyToAsync(file, cancellationToken);
            }
            var storedAudioLength = new FileInfo(fullPath).Length;
            if (storedAudioLength <= 0 || storedAudioLength > MaxAudioFileBytes)
                throw new ArgumentException(
                    "File ghi âm phải lớn hơn 0 và nhỏ hơn hoặc bằng 10 MB.");

            var answer = await _repository.GetAnswerAsync(
                attemptId,
                questionId,
                cancellationToken);

            var previousAudioPath = answer?.AudioUrl;
            if (answer is null)
            {
                answer = new UserSpeakingAnswer
                {
                    AttemptId = attemptId,
                    QuestionId = questionId
                };
            }

            answer.AudioUrl = relativePath;
            answer.Transcript = transcript.Trim();
            answer.SubmittedAt = DateTime.UtcNow;

            await _repository.SaveAnswerAsync(answer, cancellationToken);

            if (previousAudioPath is not null)
                DeleteStoredAudio(previousAudioPath);
        }
        catch
        {
            DeleteStoredAudio(relativePath);
            throw;
        }
    }

    public async Task SubmitAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        var attempt = await _repository.GetOwnedAttemptAsync(
            userId,
            attemptId,
            cancellationToken: cancellationToken);

        if (attempt is null)
            throw new KeyNotFoundException("Không tìm thấy lượt làm Speaking.");
        if (attempt.Status != InProgress)
            throw new InvalidOperationException(
                "Lượt làm Speaking đã được nộp hoặc đang xử lý.");

        var questionIds = await _repository.GetQuestionIdsAsync(
            attempt.ExerciseId,
            cancellationToken);
        var answers = await _repository.GetAnswersAsync(
            attemptId,
            cancellationToken);

        if (questionIds.Count == 0 ||
            answers.Count != questionIds.Count ||
            questionIds.Except(answers.Select(answer => answer.QuestionId)).Any() ||
            answers.Any(answer =>
                string.IsNullOrWhiteSpace(answer.Transcript) ||
                string.IsNullOrWhiteSpace(answer.AudioUrl)))
        {
            throw new ArgumentException(
                "Hãy ghi âm và lưu transcript cho tất cả câu hỏi trước khi nộp.");
        }

        attempt.Status = Submitted;
        attempt.CompletedAt = DateTime.UtcNow;
        await _repository.SaveAttemptAsync(attempt, cancellationToken);
    }

    public async Task<SpeakingAttemptStatusDto?> GetAttemptAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        var attempt = await _repository.GetOwnedAttemptAsync(
            userId,
            attemptId,
            includeAnswers: true,
            cancellationToken: cancellationToken);

        if (attempt is null)
            return null;

        SpeakingGradingResultDto? result = null;
        if (attempt.GradingResult is not null)
        {
            result = JsonSerializer.Deserialize<SpeakingGradingResultDto>(
                attempt.GradingResult,
                JsonOptions);

            if (result is not null)
            {
                result.OverallScore = attempt.OverallScore ?? result.OverallScore;
                result.Criteria ??= [];
                result.AnswerFeedback ??= [];
                result.Criteria = (await _repository.GetCriterionScoresAsync(
                    attemptId,
                    cancellationToken))
                    .Select(score => new SpeakingCriterionResultDto
                    {
                        CriterionCode = score.CriterionCode,
                        Score = score.Score,
                        Feedback = score.Feedback ?? "",
                        Strengths = score.Strengths ?? "",
                        Weaknesses = score.Weaknesses ?? "",
                        Suggestions = score.Suggestions ?? "",
                        Issues = JsonSerializer.Deserialize<List<SpeakingIssueDto>>(
                            score.Issues,
                            JsonOptions) ?? []
                    })
                    .ToList();
            }
        }

        return new SpeakingAttemptStatusDto
        {
            AttemptId = attempt.Id,
            ExerciseId = attempt.ExerciseId,
            Status = attempt.Status,
            OverallScore = attempt.OverallScore,
            CompletedAt = attempt.CompletedAt,
            Result = result,
            Answers = attempt.UserSpeakingAnswers
                .OrderBy(answer => answer.Question.QuestionNumber)
                .Select(answer => new SpeakingAnswerResultDto
                {
                    QuestionId = answer.QuestionId,
                    Question = answer.Question.QuestionText,
                    Transcript = answer.Transcript ?? ""
                })
                .ToList()
        };
    }

    public async Task RetryGradingAsync(
        int userId,
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        var attempt = await _repository.GetOwnedAttemptAsync(
            userId,
            attemptId,
            cancellationToken: cancellationToken);

        if (attempt is null)
            throw new KeyNotFoundException("Không tìm thấy lượt làm Speaking.");
        if (attempt.Status != GradingFailed && attempt.Status != Graded)
            throw new InvalidOperationException(
                "Chỉ có thể chấm lại lượt bị lỗi hoặc đã có kết quả.");

        attempt.Status = Submitted;
        await _repository.SaveAttemptAsync(attempt, cancellationToken);
    }

    public async Task<IReadOnlyList<int>> GetUnfinishedAttemptIdsAsync(
        CancellationToken cancellationToken = default)
    {
        return await _repository.GetUnfinishedAttemptIdsAsync(cancellationToken);
    }

    public async Task ProcessGradingAsync(
        int attemptId,
        CancellationToken cancellationToken = default)
    {
        var attempt = await _repository.GetAttemptForGradingAsync(
            attemptId,
            cancellationToken);

        if (attempt is null ||
            attempt.Status == Graded ||
            (attempt.Status != Submitted && attempt.Status != Grading))
        {
            return;
        }

        attempt.Status = Grading;
        await _repository.SaveAttemptAsync(attempt, cancellationToken);

        try
        {
            var orderedAnswers = attempt.UserSpeakingAnswers
                .OrderBy(answer => answer.Question.QuestionNumber)
                .ToList();

            if (orderedAnswers.Count != attempt.Exercise.Questions.Count ||
                orderedAnswers.Any(answer =>
                    string.IsNullOrWhiteSpace(answer.Transcript)))
            {
                throw new InvalidOperationException(
                    "Lượt làm thiếu câu trả lời hoặc transcript.");
            }

            var gradingInputs = new List<SpeakingGradingInputDto>();
            long totalAudioBytes = 0;
            foreach (var answer in orderedAnswers)
            {
                var audioPath = ResolveStoredAudio(answer.AudioUrl);
                var fileInfo = new FileInfo(audioPath);
                if (!fileInfo.Exists || fileInfo.Length == 0)
                    throw new InvalidOperationException(
                        "Không tìm thấy file ghi âm của một câu trả lời.");

                totalAudioBytes += fileInfo.Length;
                if (totalAudioBytes > MaxAttemptAudioBytes)
                    throw new InvalidOperationException(
                        "Tổng dung lượng ghi âm của lượt làm vượt quá 20 MB.");

                gradingInputs.Add(new SpeakingGradingInputDto
                {
                    QuestionId = answer.QuestionId,
                    QuestionNumber = answer.Question.QuestionNumber,
                    QuestionText = answer.Question.QuestionText,
                    Transcript = answer.Transcript!,
                    MimeType = "audio/wav",
                    AudioData = await File.ReadAllBytesAsync(
                        audioPath,
                        cancellationToken)
                });
            }

            var aiResult = await _llm.GradeAsync(
                gradingInputs,
                cancellationToken);
            ValidateResult(aiResult, orderedAnswers.Select(item => item.QuestionId));

            var overallScore = aiResult.OverallScore;

            var result = new SpeakingGradingResultDto
            {
                OverallScore = overallScore,
                OverallFeedback = aiResult.OverallFeedback.Trim(),
                Criteria = aiResult.Criteria,
                AnswerFeedback = aiResult.AnswerFeedback
            };

            var scores = aiResult.Criteria.Select(item =>
                new SpeakingCriterionScore
                {
                    AttemptId = attempt.Id,
                    CriterionCode = item.CriterionCode,
                    Score = item.Score,
                    Feedback = item.Feedback,
                    Strengths = item.Strengths,
                    Weaknesses = item.Weaknesses,
                    Suggestions = item.Suggestions,
                    Issues = JsonSerializer.Serialize(item.Issues)
                }).ToList();

            attempt.OverallScore = overallScore;
            await _repository.SaveGradingResultAsync(
                attempt,
                scores,
                JsonSerializer.Serialize(result),
                cancellationToken);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch
        {
            attempt.Status = GradingFailed;
            await _repository.SaveAttemptAsync(attempt, CancellationToken.None);
            throw;
        }
    }

    private static void ValidateResult(
        GeminiSpeakingGradingResultDto result,
        IEnumerable<int> questionIds)
    {
        if (result.Criteria is null || result.AnswerFeedback is null)
            throw new InvalidOperationException(
                "Gemini trả về kết quả Speaking thiếu danh sách.");
        if (result.Criteria.Any(item => item is null) ||
            result.AnswerFeedback.Any(item => item is null))
        {
            throw new InvalidOperationException(
                "Gemini trả về tiêu chí hoặc nhận xét rỗng.");
        }

        if (string.IsNullOrWhiteSpace(result.OverallFeedback))
            throw new InvalidOperationException(
                "Gemini không trả về nhận xét tổng thể.");
        if (result.OverallScore < 0 ||
            result.OverallScore > 9 ||
            result.OverallScore * 2 !=
                decimal.Truncate(result.OverallScore * 2))
        {
            throw new InvalidOperationException(
                "Gemini trả về điểm Speaking tổng thể không hợp lệ.");
        }

        if (result.Criteria.Count != CriterionCodes.Length ||
            result.Criteria.Select(item => item.CriterionCode)
                .Distinct(StringComparer.Ordinal)
                .Count() != CriterionCodes.Length ||
            CriterionCodes.Except(
                result.Criteria.Select(item => item.CriterionCode),
                StringComparer.Ordinal).Any())
        {
            throw new InvalidOperationException(
                "Gemini trả về thiếu hoặc trùng tiêu chí Speaking.");
        }

        foreach (var criterion in result.Criteria)
        {
            if (criterion.Score < 0 ||
                criterion.Score > 9 ||
                criterion.Score * 2 != decimal.Truncate(criterion.Score * 2) ||
                string.IsNullOrWhiteSpace(criterion.Feedback) ||
                string.IsNullOrWhiteSpace(criterion.Strengths) ||
                string.IsNullOrWhiteSpace(criterion.Weaknesses) ||
                string.IsNullOrWhiteSpace(criterion.Suggestions) ||
                criterion.Issues is null ||
                criterion.Issues.Count > 3 ||
                criterion.Issues.Any(issue =>
                    issue is null ||
                    string.IsNullOrWhiteSpace(issue.OriginalText) ||
                    string.IsNullOrWhiteSpace(issue.Correction) ||
                    string.IsNullOrWhiteSpace(issue.Explanation) ||
                    string.IsNullOrWhiteSpace(issue.Category)))
            {
                throw new InvalidOperationException(
                    "Gemini trả về điểm hoặc nhận xét tiêu chí không hợp lệ.");
            }
        }

        var expectedOverallScore = (decimal)(
            Math.Round(
                (double)result.Criteria.Average(item => item.Score) * 2,
                MidpointRounding.AwayFromZero) / 2);
        if (result.OverallScore != expectedOverallScore)
        {
            throw new InvalidOperationException(
                "Điểm Speaking tổng thể không khớp với điểm các tiêu chí.");
        }

        var expectedQuestionIds = questionIds.ToHashSet();
        if (result.AnswerFeedback.Count != expectedQuestionIds.Count ||
            result.AnswerFeedback.Select(item => item.QuestionId)
                .Distinct()
                .Count() != expectedQuestionIds.Count ||
            !expectedQuestionIds.SetEquals(
                result.AnswerFeedback.Select(item => item.QuestionId)) ||
            result.AnswerFeedback.Any(item =>
                string.IsNullOrWhiteSpace(item.Feedback)))
        {
            throw new InvalidOperationException(
                "Gemini trả về nhận xét câu trả lời không đầy đủ.");
        }
    }

    private string ResolveStoredAudio(string relativePath)
    {
        var fullPath = Path.GetFullPath(
            Path.Combine(_audioStoragePath, relativePath.Replace('/', Path.DirectorySeparatorChar)));

        if (!fullPath.StartsWith(
                _audioStoragePath + Path.DirectorySeparatorChar,
                StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException(
                "Đường dẫn file ghi âm không hợp lệ.");
        }

        return fullPath;
    }

    private void DeleteStoredAudio(string relativePath)
    {
        try
        {
            var fullPath = ResolveStoredAudio(relativePath);
            if (File.Exists(fullPath))
                File.Delete(fullPath);
        }
        catch (Exception exception) when (
            exception is IOException or
            UnauthorizedAccessException or
            InvalidOperationException)
        {
            _logger.LogWarning(
                exception,
                "Could not remove obsolete Speaking audio file.");
        }
    }
}
