using EnglishLearning.DAL.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Authorize(Policy = "VocabularyUser")]
[Route("api/idioms")]
public sealed class IdiomsController(AppDbContext db) : ControllerBase
{
    [HttpGet("topics")]
    public async Task<IActionResult> GetTopics(CancellationToken ct)
    {
        var topics = await (
            from idiom in db.Idioms.AsNoTracking()
            join topic in db.Topics.AsNoTracking().Where(t => t.IsActive) on idiom.TopicId equals topic.Id
            group idiom by new { topic.Id, topic.Name, topic.Description, topic.ImageURL } into idiomGroup
            select new
            {
                id = idiomGroup.Key.Id,
                title = idiomGroup.Key.Name,
                description = idiomGroup.Key.Description,
                imageURL = idiomGroup.Key.ImageURL,
                count = idiomGroup.Count()
            }).ToListAsync(ct);
        return Ok(topics);
    }

    [HttpGet("topics/{topicId:int}")]
    public async Task<IActionResult> GetByTopic(int topicId, CancellationToken ct)
    {
        var idioms = await db.Idioms.AsNoTracking().Where(idiom => idiom.TopicId == topicId)
            .OrderBy(idiom => idiom.Id)
            .Select(idiom => new
            {
                id = idiom.Id,
                text = idiom.IdiomText,
                phonetic = idiom.Phonetic,
                meaningEn = idiom.MeaningEn,
                meaningVi = idiom.MeaningVi,
                exampleEn = idiom.example_en,
                exampleVi = idiom.example_vi
            }).ToListAsync(ct);
        return Ok(idioms);
    }
}
