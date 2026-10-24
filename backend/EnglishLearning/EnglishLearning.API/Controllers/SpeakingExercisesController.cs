using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/speaking-exercises")]
public class SpeakingExercisesController : ControllerBase
{
    private readonly ISpeakingExerciseService _service;

    public SpeakingExercisesController(
        ISpeakingExerciseService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var exercises = await _service.GetAllAsync();

        return Ok(exercises);
    }

    [HttpGet("with-questions")]
    public async Task<IActionResult> GetAllWithQuestions()
    {
        var exercises = await _service.GetAllWithQuestionsAsync();

        return Ok(exercises);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var exercise = await _service.GetByIdAsync(id);

        if (exercise == null)
        {
            return NotFound();
        }

        return Ok(exercise);
    }
}