using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class ReadingFillBlankService : IReadingFillBlankService
{
    private readonly IReadingFillBlankRepository _readingFillBlankRepository;

    public ReadingFillBlankService(
        IReadingFillBlankRepository readingFillBlankRepository)
    {
        _readingFillBlankRepository = readingFillBlankRepository;
    }

    public async Task<List<ReadingFillBlankAnswerDTO>> GetAllAsync(int questionId)
    {
        var result = await _readingFillBlankRepository.GetAllAsync(questionId);

        return result.Select(e => new ReadingFillBlankAnswerDTO
        {
            Id = e.Id,
            QuestionId = e.QuestionId,
            BlankNumber = e.BlankNumber,
            CorrectAnswer = e.CorrectAnswer
        }).ToList();
    }

    public async Task<ReadingFillBlankAnswerDTO?> GetById(int id)
    {
        var result = await _readingFillBlankRepository.GetById(id);

        if (result == null)
            return null;

        return new ReadingFillBlankAnswerDTO
        {
            Id = result.Id,
            QuestionId = result.QuestionId,
            BlankNumber = result.BlankNumber,
            CorrectAnswer = result.CorrectAnswer
        };
    }

    public async Task<ReadingFillBlankAnswerDTO> AddAsync(
        ReadingFillBlankAnswerDTO readingFillBlankAnswerDTO)
    {
        var answer = new ReadingFillBlankAnswer
        {
            QuestionId = readingFillBlankAnswerDTO.QuestionId,
            BlankNumber = readingFillBlankAnswerDTO.BlankNumber,
            CorrectAnswer = readingFillBlankAnswerDTO.CorrectAnswer
        };

        var result = await _readingFillBlankRepository.AddAsync(answer);

        return new ReadingFillBlankAnswerDTO
        {
            Id = result.Id,
            QuestionId = result.QuestionId,
            BlankNumber = result.BlankNumber,
            CorrectAnswer = result.CorrectAnswer
        };
    }

    public async Task<ReadingFillBlankAnswerDTO?> UpdateAsync(
        int id,
        ReadingFillBlankAnswerDTO readingFillBlankAnswerDTO)
    {
        var answer = new ReadingFillBlankAnswer
        {
            BlankNumber = readingFillBlankAnswerDTO.BlankNumber,
            CorrectAnswer = readingFillBlankAnswerDTO.CorrectAnswer
        };

        var result = await _readingFillBlankRepository.UpdateAsync(id, answer);

        if (result == null)
            return null;

        return new ReadingFillBlankAnswerDTO
        {
            Id = result.Id,
            QuestionId = result.QuestionId,
            BlankNumber = result.BlankNumber,
            CorrectAnswer = result.CorrectAnswer
        };
    }

    public async Task<ReadingFillBlankAnswerDTO?> DeleteAsync(int id)
    {
        var result = await _readingFillBlankRepository.DeleteAsync(id);

        if (result == null)
            return null;

        return new ReadingFillBlankAnswerDTO
        {
            Id = result.Id,
            QuestionId = result.QuestionId,
            BlankNumber = result.BlankNumber,
            CorrectAnswer = result.CorrectAnswer
        };
    }
}