using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddTranslationExerciseParentRecords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_translation_exercises_topics_topic_id",
                table: "translation_exercises");

            migrationBuilder.RenameColumn(
                name: "type",
                table: "translation_exercises",
                newName: "title");

            migrationBuilder.AlterColumn<string>(
                name: "title",
                table: "translation_exercises",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(sbyte),
                oldType: "tinyint")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "topic_id",
                table: "translation_exercises",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "source_text",
                table: "translation_exercises",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "reference_translation",
                table: "translation_exercises",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Level",
                table: "translation_exercises",
                type: "varchar(2)",
                maxLength: 2,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(2)",
                oldMaxLength: 2)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Explanation",
                table: "translation_exercises",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "parent_id",
                table: "translation_exercises",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_translation_exercises_parent_id",
                table: "translation_exercises",
                column: "parent_id");

            migrationBuilder.AddForeignKey(
                name: "FK_translation_exercises_topics_topic_id",
                table: "translation_exercises",
                column: "topic_id",
                principalTable: "topics",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_translation_exercises_translation_exercises_parent_id",
                table: "translation_exercises",
                column: "parent_id",
                principalTable: "translation_exercises",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_translation_exercises_topics_topic_id",
                table: "translation_exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_translation_exercises_translation_exercises_parent_id",
                table: "translation_exercises");

            migrationBuilder.DropIndex(
                name: "IX_translation_exercises_parent_id",
                table: "translation_exercises");

            migrationBuilder.Sql("""
                DELETE FROM `translation_exercises`
                WHERE `parent_id` IS NULL
                  AND `title` IN (
                    'Cấu trúc câu cơ bản',
                    'Collocations & Vocab',
                    'Dịch đoạn văn Band 6.5',
                    'Dịch đoạn văn Band 8.0',
                    'Dịch Essay hoàn chỉnh'
                  );
                """);

            migrationBuilder.DropColumn(
                name: "parent_id",
                table: "translation_exercises");

            migrationBuilder.AlterColumn<int>(
                name: "topic_id",
                table: "translation_exercises",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "source_text",
                table: "translation_exercises",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "reference_translation",
                table: "translation_exercises",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Level",
                table: "translation_exercises",
                type: "varchar(2)",
                maxLength: 2,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(2)",
                oldMaxLength: 2,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Explanation",
                table: "translation_exercises",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<sbyte>(
                name: "title",
                table: "translation_exercises",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "translation_exercises",
                newName: "type");

            migrationBuilder.AddForeignKey(
                name: "FK_translation_exercises_topics_topic_id",
                table: "translation_exercises",
                column: "topic_id",
                principalTable: "topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
