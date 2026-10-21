using EnglishLearning.BLL.DTOs;

namespace EnglishLearning.BLL.Interfaces;

public interface ITopicService
{
    Task<List<TopicDto>> GetAllAsync();

    Task<List<TopicDto>> GetByModuleTypeAsync(
        string moduleType);
}