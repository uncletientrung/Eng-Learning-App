using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SpeakingResultsOnAttempts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                SET @speaking_result_column_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'user_speaking_attempts'
                      AND column_name = 'grading_result'
                );
                SET @speaking_result_sql = IF(
                    @speaking_result_column_exists = 0,
                    'ALTER TABLE `user_speaking_attempts` ADD COLUMN `grading_result` longtext NULL',
                    'SELECT 1'
                );
                PREPARE speaking_result_stmt FROM @speaking_result_sql;
                EXECUTE speaking_result_stmt;
                DEALLOCATE PREPARE speaking_result_stmt;

                SET @speaking_attempt_column_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'speaking_criterion_scores'
                      AND column_name = 'attempt_id'
                );
                SET @speaking_attempt_sql = IF(
                    @speaking_attempt_column_exists = 0,
                    'ALTER TABLE `speaking_criterion_scores` ADD COLUMN `attempt_id` int NULL',
                    'SELECT 1'
                );
                PREPARE speaking_attempt_stmt FROM @speaking_attempt_sql;
                EXECUTE speaking_attempt_stmt;
                DEALLOCATE PREPARE speaking_attempt_stmt;

                SET @speaking_issues_column_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'speaking_criterion_scores'
                      AND column_name = 'Issues'
                );
                SET @speaking_issues_sql = IF(
                    @speaking_issues_column_exists = 0,
                    'ALTER TABLE `speaking_criterion_scores` ADD COLUMN `Issues` longtext NULL',
                    'SELECT 1'
                );
                PREPARE speaking_issues_stmt FROM @speaking_issues_sql;
                EXECUTE speaking_issues_stmt;
                DEALLOCATE PREPARE speaking_issues_stmt;
                """);

            migrationBuilder.Sql("""
                UPDATE `user_speaking_attempts` AS attempt
                INNER JOIN `speaking_grades` AS grade
                    ON grade.`attempt_id` = attempt.`Id`
                   AND grade.`Id` = (
                       SELECT MAX(latest.`Id`)
                       FROM `speaking_grades` AS latest
                       WHERE latest.`attempt_id` = attempt.`Id`
                   )
                SET attempt.`grading_result` = grade.`Feedback`,
                    attempt.`overall_score` = COALESCE(
                        grade.`overall_score`,
                        attempt.`overall_score`
                    );

                UPDATE `speaking_criterion_scores` AS score
                INNER JOIN `speaking_grades` AS grade
                    ON grade.`Id` = score.`grade_id`
                   AND grade.`Id` = (
                       SELECT MAX(latest.`Id`)
                       FROM `speaking_grades` AS latest
                       WHERE latest.`attempt_id` = grade.`attempt_id`
                   )
                SET score.`attempt_id` = grade.`attempt_id`;

                DELETE FROM `speaking_criterion_scores`
                WHERE `attempt_id` IS NULL;

                UPDATE `speaking_criterion_scores`
                SET `Issues` = '[]'
                WHERE `Issues` IS NULL;

                ALTER TABLE `speaking_criterion_scores`
                    MODIFY COLUMN `attempt_id` int NOT NULL,
                    MODIFY COLUMN `Issues` longtext NOT NULL;
                """);

            migrationBuilder.Sql("""
                SET @speaking_score_fk = (
                    SELECT constraint_name
                    FROM information_schema.key_column_usage
                    WHERE table_schema = DATABASE()
                      AND table_name = 'speaking_criterion_scores'
                      AND column_name = 'grade_id'
                      AND referenced_table_name = 'speaking_grades'
                    LIMIT 1
                );
                SET @speaking_drop_fk_sql = IF(
                    @speaking_score_fk IS NULL,
                    'SELECT 1',
                    CONCAT(
                        'ALTER TABLE `speaking_criterion_scores` DROP FOREIGN KEY `',
                        REPLACE(@speaking_score_fk, '`', '``'),
                        '`'
                    )
                );
                PREPARE speaking_drop_fk_stmt FROM @speaking_drop_fk_sql;
                EXECUTE speaking_drop_fk_stmt;
                DEALLOCATE PREPARE speaking_drop_fk_stmt;

                SET @speaking_old_indexes = (
                    SELECT GROUP_CONCAT(
                        CONCAT('DROP INDEX `', index_name, '`')
                        SEPARATOR ', '
                    )
                    FROM (
                        SELECT DISTINCT index_name
                        FROM information_schema.statistics
                        WHERE table_schema = DATABASE()
                          AND table_name = 'speaking_criterion_scores'
                          AND column_name = 'grade_id'
                          AND index_name <> 'PRIMARY'
                    ) AS old_indexes
                );
                SET @speaking_drop_indexes_sql = IF(
                    @speaking_old_indexes IS NULL,
                    'SELECT 1',
                    CONCAT(
                        'ALTER TABLE `speaking_criterion_scores` ',
                        @speaking_old_indexes
                    )
                );
                PREPARE speaking_drop_indexes_stmt
                    FROM @speaking_drop_indexes_sql;
                EXECUTE speaking_drop_indexes_stmt;
                DEALLOCATE PREPARE speaking_drop_indexes_stmt;

                ALTER TABLE `speaking_criterion_scores`
                    DROP COLUMN `grade_id`;
                DROP TABLE `speaking_grades`;
                """);

            migrationBuilder.CreateIndex(
                name: "IX_speaking_criterion_scores_attempt_id_criterion_code",
                table: "speaking_criterion_scores",
                columns: new[] { "attempt_id", "criterion_code" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_speaking_criterion_scores_user_speaking_attempts_attempt_id",
                table: "speaking_criterion_scores",
                column: "attempt_id",
                principalTable: "user_speaking_attempts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_speaking_criterion_scores_user_speaking_attempts_attempt_id",
                table: "speaking_criterion_scores");

            migrationBuilder.DropIndex(
                name: "IX_speaking_criterion_scores_attempt_id_criterion_code",
                table: "speaking_criterion_scores");

            migrationBuilder.CreateTable(
                name: "speaking_grades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation(
                            "MySql:ValueGenerationStrategy",
                            MySqlValueGenerationStrategy.IdentityColumn),
                    attempt_id = table.Column<int>(type: "int", nullable: false),
                    grader_id = table.Column<int>(type: "int", nullable: true),
                    overall_score = table.Column<decimal>(
                        type: "decimal(3,1)",
                        nullable: true),
                    Feedback = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(
                        type: "timestamp",
                        nullable: false,
                        defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(
                        type: "timestamp",
                        nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speaking_grades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_speaking_grades_user_grader_id",
                        column: x => x.grader_id,
                        principalTable: "user",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_speaking_grades_user_speaking_attempts_attempt_id",
                        column: x => x.attempt_id,
                        principalTable: "user_speaking_attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_grades_attempt_id",
                table: "speaking_grades",
                column: "attempt_id");
            migrationBuilder.CreateIndex(
                name: "IX_speaking_grades_grader_id",
                table: "speaking_grades",
                column: "grader_id");

            migrationBuilder.AddColumn<int>(
                name: "grade_id",
                table: "speaking_criterion_scores",
                type: "int",
                nullable: true);

            migrationBuilder.Sql("""
                INSERT INTO `speaking_grades`
                    (`attempt_id`, `grader_id`, `overall_score`, `Feedback`, `created_at`)
                SELECT attempt.`Id`,
                       NULL,
                       attempt.`overall_score`,
                       attempt.`grading_result`,
                       COALESCE(attempt.`completed_at`, CURRENT_TIMESTAMP)
                FROM `user_speaking_attempts` AS attempt
                WHERE attempt.`grading_result` IS NOT NULL
                   OR EXISTS (
                       SELECT 1
                       FROM `speaking_criterion_scores` AS score
                       WHERE score.`attempt_id` = attempt.`Id`
                   );

                UPDATE `speaking_criterion_scores` AS score
                INNER JOIN `speaking_grades` AS grade
                    ON grade.`attempt_id` = score.`attempt_id`
                SET score.`grade_id` = grade.`Id`;

                DELETE FROM `speaking_criterion_scores`
                WHERE `grade_id` IS NULL;

                ALTER TABLE `speaking_criterion_scores`
                    MODIFY COLUMN `grade_id` int NOT NULL;
                """);

            migrationBuilder.DropColumn(
                name: "Issues",
                table: "speaking_criterion_scores");

            migrationBuilder.DropColumn(
                name: "attempt_id",
                table: "speaking_criterion_scores");

            migrationBuilder.DropColumn(
                name: "grading_result",
                table: "user_speaking_attempts");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_criterion_scores_grade_id_criterion_code",
                table: "speaking_criterion_scores",
                columns: new[] { "grade_id", "criterion_code" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_speaking_criterion_scores_speaking_grades_grade_id",
                table: "speaking_criterion_scores",
                column: "grade_id",
                principalTable: "speaking_grades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
