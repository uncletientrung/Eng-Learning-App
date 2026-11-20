using EnglishLearning.BLL.Interfaces;
using EnglishLearning.DAL.Entities;
using Microsoft.AspNetCore.Identity;

namespace EnglishLearning.API.Services;

public sealed class AdminUserPasswordHasher : IAdminUserPasswordHasher
{
    private readonly IPasswordHasher<User> _passwordHasher;

    public AdminUserPasswordHasher(IPasswordHasher<User> passwordHasher)
    {
        _passwordHasher = passwordHasher;
    }

    public string HashPassword(User user, string password) =>
        _passwordHasher.HashPassword(user, password);
}
