using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class GrammarRepository : IGrammarRepository
{
    private readonly AppDbContext _context;

    public GrammarRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<GrammarCategory>> GetAllCategoryAsync()
    {
        return await _context.GrammarCategories
            .AsNoTracking()
            .OrderBy(e => e.DisplayOrder)
            .Where(e => e.ParentId == null)
            .ToListAsync();
    }

    public async Task<List<GrammarCategory>> GetTopicByCategoryAsync(int id)
    {
        var category = await _context.GrammarCategories
            .AsNoTracking()
            .Include(e => e.Children)
            .FirstOrDefaultAsync(e => e.Id == id);

        return category?.Children
            .OrderBy(e => e.DisplayOrder)
            .ToList() ?? new List<GrammarCategory>();
    }
}