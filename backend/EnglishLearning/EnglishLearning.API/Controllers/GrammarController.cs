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
}