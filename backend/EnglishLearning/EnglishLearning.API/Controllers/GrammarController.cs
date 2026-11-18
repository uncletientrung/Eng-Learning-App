using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/grammar")]
public class GrammarController : ControllerBase
{
    private readonly IGrammarService _service;

    public GrammarController(IGrammarService service)
    {
        _service = service;
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _service.GetAllCategoryAsync();

        if (categories == null)
            return NotFound();

        return Ok(categories);
    }

    [HttpGet("categories/{id:int}/topics")]
    public async Task<IActionResult> GetTopicsByCategory(int id)
    {
        if (id <= 0)
            return BadRequest();

        var topics = await _service.GetTopicByCategoryAsync(id);
        return Ok(topics);
    }

    [HttpGet("categories/{categoryId:int}/sections")]
    public async Task<IActionResult> GetSectionsByCategory(int categoryId)
    {
        if (categoryId <= 0)
            return BadRequest();

        var sections = await _service.GetSectionsByCategoryAsync(categoryId);
        return Ok(sections);
    }
}