using EnglishLearning.DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.API.Services;

public static class LegacyDatabaseBaseline
{
    private const string InitialMigration = "20261102133849_initDb";
    private const string SeedCategoriesMigration = "20261102134148_SeedGrammarCategories";
    private const string SeedSectionsMigration = "20261102134222_SeedGrammarSections";
    private const string ProductVersion = "9.0.0";

    public static async Task ApplyAsync(
        AppDbContext context,
        CancellationToken cancellationToken = default)
    {
        var appliedMigrations = await context.Database
            .GetAppliedMigrationsAsync(cancellationToken);
        if (appliedMigrations.Contains(InitialMigration, StringComparer.Ordinal))
            return;

        if (appliedMigrations.Any())
        {
            throw new InvalidOperationException(
                "Database có lịch sử migration nhưng thiếu migration khởi tạo. " +
                "Hãy sao lưu database và kiểm tra __EFMigrationsHistory trước khi tiếp tục.");
        }

        var expectedTables = context.Model.GetEntityTypes()
            .Select(entity => entity.GetTableName())
            .Where(name => !string.IsNullOrWhiteSpace(name))
            .Select(name => name!)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
        var existingTables = await GetExistingTablesAsync(context, cancellationToken);

        if (!expectedTables.Overlaps(existingTables))
            return;

        var missingTables = expectedTables.Except(existingTables, StringComparer.OrdinalIgnoreCase).ToList();
        if (missingTables.Count > 0)
        {
            throw new InvalidOperationException(
                "Database có schema cũ nhưng thiếu một số bảng cần thiết nên không thể tự đồng bộ migration an toàn. " +
                $"Các bảng còn thiếu: {string.Join(", ", missingTables)}. " +
                "Hãy sao lưu database và đối chiếu schema trước khi chạy lại.");
        }

        await VerifyExistingSeedDataAsync(context, cancellationToken);
        await CreateMigrationHistoryAsync(context, cancellationToken);
    }

    private static async Task<HashSet<string>> GetExistingTablesAsync(
        AppDbContext context,
        CancellationToken cancellationToken)
    {
        var tables = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        await context.Database.OpenConnectionAsync(cancellationToken);
        try
        {
            await using var command = context.Database.GetDbConnection().CreateCommand();
            command.CommandText =
                "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES " +
                "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'";
            await using var reader = await command.ExecuteReaderAsync(cancellationToken);
            while (await reader.ReadAsync(cancellationToken))
                tables.Add(reader.GetString(0));
        }
        finally
        {
            await context.Database.CloseConnectionAsync();
        }

        return tables;
    }

    private static async Task VerifyExistingSeedDataAsync(
        AppDbContext context,
        CancellationToken cancellationToken)
    {
        var categoryCount = await context.GrammarCategories
            .CountAsync(category => category.Id >= 1 && category.Id <= 48, cancellationToken);
        var sectionCount = await context.GrammarSections
            .CountAsync(section => section.Id >= 1 && section.Id <= 253, cancellationToken);
        var hasReadingSeeds =
            await context.ReadingTests.AnyAsync(test => test.Id == 1, cancellationToken) &&
            await context.ReadingExercises.CountAsync(
                exercise => exercise.Id >= 1 && exercise.Id <= 3,
                cancellationToken) == 3;

        if (categoryCount == 48 && sectionCount == 253 && hasReadingSeeds)
            return;

        throw new InvalidOperationException(
            "Database đã có các bảng ứng dụng nhưng dữ liệu nền không khớp với các migration hiện tại. " +
            "Để tránh ghi đè hoặc tạo trùng dữ liệu, ứng dụng không tự đánh dấu migration. " +
            "Hãy sao lưu database và đối chiếu dữ liệu trong grammar_categories, grammar_sections, Reading_Test và reading_exercises.");
    }

    private static async Task CreateMigrationHistoryAsync(
        AppDbContext context,
        CancellationToken cancellationToken)
    {
        await context.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
                `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
                `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
                CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
            ) CHARACTER SET=utf8mb4;
            """,
            cancellationToken);

        await using var transaction = await context.Database.BeginTransactionAsync(cancellationToken);
        foreach (var migrationId in new[]
                 {
                     InitialMigration,
                     SeedCategoriesMigration,
                     SeedSectionsMigration
                 })
        {
            await context.Database.ExecuteSqlRawAsync(
                "INSERT IGNORE INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) " +
                "VALUES ({0}, {1})",
                [migrationId, ProductVersion],
                cancellationToken);
        }

        await transaction.CommitAsync(cancellationToken);
    }
}
