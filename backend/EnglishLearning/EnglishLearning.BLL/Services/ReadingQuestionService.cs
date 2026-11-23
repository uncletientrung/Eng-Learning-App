using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class ReadingQuestionService : iReadingQuestionService
{
    private readonly IReadingQuestionRepository _readingQuestionRepository;

    public ReadingQuestionService(IReadingQuestionRepository readingQuestionRepository)
    {
        _readingQuestionRepository = readingQuestionRepository;
    }

    public async Task<List<ReadingQuestionDTO>> GetAllAsync(int id)
    {
        var result = await _readingQuestionRepository.getAllAsync(id);
        return result.Select(e => new ReadingQuestionDTO
        {
            Id = e.Id,
            QuestionNumber = e.QuestionNumber,
            QuestionType = e.QuestionType,
            QuestionText = e.QuestionText,
            Explanation = e.Explanation,
            ExerciseId = e.ExerciseId,
            ReadingQuestionOptions = e.ReadingQuestionOptions.Select(a => new ReadingQuestionOptionDTO
            {
                Id = a.Id,
                IsCorrect = a.IsCorrect,
                OptionKey = a.OptionKey,
                OptionText = a.OptionText,
                QuestionId = a.QuestionId,
            }).ToList(),
            FillinBlanksAnswers = e.FillinBlanksAnswers.Select(a => new ReadingFillinBlankDTO
            {
                BlankNumber = a.BlankNumber,
                CorrectAnswer = a.CorrectAnswer
            }).ToList()
        }).ToList();
    }

    public async Task<ReadingQuestionDTO> GetByIdAsync(int id, int exerciseId)
    {
        var result = await _readingQuestionRepository.getbyIdAsync(id, exerciseId);
        return new ReadingQuestionDTO
        {
            Id = result.Id,
            QuestionNumber = result.QuestionNumber,
            QuestionType = result.QuestionType,
            QuestionText = result.QuestionText,
            Explanation = result.Explanation,
            ExerciseId = result.ExerciseId,
            ReadingQuestionOptions = result.ReadingQuestionOptions.Select(a => new ReadingQuestionOptionDTO
            {
                Id = a.Id,
                IsCorrect = a.IsCorrect,
                OptionKey = a.OptionKey,
                OptionText = a.OptionText,
                QuestionId = a.QuestionId,
            }).ToList(),
            FillinBlanksAnswers = result.FillinBlanksAnswers.Select(a => new ReadingFillinBlankDTO
            {
                BlankNumber = a.BlankNumber,
                CorrectAnswer = a.CorrectAnswer
            }).ToList()
        };

    }

    public async Task<ReadingQuestionDTO> AddAsync(int exerciseId, ReadingQuestionDTO readingQuestionDTO)
    {
        var question = new ReadingQuestion
        {
            Id = readingQuestionDTO.Id,
            QuestionNumber = readingQuestionDTO.QuestionNumber,
            QuestionType = readingQuestionDTO.QuestionType,
            QuestionText = readingQuestionDTO.QuestionText,
            Explanation = readingQuestionDTO.Explanation,
            ExerciseId = exerciseId,
        };
        if (readingQuestionDTO.QuestionType == "Fill-in-Blank")
        {
            if (readingQuestionDTO.FillinBlanksAnswers == null ||
                readingQuestionDTO.FillinBlanksAnswers.Count == 0)
            {
                throw new ArgumentException(
                    "Fill-in-Blank requires at least one answer.");
            }

            foreach (var answer in readingQuestionDTO.FillinBlanksAnswers)
            {
                question.FillinBlanksAnswers.Add(new ReadingFillBlankAnswer
                {
                    BlankNumber = answer.BlankNumber,
                    CorrectAnswer = answer.CorrectAnswer,
                });
            }

        }

        await _readingQuestionRepository.AddAsync(question);
        return new ReadingQuestionDTO
        {
            Id = question.Id,
            ExerciseId = question.ExerciseId,
            QuestionNumber = question.QuestionNumber,
            QuestionType = question.QuestionType,
            QuestionText = question.QuestionText,
            Explanation = question.Explanation,
            FillinBlanksAnswers = question.FillinBlanksAnswers.Select(e => new ReadingFillinBlankDTO
            {
                BlankNumber = e.BlankNumber,
                CorrectAnswer = e.CorrectAnswer
            }).ToList()
        };
    }

    public async Task<ReadingQuestionDTO> UpdateAsync(int exerciseId, ReadingQuestionDTO readingQuestionDTO)
    {
        var test = new ReadingQuestion
        {
            Id = readingQuestionDTO.Id,
            QuestionNumber = readingQuestionDTO.QuestionNumber,
            QuestionType = readingQuestionDTO.QuestionType,
            QuestionText = readingQuestionDTO.QuestionText,
            Explanation = readingQuestionDTO.Explanation,
            ExerciseId = exerciseId,
        };
        if (readingQuestionDTO.QuestionType == "Fill-in-Blank")
        {
            if (readingQuestionDTO.FillinBlanksAnswers == null ||
                readingQuestionDTO.FillinBlanksAnswers.Count == 0)
            {
                throw new ArgumentException(
                    "Fill-in-Blank requires at least one answer.");
            }

            foreach (var answer in readingQuestionDTO.FillinBlanksAnswers)
            {
                test.FillinBlanksAnswers.Add(new ReadingFillBlankAnswer
                {
                    BlankNumber = answer.BlankNumber,
                    CorrectAnswer = answer.CorrectAnswer,
                });
            }
        }

        var question = await _readingQuestionRepository.UpdateAsync(exerciseId, test);

        return new ReadingQuestionDTO
        {
            Id = question.Id,
            ExerciseId = question.ExerciseId,
            QuestionNumber = question.QuestionNumber,
            QuestionType = question.QuestionType,
            QuestionText = question.QuestionText,
            Explanation = question.Explanation,
            FillinBlanksAnswers = question.FillinBlanksAnswers.Select(e => new ReadingFillinBlankDTO
            {
                BlankNumber = e.BlankNumber,
                CorrectAnswer = e.CorrectAnswer
            }).ToList()
        };
    }

    public async Task<ReadingQuestionDTO> DeleteAsync(int questionId)
    {
        var question = await _readingQuestionRepository.DeleteAsync(questionId);
        if (question == null)
        {
            return null;
        }
        return new ReadingQuestionDTO
        {
            Id = question.Id,
            ExerciseId = question.ExerciseId,
            QuestionNumber = question.QuestionNumber,
            QuestionType = question.QuestionType,
            QuestionText = question.QuestionText,
            Explanation = question.Explanation,
            FillinBlanksAnswers = question.FillinBlanksAnswers.Select(e => new ReadingFillinBlankDTO
            {
                BlankNumber = e.BlankNumber,
                CorrectAnswer = e.CorrectAnswer
            }).ToList()
        };
    }
}