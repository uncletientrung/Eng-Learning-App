using EnglishLearning.BLL.DTOs;
using EnglishLearning.DAL.Entities;

namespace EnglishLearning.BLL.Interfaces;

public interface ITopicService
{
    Task<List<TopicDto>> GetAllAsync();

    Task<List<TopicDto>> GetByModuleTypeAsync(
        string moduleType);

    Task<TopicDto?> GetTopicByIdAsync(int id);
}