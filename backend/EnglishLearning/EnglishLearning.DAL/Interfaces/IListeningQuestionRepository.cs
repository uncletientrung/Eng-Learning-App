using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IListeningQuestionRepository
{
    Task<List<ListeningQuestion>> GetAllAsync(int id);
    Task<ListeningQuestion?> GetbyIdAsync(int id, int questionId);
    Task<ListeningQuestion> AddAsync(ListeningQuestion listeningQuestion);
    Task<ListeningQuestion> UpdateAsync(int id, ListeningQuestion listeningQuestion);
    Task<ListeningQuestion> DeleteAsync(int id);
}