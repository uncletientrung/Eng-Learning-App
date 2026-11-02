using EnglishLearning.DAL.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20261102093000_AddWritingAdminMetadata")]
public partial class AddWritingAdminMetadata : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(
            "ALTER TABLE `writing_exercises` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;");

        migrationBuilder.AddColumn<string>(
            name: "status",
            table: "writing_exercises",
            type: "varchar(20)",
            maxLength: 20,
            nullable: false,
            defaultValue: "PUBLISHED");

        migrationBuilder.AddColumn<DateTime>(
            name: "updated_at",
            table: "writing_exercises",
            type: "timestamp",
            nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "status",
            table: "writing_exercises");

        migrationBuilder.DropColumn(
            name: "updated_at",
            table: "writing_exercises");

        migrationBuilder.Sql(
            "ALTER TABLE `writing_exercises` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;");
    }
}
