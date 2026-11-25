using EnglishLearning.DAL.Entities;

namespace EnglishLearning.BLL.Interfaces;

public interface IWritingExerciseService
{
    Task<List<WritingExercise>> GetAllAsync();

    Task<WritingExercise?> GetByIdAsync(int id);
}