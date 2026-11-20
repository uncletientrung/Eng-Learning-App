using EnglishLearning.DAL.Entities;

namespace EnglishLearning.BLL.Interfaces;

public interface IAdminUserPasswordHasher
{
    string HashPassword(User user, string password);
}
