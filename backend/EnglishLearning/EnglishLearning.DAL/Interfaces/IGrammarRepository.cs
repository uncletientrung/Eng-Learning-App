using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IGrammarRepository
{
    Task<List<GrammarCategory>> GetAllCategoryAsync();

    Task<List<GrammarCategory>> GetTopicByCategoryAsync(int id);

    Task<List<GrammarSection>> GetSectionsByCategoryAsync(int categoryId);
}