using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IListeningFillBlankRepository
{
    Task<ListeningFillBlankAnswer> AddAsync(
        ListeningFillBlankAnswer listeningFillBlankAnswer);

    Task<List<ListeningFillBlankAnswer>> GetAllAsync(int questionId);

    Task<ListeningFillBlankAnswer?> GetById(int id);

    Task<ListeningFillBlankAnswer?> UpdateAsync(
        int id,
        ListeningFillBlankAnswer listeningFillBlankAnswer);

    Task<ListeningFillBlankAnswer?> DeleteAsync(int id);
}