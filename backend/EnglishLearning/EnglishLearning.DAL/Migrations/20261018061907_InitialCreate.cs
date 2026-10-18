using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishLearning.DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    Description = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    module_type = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    create_by = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
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
                    topic_id = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
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
                        name: "FK_reading_exercises_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    image_url = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    writing_type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    question_text = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Instruction = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    reference_answer = table.Column<string>(type: "text", nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
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
                    speaking_type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    question_text = table.Column<string>(type: "text", nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_writing_attempts_writing_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "writing_exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "speaking_grades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    attempt_id = table.Column<int>(type: "int", nullable: false),
                    grader_id = table.Column<int>(type: "int", nullable: false),
                    overall_score = table.Column<decimal>(type: "decimal(3,1)", nullable: true),
                    Feedback = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speaking_grades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_speaking_grades_user_grader_id",
                        column: x => x.grader_id,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_speaking_grades_user_speaking_attempts_attempt_id",
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

            migrationBuilder.CreateTable(
                name: "speaking_criterion_scores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    grade_id = table.Column<int>(type: "int", nullable: false),
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
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speaking_criterion_scores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_speaking_criterion_scores_speaking_grades_grade_id",
                        column: x => x.grade_id,
                        principalTable: "speaking_grades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

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
                name: "IX_speaking_criterion_scores_grade_id",
                table: "speaking_criterion_scores",
                column: "grade_id");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_exercises_topic_id",
                table: "speaking_exercises",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_grades_attempt_id",
                table: "speaking_grades",
                column: "attempt_id");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_grades_grader_id",
                table: "speaking_grades",
                column: "grader_id");

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
                name: "IX_user_speaking_answers_attempt_id",
                table: "user_speaking_answers",
                column: "attempt_id");

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
                name: "IX_user_writing_criterion_scores_attempt_id",
                table: "user_writing_criterion_scores",
                column: "attempt_id");

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
                name: "speaking_grades");

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
                name: "translation_exercises");

            migrationBuilder.DropTable(
                name: "words");

            migrationBuilder.DropTable(
                name: "user_writing_attempts");

            migrationBuilder.DropTable(
                name: "user_speaking_attempts");

            migrationBuilder.DropTable(
                name: "listening_exercises");

            migrationBuilder.DropTable(
                name: "reading_exercises");

            migrationBuilder.DropTable(
                name: "writing_exercises");

            migrationBuilder.DropTable(
                name: "speaking_exercises");

            migrationBuilder.DropTable(
                name: "topics");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
