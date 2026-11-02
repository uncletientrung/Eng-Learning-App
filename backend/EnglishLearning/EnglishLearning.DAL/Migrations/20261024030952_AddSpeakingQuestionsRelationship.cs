using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddSpeakingQuestionsRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SpeakingExerciseId",
                table: "speaking_questions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_speaking_questions_SpeakingExerciseId",
                table: "speaking_questions",
                column: "SpeakingExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_speaking_questions_speaking_exercises_SpeakingExerciseId",
                table: "speaking_questions",
                column: "SpeakingExerciseId",
                principalTable: "speaking_exercises",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_speaking_questions_speaking_exercises_SpeakingExerciseId",
                table: "speaking_questions");

            migrationBuilder.DropIndex(
                name: "IX_speaking_questions_SpeakingExerciseId",
                table: "speaking_questions");

            migrationBuilder.DropColumn(
                name: "SpeakingExerciseId",
                table: "speaking_questions");
        }
    }
}
