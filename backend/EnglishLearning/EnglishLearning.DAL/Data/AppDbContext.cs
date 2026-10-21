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
    }
}