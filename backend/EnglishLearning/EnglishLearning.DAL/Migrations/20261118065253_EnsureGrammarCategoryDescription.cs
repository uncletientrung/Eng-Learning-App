using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class EnsureGrammarCategoryDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                SET @grammar_description_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'grammar_categories'
                      AND column_name = 'description'
                );
                SET @grammar_description_sql = IF(
                    @grammar_description_exists = 0,
                    'ALTER TABLE `grammar_categories` ADD COLUMN `description` text NULL',
                    'SELECT 1'
                );
                PREPARE grammar_description_stmt FROM @grammar_description_sql;
                EXECUTE grammar_description_stmt;
                DEALLOCATE PREPARE grammar_description_stmt;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                SET @grammar_description_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'grammar_categories'
                      AND column_name = 'description'
                );
                SET @grammar_description_sql = IF(
                    @grammar_description_exists > 0,
                    'ALTER TABLE `grammar_categories` DROP COLUMN `description`',
                    'SELECT 1'
                );
                PREPARE grammar_description_stmt FROM @grammar_description_sql;
                EXECUTE grammar_description_stmt;
                DEALLOCATE PREPARE grammar_description_stmt;
                """);
        }
    }
}
