using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SyncModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_user_writing_criterion_scores_attempt_id_criterion_code",
                table: "user_writing_criterion_scores",
                columns: new[] { "attempt_id", "criterion_code" },
                unique: true);

            migrationBuilder.DropIndex(
                name: "IX_user_writing_criterion_scores_attempt_id",
                table: "user_writing_criterion_scores");

            migrationBuilder.AddForeignKey(
                name: "FK_user_writing_attempts_user_user_id",
                table: "user_writing_attempts",
                column: "user_id",
                principalTable: "user",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user_writing_attempts_writing_exercises_exercise_id",
                table: "user_writing_attempts",
                column: "exercise_id",
                principalTable: "writing_exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_writing_exercises_topics_topic_id",
                table: "writing_exercises",
                column: "topic_id",
                principalTable: "topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_writing_attempts_user_user_id",
                table: "user_writing_attempts");

            migrationBuilder.DropForeignKey(
                name: "FK_user_writing_attempts_writing_exercises_exercise_id",
                table: "user_writing_attempts");

            migrationBuilder.DropForeignKey(
                name: "FK_writing_exercises_topics_topic_id",
                table: "writing_exercises");

            migrationBuilder.DropIndex(
                name: "IX_user_writing_criterion_scores_attempt_id_criterion_code",
                table: "user_writing_criterion_scores");

            migrationBuilder.CreateIndex(
                name: "IX_user_writing_criterion_scores_attempt_id",
                table: "user_writing_criterion_scores",
                column: "attempt_id");

            migrationBuilder.AddForeignKey(
                name: "FK_user_writing_attempts_user_user_id",
                table: "user_writing_attempts",
                column: "user_id",
                principalTable: "user",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_writing_attempts_writing_exercises_exercise_id",
                table: "user_writing_attempts",
                column: "exercise_id",
                principalTable: "writing_exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_writing_exercises_topics_topic_id",
                table: "writing_exercises",
                column: "topic_id",
                principalTable: "topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
