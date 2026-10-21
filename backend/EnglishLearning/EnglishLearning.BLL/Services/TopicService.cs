using EnglishLearning.BLL.DTOs;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.BLL.Services;

public class TopicService : ITopicService
{
    private readonly ITopicRepository _topicRepository;

    public TopicService(ITopicRepository topicRepository)
    {
        _topicRepository = topicRepository;
    }

    public async Task<List<TopicDto>> GetAllAsync()
    {
        var topics = await _topicRepository.GetAllAsync();

        return topics.Select(t => new TopicDto
        {
            Id = t.Id,
            Name = t.Name,
            Description = t.Description,
            ModuleType = t.ModuleType,
            CreateBy = t.CreateBy,
            CreateByUserId = t.CreateByUserId
        }).ToList();
    }

    public async Task<List<TopicDto>> GetByModuleTypeAsync(string moduleType)
    {
        var topics = await _topicRepository
            .GetByModuleTypeAsync(moduleType);

        return topics.Select(t => new TopicDto
        {
            Id = t.Id,
            Name = t.Name,
            Description = t.Description,
            ModuleType = t.ModuleType,
            CreateBy = t.CreateBy,
            CreateByUserId = t.CreateByUserId
        }).ToList();
    }

    public async Task<TopicDto?> GetTopicByIdAsync(int id)
    {
        var topic = await _topicRepository.GetTopicByIdAsync(id);

        if (topic == null)
        {
            return null;
        }

        return new TopicDto
        {
            Id = topic.Id,
            Name = topic.Name,
            Description = topic.Description,
            ModuleType = topic.ModuleType,
            CreateBy = topic.CreateBy,
            CreateByUserId = topic.CreateByUserId
        };
    }
}