using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/reading-questions/{questionId}/reading-question-options")]
public class ReadingQuestionOptionController: ControllerBase
{
    private readonly IReadingQuestionOptionService _readingQuestionOptionService;

    public ReadingQuestionOptionController(IReadingQuestionOptionService readingQuestionOptionService)
    {
        _readingQuestionOptionService = readingQuestionOptionService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllAsync(int questionId)
    {
        var result = await _readingQuestionOptionService.GetAllAsync(questionId);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int optionid)
    {
        var result = await _readingQuestionOptionService.GetById(optionid);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] List<ReadingQuestionOptionDTO> readingQuestionOptionDTO)
    {
        foreach (var item in readingQuestionOptionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _readingQuestionOptionService.AddAsync(item);
        }

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsync(int optionid,
        [FromBody] List<ReadingQuestionOptionDTO> readingQuestionOptionDTO)
    {
        foreach (var item in readingQuestionOptionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _readingQuestionOptionService.UpdateAsync(optionid, item);
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int optionid)
    {
        var result = await _readingQuestionOptionService.DeleteAsync(optionid);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
}