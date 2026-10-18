
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(
        AppDbContext context,
        CancellationToken cancellationToken = default)
    {
        // Database đã được migrate trước khi gọi hàm này.

        // TODO:
        // 1. Seed dữ liệu nền nếu dự án cần.
        // 2. Kiểm tra dữ liệu hiện có trước khi thêm.
        // 3. Không ghi đè dữ liệu người dùng đã tạo.

        await Task.CompletedTask;
    }
}
