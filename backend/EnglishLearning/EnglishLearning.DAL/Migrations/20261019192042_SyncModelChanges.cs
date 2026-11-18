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
            migrationBuilder.Sql(
                """
                SET @sync_model_index_exists = (
                    SELECT COUNT(*)
                    FROM (
                        SELECT index_name,
                               MIN(non_unique) AS non_unique,
                               GROUP_CONCAT(column_name ORDER BY seq_in_index SEPARATOR ',') AS index_columns
                        FROM information_schema.statistics
                        WHERE table_schema = DATABASE()
                          AND table_name = 'user_writing_criterion_scores'
                        GROUP BY index_name
                    ) AS existing_indexes
                    WHERE index_name = 'IX_user_writing_criterion_scores_attempt_id_criterion_code'
                      AND non_unique = 0
                      AND index_columns = 'attempt_id,criterion_code'
                );
                SET @sync_model_index_sql = IF(
                    @sync_model_index_exists > 0,
                    'SELECT 1',
                    'CREATE UNIQUE INDEX `IX_user_writing_criterion_scores_attempt_id_criterion_code` ON `user_writing_criterion_scores` (`attempt_id`, `criterion_code`)'
                );
                PREPARE sync_model_index_stmt FROM @sync_model_index_sql;
                EXECUTE sync_model_index_stmt;
                DEALLOCATE PREPARE sync_model_index_stmt;
                """);

            migrationBuilder.Sql(
                """
                SET @sync_model_old_index_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.statistics
                    WHERE table_schema = DATABASE()
                      AND table_name = 'user_writing_criterion_scores'
                      AND index_name = 'IX_user_writing_criterion_scores_attempt_id'
                );
                SET @sync_model_old_index_sql = IF(
                    @sync_model_old_index_exists > 0,
                    'DROP INDEX `IX_user_writing_criterion_scores_attempt_id` ON `user_writing_criterion_scores`',
                    'SELECT 1'
                );
                PREPARE sync_model_old_index_stmt FROM @sync_model_old_index_sql;
                EXECUTE sync_model_old_index_stmt;
                DEALLOCATE PREPARE sync_model_old_index_stmt;
                """);

            AddForeignKeyIfMissing(
                migrationBuilder,
                "user_writing_attempts",
                "user_id",
                "user",
                "FK_user_writing_attempts_user_user_id");
            AddForeignKeyIfMissing(
                migrationBuilder,
                "user_writing_attempts",
                "exercise_id",
                "writing_exercises",
                "FK_user_writing_attempts_writing_exercises_exercise_id");
            AddForeignKeyIfMissing(
                migrationBuilder,
                "writing_exercises",
                "topic_id",
                "topics",
                "FK_writing_exercises_topics_topic_id");
        }

        private static void AddForeignKeyIfMissing(
            MigrationBuilder migrationBuilder,
            string table,
            string column,
            string principalTable,
            string constraintName)
        {
            migrationBuilder.Sql(
                $"""
                SET @sync_model_fk_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.key_column_usage AS kcu
                    INNER JOIN information_schema.referential_constraints AS rc
                        ON rc.constraint_schema = kcu.constraint_schema
                       AND rc.table_name = kcu.table_name
                       AND rc.constraint_name = kcu.constraint_name
                    WHERE kcu.table_schema = DATABASE()
                      AND kcu.table_name = '{table}'
                      AND kcu.column_name = '{column}'
                      AND kcu.constraint_name = '{constraintName}'
                      AND kcu.referenced_table_name = '{principalTable}'
                      AND kcu.referenced_column_name = 'Id'
                      AND rc.delete_rule IN ('RESTRICT', 'NO ACTION')
                );
                SET @sync_model_fk_on_table_exists = (
                    SELECT COUNT(*)
                    FROM information_schema.referential_constraints
                    WHERE constraint_schema = DATABASE()
                      AND table_name = '{table}'
                      AND constraint_name = '{constraintName}'
                );
                SET @sync_model_fk_drop_sql = IF(
                    @sync_model_fk_on_table_exists > 0 AND @sync_model_fk_exists = 0,
                    'ALTER TABLE `{table}` DROP FOREIGN KEY `{constraintName}`',
                    'SELECT 1'
                );
                PREPARE sync_model_fk_drop_stmt FROM @sync_model_fk_drop_sql;
                EXECUTE sync_model_fk_drop_stmt;
                DEALLOCATE PREPARE sync_model_fk_drop_stmt;
                SET @sync_model_fk_sql = IF(
                    @sync_model_fk_exists > 0,
                    'SELECT 1',
                    'ALTER TABLE `{table}` ADD CONSTRAINT `{constraintName}` FOREIGN KEY (`{column}`) REFERENCES `{principalTable}` (`Id`) ON DELETE RESTRICT'
                );
                PREPARE sync_model_fk_stmt FROM @sync_model_fk_sql;
                EXECUTE sync_model_fk_stmt;
                DEALLOCATE PREPARE sync_model_fk_stmt;
                """);
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
