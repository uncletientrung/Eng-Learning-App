using EnglishLearning.BLL.DTOs;
using EnglishLearning.DAL.Entities;

namespace EnglishLearning.BLL.Interfaces;

public interface IUserReadingAttemptService
{
    public Task<List<UserReadingAttemptDTO>> GetAllAsync();
    public Task<UserReadingAttemptDTO> GetByIdAsync(int id);
    public Task<List<UserReadingAttemptDTO>> GetByUserID(int userId);
    public Task<UserReadingAttemptDTO> AddAsync(UserReadingAttemptDTO dto);
    public Task<UserReadingAttemptDTO> DeleteAsync(int id);
}