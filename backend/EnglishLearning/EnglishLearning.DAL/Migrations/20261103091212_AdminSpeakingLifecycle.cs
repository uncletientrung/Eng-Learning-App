using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AdminSpeakingLifecycle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            DropForeignKeyIfExists(
                migrationBuilder,
                "speaking_exercises",
                "topic_id",
                "topics");
            DropForeignKeyIfExists(
                migrationBuilder,
                "user_speaking_answers",
                "question_id",
                "speaking_questions");
            DropForeignKeyIfExists(
                migrationBuilder,
                "user_speaking_attempts",
                "exercise_id",
                "speaking_exercises");

            migrationBuilder.Sql(
                """
                SET @admin_speaking_add_active = IF(
                    EXISTS (
                        SELECT 1
                        FROM information_schema.COLUMNS
                        WHERE TABLE_SCHEMA = DATABASE()
                          AND TABLE_NAME = 'speaking_exercises'
                          AND COLUMN_NAME = 'is_active'
                    ),
                    'SELECT 1',
                    'ALTER TABLE `speaking_exercises` ADD COLUMN `is_active` tinyint(1) NOT NULL DEFAULT 1'
                )
                """);
            migrationBuilder.Sql(
                "PREPARE admin_speaking_add_active_stmt FROM @admin_speaking_add_active");
            migrationBuilder.Sql("EXECUTE admin_speaking_add_active_stmt");
            migrationBuilder.Sql("DEALLOCATE PREPARE admin_speaking_add_active_stmt");

            migrationBuilder.AddForeignKey(
                name: "FK_speaking_exercises_topics_topic_id",
                table: "speaking_exercises",
                column: "topic_id",
                principalTable: "topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user_speaking_answers_speaking_questions_question_id",
                table: "user_speaking_answers",
                column: "question_id",
                principalTable: "speaking_questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user_speaking_attempts_speaking_exercises_exercise_id",
                table: "user_speaking_attempts",
                column: "exercise_id",
                principalTable: "speaking_exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_speaking_exercises_topics_topic_id",
                table: "speaking_exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_user_speaking_answers_speaking_questions_question_id",
                table: "user_speaking_answers");

            migrationBuilder.DropForeignKey(
                name: "FK_user_speaking_attempts_speaking_exercises_exercise_id",
                table: "user_speaking_attempts");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "speaking_exercises");

            migrationBuilder.AddForeignKey(
                name: "FK_speaking_exercises_topics_topic_id",
                table: "speaking_exercises",
                column: "topic_id",
                principalTable: "topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_speaking_answers_speaking_questions_question_id",
                table: "user_speaking_answers",
                column: "question_id",
                principalTable: "speaking_questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_speaking_attempts_speaking_exercises_exercise_id",
                table: "user_speaking_attempts",
                column: "exercise_id",
                principalTable: "speaking_exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        private static void DropForeignKeyIfExists(
            MigrationBuilder migrationBuilder,
            string table,
            string column,
            string principalTable)
        {
            migrationBuilder.Sql(
                $"""
                SET @admin_speaking_fk = (
                    SELECT CONSTRAINT_NAME
                    FROM information_schema.KEY_COLUMN_USAGE
                    WHERE CONSTRAINT_SCHEMA = DATABASE()
                      AND TABLE_NAME = '{table}'
                      AND COLUMN_NAME = '{column}'
                      AND REFERENCED_TABLE_NAME = '{principalTable}'
                    LIMIT 1
                )
                """);
            migrationBuilder.Sql(
                $"""
                SET @admin_speaking_drop_fk = IF(
                    @admin_speaking_fk IS NULL,
                    'SELECT 1',
                    CONCAT(
                        'ALTER TABLE `{table}` DROP FOREIGN KEY `',
                        REPLACE(@admin_speaking_fk, '`', '``'),
                        '`'
                    )
                )
                """);
            migrationBuilder.Sql(
                "PREPARE admin_speaking_drop_fk_stmt FROM @admin_speaking_drop_fk");
            migrationBuilder.Sql("EXECUTE admin_speaking_drop_fk_stmt");
            migrationBuilder.Sql("DEALLOCATE PREPARE admin_speaking_drop_fk_stmt");
        }
    }
}
