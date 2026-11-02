using EnglishLearning.DAL.Entities;

namespace EnglishLearning.BLL.Interfaces;

public interface IGrammarService
{
    Task<List<GrammarCategory>> GetAllCategoryAsync();
    Task<List<GrammarCategory>> GetTopicByCategoryAsync(int id);
}