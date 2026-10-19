using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using EnglishLearning.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.DAL.Repositories;

public class WritingExerciseRepository : IWritingExerciseRepository {
    private readonly AppDbContext _context;

    public WritingExerciseRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<WritingExercise>> GetAllAsync()
    {
        return await _context.WritingExercises
            .AsNoTracking() // Yêu cầu EF Core không theo dõi các Entity được lấy ra trong truy vấn này. Phù hợp với trường hợp chỉ đọc dữ liệu,
                            // không cần sửa các Entity rồi lưu lại thông qua cùng DbContext.
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync(); // Thực thi truy vấn bất đồng bộ và lấy kết quả thành một danh sách.
    }

    public async Task<WritingExercise?> GetByIdAsync(int id)
    {
        return await _context.WritingExercises
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task AddAsync(WritingExercise exercise)
    {
        await _context.WritingExercises.AddAsync(exercise);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}