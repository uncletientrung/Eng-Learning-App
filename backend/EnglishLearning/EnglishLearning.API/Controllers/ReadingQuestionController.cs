using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishLearning.API.Controllers;
[ApiController]
[Route("/api/reading-exercises/{exerciseId}/reading-questions")]
public class ReadingQuestionController: ControllerBase
{
    public readonly iReadingQuestionService readingQuestionService;

    public ReadingQuestionController(iReadingQuestionService ReadingQuestionService)
    {
        readingQuestionService = ReadingQuestionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int exerciseId)
    {
        var result = await readingQuestionService.GetAllAsync(exerciseId);
        return Ok(result);  
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync(int exerciseId,[FromBody] List<ReadingQuestionDTO> readingQuestionDTOs)
    {
        foreach (var question in readingQuestionDTOs)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await readingQuestionService.AddAsync(exerciseId, question);
        }

        return Ok();
    }

    [HttpGet("{questionId:int}")]
    public async Task<IActionResult> GetById(int exerciseId, int questionId)
    {
        var result = await readingQuestionService.GetByIdAsync(exerciseId, questionId);
        return Ok(result);
    }

    [HttpPut("{questionId:int}")]
    public async Task<IActionResult> UpdateAsync(int questionId,
        [FromBody]ReadingQuestionDTO readingQuestionDTO)
    {
        
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await readingQuestionService.UpdateAsync(questionId, readingQuestionDTO);
        

        return Ok();
    }

    [HttpDelete("{questionId:int}")]
    public async Task<IActionResult> DeleteAsync(int questionId)
    {
        var result = await readingQuestionService.DeleteAsync(questionId);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
}