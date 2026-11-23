using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("/api/users/{userid}/reading-attempts")]
public class UserReadingAttemptController : ControllerBase
{
    private readonly IUserReadingAttemptService _userReadingAttemptService;

    public UserReadingAttemptController(IUserReadingAttemptService userReadingAttemptService)
    {
        _userReadingAttemptService = userReadingAttemptService;
    }

    [HttpGet("/api/reading-attempts")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _userReadingAttemptService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetByUserID(int userId)
    {
        var result = await _userReadingAttemptService.GetByUserID(userId);
        return Ok(result);
    }
    [HttpGet("{attemptid:int}")]
    public async Task<IActionResult> GetById(int attemptid)
    {
        var result = await _userReadingAttemptService.GetByIdAsync(attemptid);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] UserReadingAttemptDTO userReadingAttemptDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }
        var result = await _userReadingAttemptService.AddAsync(userReadingAttemptDTO);
        return Ok(result);
    }

    [HttpDelete("{testid}")]
    public async Task<IActionResult> DeleteAsync(int testid)
    {
        var result = await _userReadingAttemptService.DeleteAsync(testid);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }

}