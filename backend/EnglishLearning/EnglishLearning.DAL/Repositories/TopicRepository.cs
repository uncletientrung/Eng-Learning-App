using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class TopicRepository : ITopicRepository
{
    private readonly AppDbContext _context;

    public TopicRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Topic>> GetAllAsync()
    {
        return await _context.Topics
            .AsNoTracking()
            .OrderBy(t => t.Id)
            .ToListAsync();
    }

    public async Task<List<Topic>> GetByModuleTypeAsync(string moduleType)

    {
        var normalizedType = moduleType.Trim().ToUpper();

        return await _context.Topics
            .AsNoTracking()
            .Where(t => t.ModuleType.ToUpper() == normalizedType)
            .OrderBy(t => t.Id)
            .ToListAsync();
    }

    public async Task<Topic?> GetTopicByIdAsync(int id)
    {
        return await _context.Topics
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);
    }
}