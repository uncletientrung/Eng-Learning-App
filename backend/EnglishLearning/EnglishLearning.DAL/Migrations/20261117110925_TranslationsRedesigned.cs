using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class TranslationsRedesigned : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Explanation",
                table: "translation_exercises");

            migrationBuilder.DropColumn(
                name: "reference_translation",
                table: "translation_exercises");

            migrationBuilder.DropColumn(
                name: "source_text",
                table: "translation_exercises");

            migrationBuilder.AddColumn<int>(
                name: "display_order",
                table: "translation_exercises",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "translation_exercises_content",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    parent_id = table.Column<int>(type: "int", nullable: true),
                    display_order = table.Column<int>(type: "int", nullable: false),
                    vi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    answer = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_translation_exercises_content", x => x.Id);
                    table.ForeignKey(
                        name: "FK_translation_exercises_content_translation_exercises_parent_id",
                        column: x => x.parent_id,
                        principalTable: "translation_exercises",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_translation_exercises_content_parent_id",
                table: "translation_exercises_content",
                column: "parent_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "translation_exercises_content");

            migrationBuilder.DropColumn(
                name: "display_order",
                table: "translation_exercises");

            migrationBuilder.AddColumn<string>(
                name: "Explanation",
                table: "translation_exercises",
                type: "text",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "reference_translation",
                table: "translation_exercises",
                type: "text",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "source_text",
                table: "translation_exercises",
                type: "text",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
