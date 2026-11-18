using System.Data;
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
        return await _context.GrammarCategories
            .AsNoTracking()
            .Where(e => e.ParentId == id)
            .OrderBy(section => section.DisplayOrder)
            .ToListAsync();
    }

    public async Task<List<GrammarSection>> GetSectionsByCategoryAsync(int categoryId)
    {
        return await _context.GrammarSections
            .AsNoTracking()
            .Where(section => section.CategoryId == categoryId)
            .OrderBy(section => section.DisplayOrder)
            .ToListAsync();
    }
}