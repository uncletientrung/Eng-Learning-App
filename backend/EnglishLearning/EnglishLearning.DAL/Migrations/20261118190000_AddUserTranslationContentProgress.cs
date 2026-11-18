using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using EnglishLearning.DAL.Data;

namespace EnglishLearning.DAL.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20261118190000_AddUserTranslationContentProgress")]
public partial class AddUserTranslationContentProgress : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "user_translation_content_progress",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                user_id = table.Column<int>(type: "int", nullable: false),
                content_id = table.Column<int>(type: "int", nullable: false),
                is_completed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                updated_at = table.Column<DateTime>(type: "timestamp", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_user_translation_content_progress", x => x.Id);
                table.ForeignKey(
                    name: "FK_user_translation_content_progress_content_id",
                    column: x => x.content_id,
                    principalTable: "translation_exercises_content",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_user_translation_content_progress_user_id",
                    column: x => x.user_id,
                    principalTable: "user",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_user_translation_content_progress_content_id",
            table: "user_translation_content_progress",
            column: "content_id");
        migrationBuilder.CreateIndex(
            name: "IX_user_translation_content_progress_user_id_content_id",
            table: "user_translation_content_progress",
            columns: new[] { "user_id", "content_id" },
            unique: true);

        migrationBuilder.Sql("""
            INSERT INTO user_translation_content_progress (user_id, content_id, is_completed, updated_at)
            SELECT user_id, content_id, 1, UTC_TIMESTAMP()
            FROM user_translation_attempts
            WHERE content_id IS NOT NULL AND (Score = 100 OR Score IS NULL)
            GROUP BY user_id, content_id
            """);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "user_translation_content_progress");
    }
}
