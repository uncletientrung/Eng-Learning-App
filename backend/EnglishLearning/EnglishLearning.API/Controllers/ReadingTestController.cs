using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;
[ApiController]
[Route("api/reading-tests")]
public class ReadingTestController : ControllerBase
{
    public readonly IReadingTestService _readingTestService;
    public ReadingTestController(IReadingTestService readingTestService)
    {
        _readingTestService = readingTestService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await _readingTestService.GetAllAsync();
        return Ok(results);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var results = await _readingTestService.GetByIdAsync(id);
        return Ok(results);
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] ReadingTestDTO request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _readingTestService.AddAsync(request);
        return Created("", result);
    }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateAsync( int id, [FromBody] ReadingTestDTO request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _readingTestService.UpdateAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var result = await _readingTestService.DeleteAsync(id);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
}
