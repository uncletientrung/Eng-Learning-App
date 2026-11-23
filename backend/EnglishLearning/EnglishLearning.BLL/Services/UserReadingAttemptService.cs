using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.Repositories;

namespace EnglishLearning.BLL.Services;

public class UserReadingAttemptService : IUserReadingAttemptService
{
    private readonly IUserReadingAttemptRepository _userReadingAttemptRepository;

    public UserReadingAttemptService(IUserReadingAttemptRepository userReadingAttemptRepository)
    {
        _userReadingAttemptRepository = userReadingAttemptRepository;
    }

    public async Task<List<UserReadingAttemptDTO>> GetAllAsync()
    {
        var result = await _userReadingAttemptRepository.GetAllAsync();
        return result.Select(e => new UserReadingAttemptDTO
            
        {
            Id = e.Id,
            UserId = e.UserId,
            TestId = e.TestId,
            Score = e.Score,
            StartedAt = e.StartedAt,
            CompletedAt = e.CompletedAt,
            TotalQuestions = e.TotalQuestions,
            CorrectAnswersNum = e.CorrectAnswersNum,
            UserReadingAnswers = e.UserReadingAnswers.Select(a =>
            {
                var correctOption = a.Question
                    .ReadingQuestionOptions
                    .FirstOrDefault(o => o.IsCorrect);
                return new UserReadingAnswerReviewDTO
                {
                    Id = a.Id,
                    AttemptId = a.AttemptId,
                    QuestionId = a.QuestionId,

                    UserAnswer = a.UserAnswer,
                    IsCorrect = a.IsCorrect,

                    QuestionNumber = a.Question.QuestionNumber,
                    QuestionText = a.Question.QuestionText,
                    QuestionType = a.Question.QuestionType,
                    Explanation = a.Question.Explanation,
                    CorrectAnswer = correctOption?.OptionText ?? "",
                    ReadingFillBlankAnswerDtos = a.Question.FillinBlanksAnswers.Select(f => new ReadingFillBlankAnswerDTO
                    {
                        Id = f.Id,
                        BlankNumber = f.BlankNumber,
                        CorrectAnswer = f.CorrectAnswer,
                        QuestionId = f.QuestionId
                    }).ToList()
                };
            }).ToList()

        }).ToList();
    }

    public async Task<List<UserReadingAttemptDTO>> GetByUserID(int userId)
    {
        var result = await _userReadingAttemptRepository.GetByUserID(userId);
        return result.Select(e => new UserReadingAttemptDTO
        {
            Id = e.Id,
            UserId = e.UserId,
            TestId = e.TestId,
            Score = e.Score,
            StartedAt = e.StartedAt,
            CompletedAt = e.CompletedAt,
            TotalQuestions = e.TotalQuestions,
            CorrectAnswersNum = e.CorrectAnswersNum,
            UserReadingAnswers = e.UserReadingAnswers.Select(a =>
            {
                var correctOption = a.Question
                    .ReadingQuestionOptions
                    .FirstOrDefault(o => o.IsCorrect);
               
                return new UserReadingAnswerReviewDTO
                {
                    Id = a.Id,
                    AttemptId = a.AttemptId,
                    QuestionId = a.QuestionId,

                    UserAnswer = a.UserAnswer,
                    IsCorrect = a.IsCorrect,

                    QuestionNumber = a.Question.QuestionNumber,
                    QuestionText = a.Question.QuestionText,
                    QuestionType = a.Question.QuestionType,
                    Explanation = a.Question.Explanation,
                    CorrectAnswer = correctOption?.OptionText ?? "",
                    ReadingFillBlankAnswerDtos = a.Question.FillinBlanksAnswers.Select(f => new ReadingFillBlankAnswerDTO
                    {
                        Id = f.Id,
                        BlankNumber = f.BlankNumber,
                        CorrectAnswer = f.CorrectAnswer,
                        QuestionId = f.QuestionId
                    }).ToList()
                };
            }).ToList()

        }).ToList();
    }
    public async Task<UserReadingAttemptDTO> GetByIdAsync(int id)
    {
        var result = await _userReadingAttemptRepository.GetByIdAsync(id);
        return new UserReadingAttemptDTO
        {
            Id = result.Id,
            UserId = result.UserId,
            TestId = result.TestId,
            Score = result.Score,
            StartedAt = result.StartedAt,
            CompletedAt = result.CompletedAt,
            TotalQuestions = result.TotalQuestions,
            CorrectAnswersNum = result.CorrectAnswersNum,
            UserReadingAnswers = result.UserReadingAnswers.Select(a =>
            {
                var correctOption = a.Question
                    .ReadingQuestionOptions
                    .FirstOrDefault(o => o.IsCorrect);
                return new UserReadingAnswerReviewDTO
                {
                    Id = a.Id,
                    AttemptId = a.AttemptId,
                    QuestionId = a.QuestionId,

                    UserAnswer = a.UserAnswer,
                    IsCorrect = a.IsCorrect,

                    QuestionNumber = a.Question.QuestionNumber,
                    QuestionText = a.Question.QuestionText,
                    QuestionType = a.Question.QuestionType,
                    Explanation = a.Question.Explanation,
                    CorrectAnswer = correctOption?.OptionText ?? "",
                    ReadingFillBlankAnswerDtos = a.Question.FillinBlanksAnswers.Select(f => new ReadingFillBlankAnswerDTO
                    {
                    Id = f.Id,
                    BlankNumber = f.BlankNumber,
                    CorrectAnswer = f.CorrectAnswer,
                    QuestionId = f.QuestionId
                 }).ToList()
                };
            }).ToList()
        };
    }


        public async Task<UserReadingAttemptDTO> AddAsync(UserReadingAttemptDTO dto)
        {
            var result = new UserReadingAttempt
            {
                Id = dto.Id,
                UserId = dto.UserId,
                TestId = dto.TestId,
                Score = dto.Score,
                StartedAt = dto.StartedAt,
                CompletedAt = dto.CompletedAt,
                TotalQuestions = dto.TotalQuestions,
                CorrectAnswersNum = dto.CorrectAnswersNum,
                UserReadingAnswers = dto.UserReadingAnswers.Select(a =>
                    new UserReadingAnswer
                    {
                        QuestionId = a.QuestionId,
                        UserAnswer = a.UserAnswer,
                        IsCorrect = a.IsCorrect,
                    }
                ).ToList()

            };
            var test = await _userReadingAttemptRepository.AddAsync(result);
            return new UserReadingAttemptDTO
            {
                Id = test.Id,
                UserId = test.UserId,
                TestId = test.TestId,
                Score = test.Score,
                StartedAt = test.StartedAt,
                CompletedAt = test.CompletedAt,
                TotalQuestions = test.TotalQuestions,
                CorrectAnswersNum = test.CorrectAnswersNum,
                
            };
            
        }

        public async Task<UserReadingAttemptDTO> DeleteAsync(int id)
        {
            var result = await _userReadingAttemptRepository.DeleteAsync(id);
            return new UserReadingAttemptDTO
            {
                Id = result.Id,
                UserId = result.UserId,
                TestId = result.TestId,
                Score = result.Score,
                StartedAt = result.StartedAt,
                CompletedAt = result.CompletedAt,
                TotalQuestions = result.TotalQuestions,
                CorrectAnswersNum = result.CorrectAnswersNum,
               
            };
        }
}