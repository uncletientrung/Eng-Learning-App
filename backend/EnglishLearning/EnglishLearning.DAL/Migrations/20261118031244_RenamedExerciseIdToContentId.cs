using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RenamedExerciseIdToContentId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_translation_attempts_translation_exercises_exercise_id",
                table: "user_translation_attempts");

            migrationBuilder.DropIndex(
                name: "IX_user_translation_attempts_exercise_id",
                table: "user_translation_attempts");

            migrationBuilder.DropColumn(
                name: "exercise_id",
                table: "user_translation_attempts");

            migrationBuilder.AlterColumn<string>(
                name: "llm_feedback",
                table: "user_translation_attempts",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<sbyte>(
                name: "Score",
                table: "user_translation_attempts",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(sbyte),
                oldType: "tinyint");

            migrationBuilder.AddColumn<int>(
                name: "content_id",
                table: "user_translation_attempts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_translation_attempts_content_id",
                table: "user_translation_attempts",
                column: "content_id");

            migrationBuilder.AddForeignKey(
                name: "FK_user_translation_attempts_translation_exercises_content_cont~",
                table: "user_translation_attempts",
                column: "content_id",
                principalTable: "translation_exercises_content",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_translation_attempts_translation_exercises_content_cont~",
                table: "user_translation_attempts");

            migrationBuilder.DropIndex(
                name: "IX_user_translation_attempts_content_id",
                table: "user_translation_attempts");

            migrationBuilder.DropColumn(
                name: "content_id",
                table: "user_translation_attempts");

            migrationBuilder.UpdateData(
                table: "user_translation_attempts",
                keyColumn: "llm_feedback",
                keyValue: null,
                column: "llm_feedback",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "llm_feedback",
                table: "user_translation_attempts",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<sbyte>(
                name: "Score",
                table: "user_translation_attempts",
                type: "tinyint",
                nullable: false,
                defaultValue: (sbyte)0,
                oldClrType: typeof(sbyte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "exercise_id",
                table: "user_translation_attempts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_user_translation_attempts_exercise_id",
                table: "user_translation_attempts",
                column: "exercise_id");

            migrationBuilder.AddForeignKey(
                name: "FK_user_translation_attempts_translation_exercises_exercise_id",
                table: "user_translation_attempts",
                column: "exercise_id",
                principalTable: "translation_exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
