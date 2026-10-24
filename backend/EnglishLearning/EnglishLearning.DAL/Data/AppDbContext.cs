using Microsoft.EntityFrameworkCore;
using System.Data;

namespace EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Các DbSet<Entity> của bạn đặt ở đây
    public DbSet<GrammarCategory> GrammarCategories => Set<GrammarCategory>();
    public DbSet<GrammarSection> GrammarSections => Set<GrammarSection>();
    public DbSet<Idiom> Idioms => Set<Idiom>();
    public DbSet<ListeningExercise> ListeningExercises => Set<ListeningExercise>();
    public DbSet<ListeningFillBlankAnswer> ListeningFillBlankAnswers => Set<ListeningFillBlankAnswer>();
    public DbSet<ListeningQuestion> ListeningQuestions => Set<ListeningQuestion>();
    public DbSet<ListeningQuestionOption> ListeningQuestionOptions => Set<ListeningQuestionOption>();
    public DbSet<ReadingExercise> ReadingExercises => Set<ReadingExercise>();
    public DbSet<ReadingFillBlankAnswer> ReadingFillBlankAnswers => Set<ReadingFillBlankAnswer>();
    public DbSet<ReadingQuestion> ReadingQuestions => Set<ReadingQuestion>();
    public DbSet<ReadingQuestionOption> ReadingQuestionOptions => Set<ReadingQuestionOption>();
    public DbSet<SpeakingCriterionScore> SpeakingCriterionScores => Set<SpeakingCriterionScore>();
    public DbSet<SpeakingExercise> SpeakingExercises => Set<SpeakingExercise>();
    public DbSet<SpeakingGrade> SpeakingGrades => Set<SpeakingGrade>();
    public DbSet<SpeakingQuestion> SpeakingQuestions => Set<SpeakingQuestion>();
    public DbSet<Topic> Topics => Set<Topic>();
    public DbSet<TranslationExercise> TranslationExercises => Set<TranslationExercise>();
    public DbSet<User> Users => Set<User>();
    public DbSet<UserListeningAnswer> UserListeningAnswers => Set<UserListeningAnswer>();
    public DbSet<UserListeningAttempt> UserListeningAttempts => Set<UserListeningAttempt>();
    public DbSet<UserReadingAnswer> UserReadingAnswers => Set<UserReadingAnswer>();
    public DbSet<UserReadingAttempt> UserReadingAttempts => Set<UserReadingAttempt>();
    public DbSet<UserSpeakingAnswer> UserSpeakingAnswers => Set<UserSpeakingAnswer>();
    public DbSet<UserSpeakingAttempt> UserSpeakingAttempts => Set<UserSpeakingAttempt>();
    public DbSet<UserTranslationAttempt> UserTranslationAttempts => Set<UserTranslationAttempt>();
    public DbSet<UserWordProgress> UserWordProgresses => Set<UserWordProgress>();
    public DbSet<UserWritingAttempt> UserWritingAttempts => Set<UserWritingAttempt>();
    public DbSet<UserWritingCriterionScore> UserWritingCriterionScores => Set<UserWritingCriterionScore>();
    public DbSet<Word> Words => Set<Word>();
    public DbSet<WritingExercise> WritingExercises => Set<WritingExercise>();



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Writing
        modelBuilder.Entity<WritingExercise>() // Cấu hình entity WritingExercise
            .HasOne(e => e.Topic) // Mỗi bài tập viết liên kết với một Topic
            .WithMany() // Một Topic có thể liên kết với nhiều bài tập viết
            .HasForeignKey(e => e.TopicId) // Cột TopicId là khóa ngoại.
            .OnDelete(DeleteBehavior.Restrict); // Ngăn xóa Topic nếu vẫn còn bài tập viết tham chiếu đến nó.

        modelBuilder.Entity<UserWritingAttempt>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UserWritingAttempt>()
            .HasOne(a => a.Exercise)
            .WithMany()
            .HasForeignKey(a => a.ExerciseId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UserWritingCriterionScore>()
            .HasOne(s => s.Attempt)
            .WithMany()
            .HasForeignKey(s => s.AttemptId)
            .OnDelete(DeleteBehavior.Cascade); // Khi xóa bản ghi cha, tự động xóa các bản ghi con liên quan.

        modelBuilder.Entity<UserWritingCriterionScore>()
            .HasIndex(s => new { s.AttemptId, s.CriterionCode })
            .IsUnique();


        // ==================== SPEAKING ====================
        // SpeakingExercise -> Topic
        modelBuilder.Entity<SpeakingExercise>()
            .HasOne(e => e.Topic)
            .WithMany()
            .HasForeignKey(e => e.TopicId);

        // SpeakingQuestion -> SpeakingExercise // chỉ định collection
        modelBuilder.Entity<SpeakingQuestion>()
            .HasOne(q => q.Exercise)
            .WithMany(e => e.Questions)
            .HasForeignKey(q => q.ExerciseId)
            .HasPrincipalKey(e => e.Id);

        // UserSpeakingAttempt -> User
        modelBuilder.Entity<UserSpeakingAttempt>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId);

        // UserSpeakingAttempt -> SpeakingExercise
        modelBuilder.Entity<UserSpeakingAttempt>()
            .HasOne(a => a.Exercise)
            .WithMany()
            .HasForeignKey(a => a.ExerciseId);

        // UserSpeakingAnswer -> UserSpeakingAttempt
        modelBuilder.Entity<UserSpeakingAnswer>()
            .HasOne(a => a.Attempt)
            .WithMany()
            .HasForeignKey(a => a.AttemptId);

        // UserSpeakingAnswer -> SpeakingQuestion
        modelBuilder.Entity<UserSpeakingAnswer>()
            .HasOne(a => a.Question)
            .WithMany()
            .HasForeignKey(a => a.QuestionId);

        // SpeakingGrade -> UserSpeakingAttempt
        modelBuilder.Entity<SpeakingGrade>()
            .HasOne(g => g.Attempt)
            .WithMany()
            .HasForeignKey(g => g.AttemptId);

        // SpeakingGrade -> User (người chấm)
        modelBuilder.Entity<SpeakingGrade>()
            .HasOne(g => g.Grader)
            .WithMany()
            .HasForeignKey(g => g.GraderId);

        // SpeakingCriterionScore -> SpeakingGrade
        modelBuilder.Entity<SpeakingCriterionScore>()
            .HasOne(s => s.Grade)
            .WithMany()
            .HasForeignKey(s => s.GradeId);

        // Mỗi tiêu chí chỉ có một bản ghi trong một lần chấm
        modelBuilder.Entity<SpeakingCriterionScore>()
            .HasIndex(s => new { s.GradeId, s.CriterionCode })
            .IsUnique();

        // Mỗi câu hỏi chỉ có một câu trả lời trong một lần làm bài
        modelBuilder.Entity<UserSpeakingAnswer>()
            .HasIndex(a => new { a.AttemptId, a.QuestionId })
            .IsUnique();

    }
}