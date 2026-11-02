using System.Security.Claims;
using EnglishLearning.BLL.DTOs.Vocabulary;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Authorize(Policy = "VocabularyUser")]
[Route("api/vocabulary/sets")]
public sealed class VocabularyController(IVocabularyService service) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    private IActionResult Missing() => NotFound(new { message = "Không tìm thấy bộ từ hoặc từ vựng." });

    [HttpGet] // Bộ từ user có thể xem
    public async Task<IActionResult> GetSets(CancellationToken ct) => Ok(await service.GetSetsAsync(UserId, false, ct));

    [HttpGet("mine")] // Bộ từ của chính user
    public async Task<IActionResult> GetMine(CancellationToken ct) => Ok(await service.GetSetsAsync(UserId, true, ct));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetSet(int id, CancellationToken ct)
    {
        var result = await service.GetSetAsync(id, UserId, ct);
        return result is null ? Missing() : Ok(result);
    }

    [HttpGet("{id:int}/words")]
    public async Task<IActionResult> GetWords(int id, CancellationToken ct)
    {
        var result = await service.GetSetAsync(id, UserId, ct);
        return result is null ? Missing() : Ok(result.Words);
    }

    [HttpPost]
    public async Task<IActionResult> Create(SaveVocabularySetRequest request, CancellationToken ct)
    {
        var result = await service.CreateSetAsync(UserId, request, ct);
        return CreatedAtAction(nameof(GetSet), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Rename(int id, SaveVocabularySetRequest request, CancellationToken ct) =>
        await service.RenameSetAsync(id, UserId, request, ct) ? NoContent() : Missing();

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct) =>
        await service.DeleteSetAsync(id, UserId, ct) ? NoContent() : Missing();

    [HttpPost("{id:int}/words")]
    public async Task<IActionResult> AddWords(int id, AddVocabularyWordsRequest request, CancellationToken ct)
    {
        var result = await service.AddWordsAsync(id, UserId, request, ct);
        return result is null ? Missing() : Ok(result);
    }

    [HttpPut("{id:int}/words/{wordId:int}")]
    public async Task<IActionResult> UpdateWord(int id, int wordId, SaveVocabularyWordRequest request, CancellationToken ct)
    {
        try { return await service.UpdateWordAsync(id, wordId, UserId, request, ct) ? NoContent() : Missing(); }
        catch (ArgumentException ex) { return Conflict(new { message = ex.Message }); }
    }

    [HttpPost("{id:int}/words/delete")]
    public async Task<IActionResult> DeleteWords(int id, DeleteVocabularyWordsRequest request, CancellationToken ct)
    {
        var count = await service.DeleteWordsAsync(id, UserId, request.WordIds, ct);
        return count is null ? Missing() : Ok(new { deletedCount = count.Value });
    }

    [HttpPost("{id:int}/words/{wordId:int}/move")]
    public async Task<IActionResult> MoveWord(int id, int wordId, MoveVocabularyWordRequest request, CancellationToken ct)
    {
        try
        {
            var name = await service.MoveWordAsync(id, wordId, UserId, request.TargetSetId, ct);
            return name is null ? Missing() : Ok(new { targetName = name });
        }
        catch (ArgumentException ex) { return Conflict(new { message = ex.Message }); }
    }
}
