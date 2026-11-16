using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Authorize(Roles = "ADMIN")]
[Route("api/admin/vocabulary/sets")]
public sealed class AdminVocabularyController(IAdminVocabularyService service) : ControllerBase
{
    [HttpGet]
    public Task<IActionResult> GetSets([FromQuery] AdminVocabularyQuery query, CancellationToken ct) =>
        ExecuteAsync(async () => Ok(await service.GetSetsAsync(query, ct)));

    [HttpGet("{id:int}")]
    public Task<IActionResult> GetSet(int id, CancellationToken ct) =>
        ExecuteAsync(async () => Ok(await service.GetSetAsync(id, ct)));

    [HttpGet("{id:int}/words")]
    public Task<IActionResult> GetWords(int id, [FromQuery] AdminVocabularyQuery query, CancellationToken ct) =>
        ExecuteAsync(async () => Ok(await service.GetWordsAsync(id, query, ct)));

    [HttpGet("{id:int}/words/{wordId:int}")]
    public Task<IActionResult> GetWord(int id, int wordId, CancellationToken ct) =>
        ExecuteAsync(async () => Ok(await service.GetWordAsync(id, wordId, ct)));

    [HttpPost]
    public Task<IActionResult> CreateSet(AdminVocabularySetRequest request, CancellationToken ct) => ExecuteAsync(async () =>
    {
        var result = await service.SaveSetAsync(null, request, ct);
        return CreatedAtAction(nameof(GetSet), new { id = result.Id }, result);
    });

    [HttpPut("{id:int}")]
    public Task<IActionResult> UpdateSet(int id, AdminVocabularySetRequest request, CancellationToken ct) =>
        ExecuteAsync(async () => Ok(await service.SaveSetAsync(id, request, ct)));

    [HttpDelete("{id:int}")]
    public Task<IActionResult> DeleteSet(int id, CancellationToken ct) => ExecuteAsync(async () =>
    {
        await service.DeleteSetAsync(id, ct);
        return NoContent();
    });

    [HttpPost("{id:int}/words")]
    public Task<IActionResult> CreateWord(int id, AdminVocabularyWordRequest request, CancellationToken ct) => ExecuteAsync(async () =>
    {
        var result = await service.SaveWordAsync(id, null, request, ct);
        return CreatedAtAction(nameof(GetWord), new { id, wordId = result.Id }, result);
    });

    [HttpPut("{id:int}/words/{wordId:int}")]
    public Task<IActionResult> UpdateWord(int id, int wordId, AdminVocabularyWordRequest request, CancellationToken ct) =>
        ExecuteAsync(async () => Ok(await service.SaveWordAsync(id, wordId, request, ct)));

    [HttpDelete("{id:int}/words/{wordId:int}")]
    public Task<IActionResult> DeleteWord(int id, int wordId, CancellationToken ct) => ExecuteAsync(async () =>
    {
        await service.DeleteWordAsync(id, wordId, ct);
        return NoContent();
    });

    private async Task<IActionResult> ExecuteAsync(Func<Task<IActionResult>> action)
    {
        try { return await action(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        catch (ArgumentException ex) { return BadRequest(new { message = ex.Message }); }
        catch (InvalidOperationException ex) { return Conflict(new { message = ex.Message }); }
        catch (DbUpdateException) { return Conflict(new { message = "Dữ liệu đang được sử dụng hoặc đã thay đổi. Vui lòng tải lại và thử lại." }); }
    }
}
