using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class EnsureTranslationExerciseColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                ALTER TABLE `translation_exercises`
                MODIFY COLUMN `Level` varchar(2) NULL,
                MODIFY COLUMN `source_text` text NULL,
                MODIFY COLUMN `reference_translation` text NULL,
                MODIFY COLUMN `Explanation` text NULL;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
