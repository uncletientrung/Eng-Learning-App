using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RenameExampleColToexample_enAndAddedexample_vi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Example",
                table: "idioms",
                newName: "example_vi");

            migrationBuilder.AddColumn<string>(
                name: "example_en",
                table: "idioms",
                type: "text",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "example_en",
                table: "idioms");

            migrationBuilder.RenameColumn(
                name: "example_vi",
                table: "idioms",
                newName: "Example");
        }
    }
}
