using EnglishLearning.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Data.Seeders;

public static class UserSeeder
{
    public static async Task SeedAsync(
        AppDbContext context,
        CancellationToken cancellationToken = default)
    {
        var seedUsers = new List<User>
        {
            new User
            {
                Name = "test1",
                Role = "ADMIN",
                Username = "a",
                Password = "AQAAAAIAAYagAAAAEDnG6IBcS7dN59XlrketOc3GcncfNBXOWDkCrXKpe2n1c8G4ro5SiUShSJZGFkopHA==",
                Email = "test@gmail.com",
                Phone = "0352447642",
                Status = 1,
                CurrentStreak = 0,
                LastStudyDate = null
            }
        };

        var emails = await context.Users
            .AsNoTracking()
            .Select(user => user.Email)
            .ToListAsync(cancellationToken);
        var existingEmails = emails
            .Select(email => email.Trim())
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        foreach (var user in seedUsers)
        {
            if (existingEmails.Add(user.Email.Trim()))
            {
                context.Users.Add(user);
            }
        }

        await context.SaveChangesAsync(cancellationToken);
    }
}
