using EnglishLearning.DAL.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EnglishLearning.API.Services;

public static class LegacyDatabaseBaseline
{
    private const string InitialMigration = "20261018061907_InitialCreate";
    private const string ProductVersion = "9.0.0";
    private static readonly string[] BaselineMigrations =
    [
        InitialMigration,
        "20261019192042_SyncModelChanges",
        "20261019195403_SyncLatestEntityChanges",
        "20261021021405_SyncTopicEntityChanges",
        "20261021081621_MoveSpeakingTypeToExercise",
        "20261021095510_UpdateSpeakingWritingConfig",
        "20261024030952_AddSpeakingQuestionsRelationship",
        "20261024035621_AddSpeakingQuestionsRelationship2",
        "20261025121926_AddSpeakingQuestionCuesAndClosing",
        "20261031152213_AddSpeakingAssessmentFields",
        "20261031162254_SpeakingResultsOnAttempts",
        "20261102093000_AddWritingAdminMetadata"
    ];

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

        if (existingTables.Contains("speaking_grades"))
        {
            throw new InvalidOperationException(
                "Database còn bảng speaking_grades nhưng không có lịch sử migration. " +
                "Không thể tự đánh dấu migration vì cần chuyển dữ liệu Speaking trước khi xóa bảng này. " +
                "Hãy sao lưu database và khôi phục lịch sử migration phù hợp.");
        }

        await VerifyExistingSeedDataAsync(context, cancellationToken);
        await VerifyExistingColumnsAsync(context, cancellationToken);
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

    private static async Task VerifyExistingColumnsAsync(
        AppDbContext context,
        CancellationToken cancellationToken)
    {
        var existingColumns = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        await context.Database.OpenConnectionAsync(cancellationToken);
        try
        {
            await using var command = context.Database.GetDbConnection().CreateCommand();
            command.CommandText =
                "SELECT CONCAT(TABLE_NAME, '.', COLUMN_NAME) " +
                "FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE()";
            await using var reader = await command.ExecuteReaderAsync(cancellationToken);
            while (await reader.ReadAsync(cancellationToken))
                existingColumns.Add(reader.GetString(0));
        }
        finally
        {
            await context.Database.CloseConnectionAsync();
        }

        var missingColumns = context.Model.GetEntityTypes()
            .SelectMany(entity =>
            {
                var tableName = entity.GetTableName();
                if (string.IsNullOrWhiteSpace(tableName))
                    return [];

                var table = StoreObjectIdentifier.Table(tableName, entity.GetSchema());
                return entity.GetProperties()
                    .Select(property => $"{tableName}.{property.GetColumnName(table)}");
            })
            .Where(column => !existingColumns.Contains(column))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (missingColumns.Count == 0)
            return;

        throw new InvalidOperationException(
            "Database có schema cũ nhưng thiếu các cột của model hiện tại nên không thể đánh dấu migration an toàn. " +
            $"Các cột còn thiếu: {string.Join(", ", missingColumns)}. " +
            "Hãy sao lưu database và chạy/đối chiếu migration phù hợp trước khi khởi động lại.");
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
        foreach (var migrationId in BaselineMigrations)
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
