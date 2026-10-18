using Microsoft.EntityFrameworkCore;
using EnglishLearning.DAL.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer(); builder.Services.AddSwaggerGen();

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

var app = builder.Build();


// Migrate và seed trước khi ứng dụng bắt đầu nhận request.
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
        // Print full exception details to console so we can see the exact failing
        // stack frame and inner exceptions (including provider internals).
        Console.WriteLine("Migration/Seeding failed: \n" + ex.ToString());
        // Re-throw so the process still fails as before, but with logged details.
        throw;
    }
}



//

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();