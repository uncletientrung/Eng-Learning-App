using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface ITopicRepository
{
    Task<List<Topic>> GetAllAsync();

    Task<List<Topic>> GetByModuleTypeAsync(string moduleType);
}