using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSpeakingWritingConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropIndex(
            //    name: "IX_user_speaking_answers_attempt_id",
            //    table: "user_speaking_answers");

            //migrationBuilder.DropIndex(
            //    name: "IX_speaking_criterion_scores_grade_id",
            //    table: "speaking_criterion_scores");

            migrationBuilder.DropColumn(
                name: "speaking_type",
                table: "speaking_questions");

            migrationBuilder.CreateIndex(
                name: "IX_user_speaking_answers_attempt_id_question_id",
                table: "user_speaking_answers",
                columns: new[] { "attempt_id", "question_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_speaking_criterion_scores_grade_id_criterion_code",
                table: "speaking_criterion_scores",
                columns: new[] { "grade_id", "criterion_code" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_user_speaking_answers_attempt_id_question_id",
                table: "user_speaking_answers");

            migrationBuilder.DropIndex(
                name: "IX_speaking_criterion_scores_grade_id_criterion_code",
                table: "speaking_criterion_scores");

            migrationBuilder.AddColumn<string>(
                name: "speaking_type",
                table: "speaking_questions",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_user_speaking_answers_attempt_id",
                table: "user_speaking_answers",
                column: "attempt_id");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_criterion_scores_grade_id",
                table: "speaking_criterion_scores",
                column: "grade_id");
        }
    }
}
