using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/writing-exercises")]
public class WritingExercisesController : ControllerBase
{
    private readonly IWritingExerciseService _service;

    public WritingExercisesController(IWritingExerciseService service)

    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var exercises = await _service.GetAllAsync();
        return Ok(exercises); // Trả về HTTP 200 OK
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var exercise = await _service.GetByIdAsync(id);

        if (exercise == null)
            return NotFound();

        return Ok(exercise);
    }
}