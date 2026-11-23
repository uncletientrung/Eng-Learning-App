using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/reading-tests/{testid}/reading-exercises")]
public class ReadingExerciseController : ControllerBase
{
    public readonly IReadingExerciseService _readingExerciseService;

    public ReadingExerciseController(IReadingExerciseService readingExerciseService)
    {
        _readingExerciseService = readingExerciseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int testid)
    {
        var results = await _readingExerciseService.GetAllAsync(testid);
        return Ok(results);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById( int id)
    {
        var results = await _readingExerciseService.GetByIdAsync(id);
        return Ok(results);
    }

    [HttpPost()]
    public async Task<IActionResult> AddAsync([FromBody] ReadingExerciseDTO readingExercise)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _readingExerciseService.AddAsync(readingExercise);
        return Created("", result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateAsync(int id, [FromBody] ReadingExerciseDTO readingExercise)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _readingExerciseService.UpdateAsync(id, readingExercise);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var result = await _readingExerciseService.DeleteAsync(id);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
}
