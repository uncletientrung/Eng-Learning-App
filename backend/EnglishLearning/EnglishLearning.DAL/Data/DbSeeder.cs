
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

        // Users survive catalog edits, so even deleting every vocabulary set must not
        // restore the sample catalog on the next startup. Seed it only on first setup.
        var initializeVocabulary = !await context.Users.AnyAsync(cancellationToken)
            && !await context.Topics.AnyAsync(t => t.ModuleType == "VOCABULARY", cancellationToken);

        await GrammarSeeder.SeedAsync(context, cancellationToken);
        await UserSeeder.SeedAsync(context, cancellationToken);
        var topicIds = await TopicSeeder.SeedAsync(context, cancellationToken, initializeVocabulary);
        await IdiomSeeder.SeedAsync(context, topicIds, cancellationToken);
        await TranslationExerciseSeeder.SeedAsync(context, cancellationToken);
        if (initializeVocabulary)
            await WordSeeder.SeedAsync(context, topicIds, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }
}

