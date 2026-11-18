using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddedTopicIdToIdioms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "topic_id",
                table: "idioms",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "topic_id",
                table: "idioms");
        }
    }
}
