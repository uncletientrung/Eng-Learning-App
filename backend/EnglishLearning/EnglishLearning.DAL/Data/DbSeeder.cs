
using Microsoft.EntityFrameworkCore;
using EnglishLearning.DAL.Data.Seeders;

namespace EnglishLearning.DAL.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(
        AppDbContext context,
        CancellationToken cancellationToken = default)
    {
        /* 
        * AppDbContext: db, DbSeeder: điều phối, Seeder: Dữ liệu
        * Program.cs -> AppDbContext -> Migration -> DbSeeder -> Seeder
        * Database đã được migrate trước khi gọi hàm này.
        */
        await using var transaction = await context.Database.BeginTransactionAsync(cancellationToken);

        await UserSeeder.SeedAsync(context, cancellationToken);
        var topicIds = await TopicSeeder.SeedAsync(context, cancellationToken);
        await WordSeeder.SeedAsync(context, topicIds, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }
}
