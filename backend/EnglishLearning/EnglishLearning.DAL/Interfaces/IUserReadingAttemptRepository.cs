using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IUserReadingAttemptRepository
{
    Task<List<UserReadingAttempt>> GetAllAsync();
    
    Task<UserReadingAttempt?> GetByIdAsync(int id);
    
    Task<List<UserReadingAttempt>> GetByUserID(int userId);
    Task <UserReadingAttempt> AddAsync(UserReadingAttempt readingTest);
    
    Task<UserReadingAttempt> DeleteAsync(int id);
    
    
}