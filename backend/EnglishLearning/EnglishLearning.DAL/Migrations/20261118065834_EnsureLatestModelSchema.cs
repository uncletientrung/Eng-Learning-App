using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class EnsureLatestModelSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                ALTER TABLE `topics`
                ADD COLUMN IF NOT EXISTS `image_url` varchar(255) NULL;

                ALTER TABLE `idioms`
                ADD COLUMN IF NOT EXISTS `topic_id` int NOT NULL DEFAULT 0,
                ADD COLUMN IF NOT EXISTS `example_en` text NULL,
                ADD COLUMN IF NOT EXISTS `example_vi` text NULL;

                SET @idiom_example_exists = (
                    SELECT COUNT(*) FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'idioms'
                      AND column_name = 'Example'
                );
                SET @idiom_example_vi_exists = (
                    SELECT COUNT(*) FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'idioms'
                      AND column_name = 'example_vi'
                );
                SET @idiom_rename_sql = IF(
                    @idiom_example_exists > 0 AND @idiom_example_vi_exists > 0,
                    'UPDATE `idioms` SET `example_vi` = COALESCE(`example_vi`, `Example`)',
                    IF(
                        @idiom_example_exists > 0,
                        'ALTER TABLE `idioms` CHANGE COLUMN `Example` `example_vi` text NULL',
                        'SELECT 1'
                    )
                );
                PREPARE idiom_rename_stmt FROM @idiom_rename_sql;
                EXECUTE idiom_rename_stmt;
                DEALLOCATE PREPARE idiom_rename_stmt;

                ALTER TABLE `translation_exercises`
                ADD COLUMN IF NOT EXISTS `parent_id` int NULL,
                ADD COLUMN IF NOT EXISTS `display_order` int NOT NULL DEFAULT 0,
                ADD COLUMN IF NOT EXISTS `title` varchar(255) NULL;

                SET @translation_type_exists = (
                    SELECT COUNT(*) FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'translation_exercises'
                      AND column_name = 'type'
                );
                SET @translation_title_exists = (
                    SELECT COUNT(*) FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name = 'translation_exercises'
                      AND column_name = 'title'
                );
                SET @translation_type_sql = IF(
                    @translation_type_exists > 0 AND @translation_title_exists > 0,
                    'ALTER TABLE `translation_exercises` DROP COLUMN `type`',
                    IF(
                        @translation_type_exists > 0,
                        'ALTER TABLE `translation_exercises` CHANGE COLUMN `type` `title` varchar(255) NOT NULL',
                        'SELECT 1'
                    )
                );
                PREPARE translation_type_stmt FROM @translation_type_sql;
                EXECUTE translation_type_stmt;
                DEALLOCATE PREPARE translation_type_stmt;

                UPDATE `translation_exercises`
                SET `title` = ''
                WHERE `title` IS NULL;

                ALTER TABLE `translation_exercises`
                MODIFY COLUMN `topic_id` int NULL,
                MODIFY COLUMN `title` varchar(255) NOT NULL;

                CREATE TABLE IF NOT EXISTS `translation_exercises_content` (
                    `Id` int NOT NULL AUTO_INCREMENT,
                    `parent_id` int NULL,
                    `display_order` int NOT NULL DEFAULT 0,
                    `vi` longtext NOT NULL,
                    `answer` longtext NOT NULL,
                    CONSTRAINT `PK_translation_exercises_content` PRIMARY KEY (`Id`)
                ) ENGINE=InnoDB;

                ALTER TABLE `user_translation_attempts`
                ADD COLUMN IF NOT EXISTS `content_id` int NULL;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
