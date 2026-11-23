using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/reading-questions/{questionId:int}/reading-fill-blank")]
public class ReadingFillBlankController : ControllerBase
{
    private readonly IReadingFillBlankService _readingFillBlankService;

    public ReadingFillBlankController(
        IReadingFillBlankService readingFillBlankService)
    {
        _readingFillBlankService = readingFillBlankService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int questionId)
    {
        var result = await _readingFillBlankService.GetAllAsync(questionId);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _readingFillBlankService.GetById(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Add(
        [FromBody] ReadingFillBlankAnswerDTO readingFillBlankAnswerDTO)
    {
        var result = await _readingFillBlankService.AddAsync(
            readingFillBlankAnswerDTO);

        return CreatedAtAction(
            nameof(GetById),
            new { id = result.Id },
            result
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] ReadingFillBlankAnswerDTO readingFillBlankAnswerDTO)
    {
        var result = await _readingFillBlankService.UpdateAsync(
            id, readingFillBlankAnswerDTO);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _readingFillBlankService.DeleteAsync(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }
}