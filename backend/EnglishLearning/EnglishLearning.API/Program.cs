using Microsoft.EntityFrameworkCore;
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.Repositories;
using EnglishLearning.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
var jwtSigningKey = builder.Configuration["Jwt:SigningKey"];
if (string.IsNullOrWhiteSpace(jwtSigningKey) ||
    Encoding.UTF8.GetByteCount(jwtSigningKey) < 32)
{
    throw new InvalidOperationException(
        "Jwt:SigningKey phải được cấu hình và có tối thiểu 32 byte.");
}

var jwtIssuer = builder.Configuration["Jwt:Issuer"]
    ?? throw new InvalidOperationException("Thiếu cấu hình Jwt:Issuer.");
var jwtAudience = builder.Configuration["Jwt:Audience"]
    ?? throw new InvalidOperationException("Thiếu cấu hình Jwt:Audience.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSigningKey)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("VocabularyUser", policy => policy
        .RequireAuthenticatedUser()
        .RequireAssertion(context => int.TryParse(
            context.User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) && id > 0));
}); // Login ms cho dùng vocab (trang dashboard mà)
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký Repository
builder.Services.AddScoped<
    IWritingExerciseRepository,
    WritingExerciseRepository>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<ITopicRepository, TopicRepository>();
builder.Services.AddScoped<IVocabularyRepository, VocabularyRepository>();
builder.Services.AddScoped<ISpeakingExerciseRepository, SpeakingExerciseRepository>();
builder.Services.AddScoped<IAdminSpeakingRepository, AdminSpeakingRepository>();
builder.Services.AddScoped<IGrammarRepository, GrammarRepository>();
builder.Services.AddScoped<IReadingTestRepository, ReadingTestRepository>();
builder.Services.AddScoped<IReadingExerciseRepository, ReadingExerciseRepository>();

// Đăng ký Service
builder.Services.AddScoped<
    IWritingExerciseService,
    WritingExerciseService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IVocabularyService, VocabularyService>();
builder.Services.AddScoped<ISpeakingExerciseService, SpeakingExerciseService>();
builder.Services.AddScoped<IAdminSpeakingService, AdminSpeakingService>();
builder.Services.AddScoped<IReadingTestService, ReadingTestService>();
builder.Services.AddScoped<IReadingExerciseService, ReadingExerciseService>();
builder.Services.AddScoped<IWritingGradingService, WritingGradingService>();
builder.Services.AddScoped<IGrammarService, GrammarService>();

var geminiTimeoutSeconds = builder.Configuration.GetValue(
    "Gemini:TimeoutSeconds",
    60);
if (geminiTimeoutSeconds <= 0)
{
    throw new InvalidOperationException(
        "Gemini:TimeoutSeconds phải lớn hơn 0.");
}

builder.Services.AddHttpClient<ILlmGradingService, GeminiGradingService>(
    client => client.Timeout = TimeSpan.FromSeconds(geminiTimeoutSeconds));
builder.Services.AddScoped<IWritingGradingRepository, WritingGradingRepository>();

builder.Services.AddScoped<ISpeakingAssessmentService, SpeakingAssessmentService>();
builder.Services.AddScoped<
    ISpeakingAssessmentRepository,
    SpeakingAssessmentRepository>();
builder.Services.AddHttpClient<
    ISpeakingGradingLlmService,
    GeminiGradingSpeakingService>(
    client => client.Timeout = TimeSpan.FromSeconds(geminiTimeoutSeconds));
builder.Services.AddSingleton<SpeakingGradingQueue>();
builder.Services.AddHostedService<SpeakingGradingWorker>();



// Đăng ký kết nối MySQL
var connectionString = builder.Configuration
    .GetConnectionString("MySqlConnection")
    ?? throw new InvalidOperationException(
        "Không tìm thấy chuỗi kết nối MySqlConnection.");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    ));

// Cấu hình CORS cho ReactJS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Migration và seed dữ liệu
await using (var scope = app.Services.CreateAsyncScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    try
    {
        await LegacyDatabaseBaseline.ApplyAsync(db);
        await db.Database.MigrateAsync();
        await DbSeeder.SeedAsync(db);
    }
    catch (Exception ex)
    {
        Console.WriteLine(
            "Migration/Seeding failed: \n" + ex);
        throw;
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
