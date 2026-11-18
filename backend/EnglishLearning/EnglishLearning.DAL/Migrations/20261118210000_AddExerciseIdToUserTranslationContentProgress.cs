using EnglishLearning.DAL.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EnglishLearning.DAL.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20261118210000_AddExerciseIdToUserTranslationContentProgress")]
public partial class AddExerciseIdToUserTranslationContentProgress : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<int>(
            name: "exercise_id",
            table: "user_translation_content_progress",
            type: "int",
            nullable: true);

        migrationBuilder.Sql("""
            UPDATE user_translation_content_progress AS progress
            INNER JOIN translation_exercises_content AS content
                ON content.Id = progress.content_id
            SET progress.exercise_id = content.parent_id
            """);

        migrationBuilder.AlterColumn<int>(
            name: "exercise_id",
            table: "user_translation_content_progress",
            type: "int",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "int",
            oldNullable: true);

        migrationBuilder.CreateIndex(
            name: "IX_user_translation_content_progress_exercise_id",
            table: "user_translation_content_progress",
            column: "exercise_id");

        migrationBuilder.CreateIndex(
            name: "IX_translation_progress_user_completed_exercise",
            table: "user_translation_content_progress",
            columns: new[] { "user_id", "is_completed", "exercise_id" });

        migrationBuilder.AddForeignKey(
            name: "FK_user_translation_content_progress_exercise_id",
            table: "user_translation_content_progress",
            column: "exercise_id",
            principalTable: "translation_exercises",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_user_translation_content_progress_exercise_id",
            table: "user_translation_content_progress");

        migrationBuilder.DropIndex(
            name: "IX_user_translation_content_progress_exercise_id",
            table: "user_translation_content_progress");

        migrationBuilder.DropIndex(
            name: "IX_translation_progress_user_completed_exercise",
            table: "user_translation_content_progress");

        migrationBuilder.DropColumn(
            name: "exercise_id",
            table: "user_translation_content_progress");
    }
}
