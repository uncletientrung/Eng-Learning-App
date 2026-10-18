using Microsoft.EntityFrameworkCore;
using EnglishLearning.DAL.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer(); builder.Services.AddSwaggerGen();

// Đăng ký kết nối MySQL
var connectionString = builder.Configuration
    .GetConnectionString("MySqlConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(connectionString!));

var app = builder.Build();


// Check
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    try
    {
        var connected = await db.Database.CanConnectAsync();
        Console.WriteLine(
            $"MySQL connection: {connected}");
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }
}



//

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();