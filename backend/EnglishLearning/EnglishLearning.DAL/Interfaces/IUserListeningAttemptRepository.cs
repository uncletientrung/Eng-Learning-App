using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IUserListeningAttemptRepository
{
    Task<List<UserListeningAttempt>> GetAllAsync();

    Task<UserListeningAttempt?> GetByIdAsync(int id);

    Task<List<UserListeningAttempt>> GetByUserID(int userId);

    Task<UserListeningAttempt> AddAsync(UserListeningAttempt listeningTest);

    Task<UserListeningAttempt> DeleteAsync(int id);
}