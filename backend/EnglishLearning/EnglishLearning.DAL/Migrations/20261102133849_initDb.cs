using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class initDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "grammar_categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    parent_id = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    description = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    display_order = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grammar_categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_grammar_categories_grammar_categories_parent_id",
                        column: x => x.parent_id,
                        principalTable: "grammar_categories",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "idioms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    idiom_text = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    first_letter = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phonetic = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    meaning_en = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    meaning_vi = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Example = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_idioms", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Reading_Test",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Reading_Test_title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Level = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reading_Test", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Username = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<sbyte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "grammar_sections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    category_id = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    display_order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grammar_sections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_grammar_sections_grammar_categories_category_id",
                        column: x => x.category_id,
                        principalTable: "grammar_categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "topics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    module_type = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    create_by = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    create_by_user_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_topics_user_create_by_user_id",
                        column: x => x.create_by_user_id,
                        principalTable: "user",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "listening_exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    topic_id = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    image_url = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    audio_type = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    audio_url = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Transcript = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_listening_exercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_listening_exercises_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reading_exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    topic_id = table.Column<int>(type: "int", nullable: true),
                    ReadingTest_id = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    image_url = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Passage = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reading_exercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reading_exercises_Reading_Test_ReadingTest_id",
                        column: x => x.ReadingTest_id,
                        principalTable: "Reading_Test",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reading_exercises_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "speaking_exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    topic_id = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    speaking_type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speaking_exercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_speaking_exercises_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "translation_exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    topic_id = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    type = table.Column<sbyte>(type: "tinyint", nullable: false),
                    source_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    reference_translation = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Explanation = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_translation_exercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_translation_exercises_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "words",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    topic_id = table.Column<int>(type: "int", nullable: false),
                    word = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Meaning = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phonetic = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    part_of_speech = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Example = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_words", x => x.Id);
                    table.ForeignKey(
                        name: "FK_words_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "writing_exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    topic_id = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    image_url = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    writing_type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    question_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Instruction = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    reference_answer = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_writing_exercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_writing_exercises_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "listening_questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    question_number = table.Column<sbyte>(type: "tinyint", nullable: false),
                    question_type = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    question_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    correct_answer = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Explanation = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_listening_questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_listening_questions_listening_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "listening_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_listening_attempts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<sbyte>(type: "tinyint", nullable: false),
                    total_questions = table.Column<sbyte>(type: "tinyint", nullable: false),
                    correct_answers_num = table.Column<sbyte>(type: "tinyint", nullable: false),
                    started_at = table.Column<DateTime>(type: "timestamp", nullable: false),
                    completed_at = table.Column<DateTime>(type: "timestamp", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_listening_attempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_listening_attempts_listening_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "listening_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_listening_attempts_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reading_questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    question_number = table.Column<sbyte>(type: "tinyint", nullable: false),
                    question_type = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    question_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    correct_answer = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Explanation = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reading_questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reading_questions_reading_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "reading_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_reading_attempts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<sbyte>(type: "tinyint", nullable: false),
                    total_questions = table.Column<sbyte>(type: "tinyint", nullable: false),
                    correct_answers_num = table.Column<sbyte>(type: "tinyint", nullable: false),
                    started_at = table.Column<DateTime>(type: "timestamp", nullable: false),
                    completed_at = table.Column<DateTime>(type: "timestamp", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_reading_attempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_reading_attempts_reading_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "reading_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_reading_attempts_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "speaking_questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    question_number = table.Column<sbyte>(type: "tinyint", nullable: false),
                    question_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    closing = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    cues = table.Column<string>(type: "json", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    preparation_time = table.Column<int>(type: "int", nullable: true),
                    response_time = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speaking_questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_speaking_questions_speaking_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "speaking_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_speaking_attempts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    overall_score = table.Column<decimal>(type: "decimal(3,1)", nullable: true),
                    grading_result = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    started_at = table.Column<DateTime>(type: "timestamp", nullable: false),
                    completed_at = table.Column<DateTime>(type: "timestamp", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_speaking_attempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_speaking_attempts_speaking_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "speaking_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_speaking_attempts_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_translation_attempts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    user_response = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Score = table.Column<sbyte>(type: "tinyint", nullable: false),
                    llm_feedback = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_translation_attempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_translation_attempts_translation_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "translation_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_translation_attempts_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_word_progress",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    word_id = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<sbyte>(type: "tinyint", nullable: false),
                    next_review_at = table.Column<DateTime>(type: "date", nullable: false),
                    last_reviewed_at = table.Column<DateTime>(type: "date", nullable: false),
                    Level = table.Column<sbyte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_word_progress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_word_progress_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_word_progress_words_word_id",
                        column: x => x.word_id,
                        principalTable: "words",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_writing_attempts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    exercise_id = table.Column<int>(type: "int", nullable: false),
                    user_response = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    overall_score = table.Column<decimal>(type: "decimal(3,1)", nullable: false),
                    llm_raw_response = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    started_at = table.Column<DateTime>(type: "timestamp", nullable: false),
                    completed_at = table.Column<DateTime>(type: "timestamp", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_writing_attempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_writing_attempts_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_user_writing_attempts_writing_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "writing_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "listening_fill_blank_answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    blank_number = table.Column<sbyte>(type: "tinyint", nullable: false),
                    correct_answer = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_listening_fill_blank_answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_listening_fill_blank_answers_listening_questions_question_id",
                        column: x => x.question_id,
                        principalTable: "listening_questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "listening_question_options",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    option_key = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    option_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    is_correct = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_listening_question_options", x => x.Id);
                    table.ForeignKey(
                        name: "FK_listening_question_options_listening_questions_question_id",
                        column: x => x.question_id,
                        principalTable: "listening_questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_listening_answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    attempt_id = table.Column<int>(type: "int", nullable: false),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    user_answer = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    is_correct = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_listening_answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_listening_answers_listening_questions_question_id",
                        column: x => x.question_id,
                        principalTable: "listening_questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_listening_answers_user_listening_attempts_attempt_id",
                        column: x => x.attempt_id,
                        principalTable: "user_listening_attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reading_fill_blank_answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    blank_number = table.Column<sbyte>(type: "tinyint", nullable: false),
                    correct_answer = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reading_fill_blank_answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reading_fill_blank_answers_reading_questions_question_id",
                        column: x => x.question_id,
                        principalTable: "reading_questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reading_question_options",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    option_key = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    option_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    is_correct = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reading_question_options", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reading_question_options_reading_questions_question_id",
                        column: x => x.question_id,
                        principalTable: "reading_questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_reading_answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    attempt_id = table.Column<int>(type: "int", nullable: false),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    user_answer = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    is_correct = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_reading_answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_reading_answers_reading_questions_question_id",
                        column: x => x.question_id,
                        principalTable: "reading_questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_reading_answers_user_reading_attempts_attempt_id",
                        column: x => x.attempt_id,
                        principalTable: "user_reading_attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "speaking_criterion_scores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    attempt_id = table.Column<int>(type: "int", nullable: false),
                    criterion_code = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Score = table.Column<decimal>(type: "decimal(3,1)", nullable: false),
                    Feedback = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Strengths = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Weaknesses = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Suggestions = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Issues = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speaking_criterion_scores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_speaking_criterion_scores_user_speaking_attempts_attempt_id",
                        column: x => x.attempt_id,
                        principalTable: "user_speaking_attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_speaking_answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    attempt_id = table.Column<int>(type: "int", nullable: false),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    audio_url = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    transcript = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    submitted_at = table.Column<DateTime>(type: "timestamp", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_speaking_answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_speaking_answers_speaking_questions_question_id",
                        column: x => x.question_id,
                        principalTable: "speaking_questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_speaking_answers_user_speaking_attempts_attempt_id",
                        column: x => x.attempt_id,
                        principalTable: "user_speaking_attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user_writing_criterion_scores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    attempt_id = table.Column<int>(type: "int", nullable: false),
                    criterion_code = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Score = table.Column<decimal>(type: "decimal(3,1)", nullable: false),
                    Feedback = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Strengths = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Weaknesses = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Suggestions = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Issues = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_writing_criterion_scores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_writing_criterion_scores_user_writing_attempts_attempt_~",
                        column: x => x.attempt_id,
                        principalTable: "user_writing_attempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Reading_Test",
                columns: new[] { "Id", "created_at", "Level", "Reading_Test_title" },
                values: new object[] { 1, new DateTime(2026, 10, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hard", "Cambridge 20 - Test 1" });

            migrationBuilder.InsertData(
                table: "reading_exercises",
                columns: new[] { "Id", "Content", "created_at", "image_url", "Level", "Passage", "ReadingTest_id", "Title", "topic_id" },
                values: new object[,]
                {
                    { 1, "<h2><strong>The kākāpō</strong></h2><p>The kākāpō is a nocturnal, flightless parrot that is critically endangered and one of New Zealand’s unique treasures</p><p>The kākāpō, also known as the owl parrot, is a large, forest-dwelling bird, with a pale owl-like face. Up to 64 cm in length, it has predominantly yellow-green feathers, forward-facing eyes, a large grey beak, large blue feet, and relatively short wings and tail. It is the world’s only flightless parrot, and is also possibly one of the world’s longest-living birds, with a reported lifespan of up to 100 years.</p><p>Kākāpō are solitary birds and tend to occupy the same home range for many years. They forage on the ground and climb high into trees. They often leap from trees and flap their wings, but at best manage a controlled descent to the ground. They are entirely vegetarian, with their diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds.</p><p>Kākāpō breed in summer and autumn, but only in years when food is plentiful. Males play no part in incubation or chick-rearing – females alone incubate eggs and feed the chicks. The 1–4 eggs are laid in soil, which is repeatedly turned over before and during incubation. The female kākāpō has to spend long periods away from the nest searching for food, which leaves the unattended eggs and chicks particularly vulnerable to predators.</p><p>Before humans arrived, kākāpō were common throughout New Zealand’s forests. However, this all changed with the arrival of the first Polynesian settlers about 700 years ago. For the early settlers, the flightless kākāpō was easy prey. They ate its meat and used its feathers to make soft cloaks. With them came the Polynesian dog and rat, which also preyed on kākāpō. By the time European colonisers arrived in the early 1800s, kākāpō had become confined to the central North Island and forested parts of the South Island. The fall in kākāpō numbers was accelerated by European colonisation. A great deal of habitat was lost through forest clearance, and introduced species such as deer depleted the remaining forests of food. Other predators such as cats, stoats and two more species of rat were also introduced. The kākāpō were in serious trouble.</p><p>In 1894, the New Zealand government launched its first attempt to save the kākāpō. Conservationist Richard Henry led an effort to relocate several hundred of the birds to predator-free Resolution Island in Fiordland. Unfortunately, the island didn’t remain predator free – stoats arrived within six years, eventually destroying the kākāpō population. By the mid-1900s, the kākāpō was practically a lost species. Only a few clung to life in the most isolated parts of New Zealand.</p><p>From 1949 to 1973, the newly formed New Zealand Wildlife Service made over 60 expeditions to find kākāpō, focusing mainly on Fiordland. Six were caught, but there were no females amongst them and all but one died within a few months of captivity. In 1974, a new initiative was launched, and by 1977, 18 more kākāpō were found in Fiordland. However, there were still no females. In 1977, a large population of males was spotted in Rakiura – a large island free from stoats, ferrets and weasels. There were about 200 individuals, and in 1980 it was confirmed females were also present. These birds have been the foundation of all subsequent work in managing the species.</p><p>Unfortunately, predation by feral cats on Rakiura Island led to a rapid decline in kākāpō numbers. As a result, during 1980-97, the surviving population was evacuated to three island sanctuaries: Codfish Island, Maud Island and Little Barrier Island. However, breeding success was hard to achieve. Rats were found to be a major predator of kākāpō chicks and an insufficient number of chicks survived to offset adult mortality. By 1995, although at least 12 chicks had been produced on the islands, only three had survived. The kākāpō population had dropped to 51 birds. The critical situation prompted an urgent review of kākāpō management in New Zealand.</p><p>In 1996, a new Recovery Plan was launched, together with a specialist advisory group called the Kākāpō Scientific and Technical Advisory Committee and a higher amount of funding. Renewed steps were taken to control predators on the three islands. Cats were eradicated from Little Barrier Island in 1980, and possums were eradicated from Codfish Island by 1986. However, the population did not start to increase until rats were removed from all three islands, and the birds were more intensively managed. This involved moving the birds between islands, supplementary feeding of adults and rescuing and hand-raising any failing chicks.</p><p>After the first five years of the Recovery Plan, the population was on target. By 2000, five new females had been produced, and the total population had grown to 62 birds. For the first time, there was cautious optimism for the future of kākāpō and by June 2020, a total of 210 birds was recorded.</p><p>Today, kākāpō management continues to be guided by the kākāpō Recovery Plan. Its key goals are: minimise the loss of genetic diversity in the kākāpō population, restore or maintain sufficient habitat to accommodate the expected increase in the kākāpō population, and ensure stakeholders continue to be fully engaged in the preservation of the species.</p>", new DateTime(2026, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "", "", 1, "", null },
                    { 2, "<h2 class=\"text-2xl font-bold text-[#1a1a12]\">Bài chưa có nội dung</h2>", new DateTime(2026, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "", "", 1, "", null },
                    { 3, "<h2><b>How stress affects our judgement</b></h2><p>Some of the most important decisions of our lives occur while we’re feeling stressed and anxious. From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions. But do we become better or worse at processing and using information under such circumstances?</p><p>My colleague and I, both neuroscientists, wanted to investigate how the mind operates under stress, so we visited some local fire stations. Firefighters’ workdays vary quite a bit. Some are pretty relaxed; they’ll spend their time washing the truck, cleaning equipment, cooking meals and reading. Other days can be hectic, with numerous life-threatening incidents to attend to; they’ll enter burning homes to rescue trapped residents, and assist with medical emergencies. These ups and downs presented the perfect setting for an experiment on how people’s ability to use information changes when they feel under pressure.</p><p>We found that perceived threat acted as a trigger for a stress reaction that made the task of processing information easier for the firefighters - but only as long as it conveyed bad news.</p><p>This is how we arrived at these results. We asked the firefighters to estimate their likelihood of experiencing 40 different adverse events in their life, such as being involved in an accident or becoming a victim of card fraud. We then gave them either good news (that their likelihood of experiencing these events was lower than they’d thought) or bad news (that it was higher) and asked them to provide new estimates.</p><p>People are normally quite optimistic - they will ignore bad news and embrace the good. This is what happened when the firefighters were relaxed; but when they were under stress, a different pattern emerged. Under these conditions, they became hyper-vigilant to bad news, even when it had nothing to do with their job (such as learning that the likelihood of card fraud was higher than they’d thought), and altered their beliefs in response. In contrast, stress didn’t change how they responded to good news (such as learning that the likelihood of card fraud was lower than they’d thought).</p><p>Back in our lab, we observed the same pattern in students who were told they had to give a surprise public speech, which would be judged by a panel, recorded and posted online. Sure enough, their cortisol levels spiked, their heart rates went up and they suddenly became better at processing unrelated, yet alarming, information about rates of disease and violence.</p><p>When we experience stressful events, a physiological change is triggered that causes us to take in warnings and focus on what might go wrong. Brain imaging reveals that this ’switch’ is related to a sudden boost in a neural signal important for learning, specifically in response to unexpected warning signs, such as faces expressing fear.</p><p>Such neural engineering could have helped prehistoric humans to survive. When our ancestors found themselves surrounded by hungry animals, they would have benefited from an increased ability to learn about hazards. In a safe environment, however, it would have been wasteful to be on high alert constantly. So, a neural switch that automatically increases or decreases our ability to process warnings in response to changes in our environment could have been useful. In fact, people with clinical depression and anxiety seem unable to switch away from a state in which they absorb all the negative messages around them.</p><p>It is also important to realise that stress travels rapidly from one person to the next. If a co-worker is stressed, we are more likely to tense up and feel stressed ourselves. We don’t even need to be in the same room with someone for their emotions to influence our behaviour. Studies show that if we observe positive feeds on social media, such as images of a pink sunset, we are more likely to post uplifting messages ourselves. If we observe negative posts, such as complaints about a long queue at the coffee shop, we will in turn create more negative posts.</p><p>In some ways, many of us now live as if we are in danger, constantly ready to tackle demanding emails and text messages, and respond to news alerts and comments on social media. Repeatedly checking your phone, according to a survey conducted by the American Psychological Association, is related to stress. In other words, a pre-programmed physiological reaction, which evolution has equipped us with to help us avoid famished predators, is now being triggered by an online post. Social media posting, according to one study, raises your pulse, makes you sweat, and enlarges your pupils more than most daily activities.</p><p>The fact that stress increases the likelihood that we will focus more on alarming messages, together with the fact that it spreads extremely rapidly, can create collective fear that is not always justified. After a stressful public event, such as a natural disaster or major financial crash, there is often a wave of alarming information in traditional and social media, which individuals become very aware of. But that has the effect of exaggerating existing danger. And so, a reliable pattern emerges - stress is triggered, spreading from one person to the next, which temporarily enhances the likelihood that people will take in negative reports, which increases stress further. As a result, trips are cancelled, even if the disaster took place across the globe; stocks are sold, even when holding on is the best thing to do.</p><p>The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions. Being aware of the close relationship between people’s emotional state and how they process information can help us frame our messages more effectively and become conscientious agents of change.</p>", new DateTime(2026, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "", "", 1, "", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_grammar_categories_parent_id",
                table: "grammar_categories",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "IX_grammar_sections_category_id",
                table: "grammar_sections",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_listening_exercises_topic_id",
                table: "listening_exercises",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_listening_fill_blank_answers_question_id",
                table: "listening_fill_blank_answers",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_listening_question_options_question_id",
                table: "listening_question_options",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_listening_questions_exercise_id",
                table: "listening_questions",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_reading_exercises_ReadingTest_id",
                table: "reading_exercises",
                column: "ReadingTest_id");

            migrationBuilder.CreateIndex(
                name: "IX_reading_exercises_topic_id",
                table: "reading_exercises",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_reading_fill_blank_answers_question_id",
                table: "reading_fill_blank_answers",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_reading_question_options_question_id",
                table: "reading_question_options",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_reading_questions_exercise_id",
                table: "reading_questions",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_criterion_scores_attempt_id_criterion_code",
                table: "speaking_criterion_scores",
                columns: new[] { "attempt_id", "criterion_code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_speaking_exercises_topic_id",
                table: "speaking_exercises",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_questions_exercise_id",
                table: "speaking_questions",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_topics_create_by_user_id",
                table: "topics",
                column: "create_by_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_translation_exercises_topic_id",
                table: "translation_exercises",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_listening_answers_attempt_id",
                table: "user_listening_answers",
                column: "attempt_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_listening_answers_question_id",
                table: "user_listening_answers",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_listening_attempts_exercise_id",
                table: "user_listening_attempts",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_listening_attempts_user_id",
                table: "user_listening_attempts",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_reading_answers_attempt_id",
                table: "user_reading_answers",
                column: "attempt_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_reading_answers_question_id",
                table: "user_reading_answers",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_reading_attempts_exercise_id",
                table: "user_reading_attempts",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_reading_attempts_user_id",
                table: "user_reading_attempts",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_speaking_answers_attempt_id_question_id",
                table: "user_speaking_answers",
                columns: new[] { "attempt_id", "question_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_speaking_answers_question_id",
                table: "user_speaking_answers",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_speaking_attempts_exercise_id",
                table: "user_speaking_attempts",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_speaking_attempts_user_id",
                table: "user_speaking_attempts",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_translation_attempts_exercise_id",
                table: "user_translation_attempts",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_translation_attempts_user_id",
                table: "user_translation_attempts",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_word_progress_user_id",
                table: "user_word_progress",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_word_progress_word_id",
                table: "user_word_progress",
                column: "word_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_writing_attempts_exercise_id",
                table: "user_writing_attempts",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_writing_attempts_user_id",
                table: "user_writing_attempts",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_writing_criterion_scores_attempt_id_criterion_code",
                table: "user_writing_criterion_scores",
                columns: new[] { "attempt_id", "criterion_code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_words_topic_id",
                table: "words",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_writing_exercises_topic_id",
                table: "writing_exercises",
                column: "topic_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "grammar_sections");

            migrationBuilder.DropTable(
                name: "idioms");

            migrationBuilder.DropTable(
                name: "listening_fill_blank_answers");

            migrationBuilder.DropTable(
                name: "listening_question_options");

            migrationBuilder.DropTable(
                name: "reading_fill_blank_answers");

            migrationBuilder.DropTable(
                name: "reading_question_options");

            migrationBuilder.DropTable(
                name: "speaking_criterion_scores");

            migrationBuilder.DropTable(
                name: "user_listening_answers");

            migrationBuilder.DropTable(
                name: "user_reading_answers");

            migrationBuilder.DropTable(
                name: "user_speaking_answers");

            migrationBuilder.DropTable(
                name: "user_translation_attempts");

            migrationBuilder.DropTable(
                name: "user_word_progress");

            migrationBuilder.DropTable(
                name: "user_writing_criterion_scores");

            migrationBuilder.DropTable(
                name: "grammar_categories");

            migrationBuilder.DropTable(
                name: "listening_questions");

            migrationBuilder.DropTable(
                name: "user_listening_attempts");

            migrationBuilder.DropTable(
                name: "reading_questions");

            migrationBuilder.DropTable(
                name: "user_reading_attempts");

            migrationBuilder.DropTable(
                name: "speaking_questions");

            migrationBuilder.DropTable(
                name: "user_speaking_attempts");

            migrationBuilder.DropTable(
                name: "translation_exercises");

            migrationBuilder.DropTable(
                name: "words");

            migrationBuilder.DropTable(
                name: "user_writing_attempts");

            migrationBuilder.DropTable(
                name: "listening_exercises");

            migrationBuilder.DropTable(
                name: "reading_exercises");

            migrationBuilder.DropTable(
                name: "speaking_exercises");

            migrationBuilder.DropTable(
                name: "writing_exercises");

            migrationBuilder.DropTable(
                name: "Reading_Test");

            migrationBuilder.DropTable(
                name: "topics");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
