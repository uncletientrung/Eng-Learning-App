using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IListeningTestRepository
{
    Task<List<ListeningTest>> GetAllAsync();

    Task<ListeningTest?> GetByIdAsync(int id);

    Task<ListeningTest> AddAsync(ListeningTest listeningTest);

    Task<ListeningTest> UpdateAsync(int id, ListeningTest listeningTest);

    Task<ListeningTest> DeleteAsync(int id);
}