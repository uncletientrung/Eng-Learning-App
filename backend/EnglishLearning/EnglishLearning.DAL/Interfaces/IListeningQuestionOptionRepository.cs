using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IListeningQuestionOptionRepository
{
    Task<List<ListeningQuestionOption>> GetAllAsync(int questionId);
    Task<ListeningQuestionOption?> GetById(int optionid);
    Task<ListeningQuestionOption> AddAsync(ListeningQuestionOption listeningQuestionOption);
    Task<ListeningQuestionOption> UpdateAsync(int optionid, ListeningQuestionOption listeningQuestionOption);
    Task<ListeningQuestionOption> DeleteAsync(int optionid);
}