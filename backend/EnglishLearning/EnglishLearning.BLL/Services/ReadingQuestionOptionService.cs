using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class ReadingQuestionOptionService:IReadingQuestionOptionService
{
    private readonly IReadingQuestionOptionRepository _readingQuestionOptionRepository;

    public ReadingQuestionOptionService(IReadingQuestionOptionRepository readingQuestionOptionRepository)
    {
        _readingQuestionOptionRepository = readingQuestionOptionRepository;
    }

    public async Task<List<ReadingQuestionOptionDTO>> GetAllAsync(int questionid)
    {
        var result = await _readingQuestionOptionRepository.GetAllAsync(questionid);
        return result.Select(e => new ReadingQuestionOptionDTO
        {
            Id = e.Id,
            OptionKey = e.OptionKey,
            OptionText = e.OptionText,
            IsCorrect =  e.IsCorrect,
            QuestionId = e.QuestionId,
        }).ToList();
    }

    public async Task<ReadingQuestionOptionDTO> GetById(int optionid)
    {
        var result = await _readingQuestionOptionRepository.GetById(optionid);
        return new ReadingQuestionOptionDTO
        {
            Id = result.Id,
            OptionKey = result.OptionKey,
            OptionText = result.OptionText,
            IsCorrect = result.IsCorrect,
            QuestionId = result.QuestionId,
        };
    }

    public async Task<ReadingQuestionOptionDTO> AddAsync(ReadingQuestionOptionDTO readingQuestionOptionDTO)
    {
        var result = new ReadingQuestionOption
        {
            Id = readingQuestionOptionDTO.Id,
            OptionKey = readingQuestionOptionDTO.OptionKey,
            OptionText = readingQuestionOptionDTO.OptionText,
            IsCorrect = readingQuestionOptionDTO.IsCorrect,
            QuestionId = readingQuestionOptionDTO.QuestionId,
        };
        var test = await _readingQuestionOptionRepository.AddAsync(result);
        return new ReadingQuestionOptionDTO
        {
            Id = test.Id,
            OptionKey = test.OptionKey,
            OptionText = test.OptionText,
            IsCorrect = test.IsCorrect,
            QuestionId = test.QuestionId,
        };
    }

    public async Task<ReadingQuestionOptionDTO> UpdateAsync(int optionid, ReadingQuestionOptionDTO readingQuestionOptionDTO)
    {
        var test = new ReadingQuestionOption
        {
            OptionKey = readingQuestionOptionDTO.OptionKey,
            OptionText = readingQuestionOptionDTO.OptionText,
            IsCorrect = readingQuestionOptionDTO.IsCorrect
        };
        var result = await _readingQuestionOptionRepository.UpdateAsync(optionid, test);
        
        return new ReadingQuestionOptionDTO
        {
            Id = result.Id,
            OptionKey = result.OptionKey,
            OptionText = result.OptionText,
            IsCorrect = result.IsCorrect,
            QuestionId = result.QuestionId,
        };

    }

    public async Task<ReadingQuestionOptionDTO> DeleteAsync(int optionid)
    {
        var result = await _readingQuestionOptionRepository.DeleteAsync(optionid);
        return new ReadingQuestionOptionDTO
        {
            Id = result.Id,
            OptionKey = result.OptionKey,
            OptionText = result.OptionText,
            IsCorrect = result.IsCorrect,
            QuestionId = result.QuestionId,
        };
    }

}