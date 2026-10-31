using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddSpeakingAssessmentFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                SET @speaking_transcript_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'user_speaking_answers'
                      AND column_name = 'transcript'
                );
                """);
            migrationBuilder.Sql("""
                SET @speaking_transcript_sql = IF(
                    @speaking_transcript_exists = 0,
                    'ALTER TABLE `user_speaking_answers` ADD COLUMN `transcript` text NULL',
                    'SELECT 1'
                );
                """);
            migrationBuilder.Sql(
                "PREPARE speaking_transcript_stmt FROM @speaking_transcript_sql;");
            migrationBuilder.Sql("EXECUTE speaking_transcript_stmt;");
            migrationBuilder.Sql("DEALLOCATE PREPARE speaking_transcript_stmt;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "transcript",
                table: "user_speaking_answers");

        }
    }
}
