using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Các DbSet<Entity> của bạn đặt ở đây
}