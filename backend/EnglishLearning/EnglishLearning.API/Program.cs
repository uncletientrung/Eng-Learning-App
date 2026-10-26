using Microsoft.EntityFrameworkCore;
using EnglishLearning.DAL.Data;
using EnglishLearning.BLL.Interfaces;
using EnglishLearning.BLL.Services;
using EnglishLearning.DAL.Interfaces;
using EnglishLearning.DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký Repository
builder.Services.AddScoped<
    IWritingExerciseRepository,
    WritingExerciseRepository>();
builder.Services.AddScoped<ITopicRepository, TopicRepository>();
builder.Services.AddScoped<ISpeakingExerciseRepository, SpeakingExerciseRepository>();

// Đăng ký Service
builder.Services.AddScoped<
    IWritingExerciseService,
    WritingExerciseService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<ISpeakingExerciseService, SpeakingExerciseService>();

builder.Services.AddScoped<IWritingGradingService, WritingGradingService>();
builder.Services.AddHttpClient<ILlmGradingService, GeminiGradingService>();
builder.Services.AddScoped<IWritingGradingRepository, WritingGradingRepository>();




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

app.UseAuthorization();

app.MapControllers();

app.Run();