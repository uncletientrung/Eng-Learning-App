using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/topics")]
public class TopicsController : ControllerBase
{
    private readonly ITopicService _topicService;

    public TopicsController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    // GET: /api/topics
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var topics = await _topicService.GetAllAsync();

        return Ok(topics);
    }

    // GET: /api/topics/module/WRITING
    [HttpGet("module/{moduleType}")]
    public async Task<IActionResult> GetByModuleType(string moduleType)
    {
        if (string.IsNullOrWhiteSpace(moduleType))
        {
            return BadRequest(new
            {
                message = "ModuleType không được để trống."
            });
        }

        var topics = await _topicService
            .GetByModuleTypeAsync(moduleType);

        return Ok(topics);
    }
}