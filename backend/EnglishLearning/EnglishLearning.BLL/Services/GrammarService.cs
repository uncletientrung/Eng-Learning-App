using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;

namespace EnglishLearning.BLL.Services;

public class GrammarService : IGrammarService
{
    private readonly IGrammarRepository _repository;

    public GrammarService(IGrammarRepository repository)
    {
        _repository = repository;
    }

    public Task<List<GrammarCategory>> GetAllCategoryAsync()
    {
        return _repository.GetAllCategoryAsync();
    }

    public Task<List<GrammarCategory>> GetTopicByCategoryAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID không hợp lệ.");

        return _repository.GetTopicByCategoryAsync(id);
    }
}