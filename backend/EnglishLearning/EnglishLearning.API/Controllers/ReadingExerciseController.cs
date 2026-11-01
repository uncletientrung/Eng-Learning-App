using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/reading-tests/{id}/reading-exercises")]
public class ReadingExerciseController : ControllerBase
{
    public readonly IReadingExerciseService _readingExerciseService;

    public ReadingExerciseController(IReadingExerciseService readingExerciseService)
    {
        _readingExerciseService = readingExerciseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await _readingExerciseService.GetAllAsync();
        return Ok(results);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var results = await _readingExerciseService.GetByIdAsync(id);
        return Ok(results);
    }

}