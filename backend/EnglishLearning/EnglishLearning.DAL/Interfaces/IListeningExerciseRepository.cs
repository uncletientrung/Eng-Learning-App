using EnglishLearning.DAL.Entities;

namespace EnglishLearning.DAL.Interfaces;

public interface IListeningExerciseRepository
{
    Task<List<ListeningExercise>> GetAllAsync(int id);
    Task<ListeningExercise?> GetByIdAsync(int exerciseId);
    Task<ListeningExercise> AddAsync(ListeningExercise listeningExercise);
    Task<ListeningExercise> UpdateAsync(int id, ListeningExercise listeningExercise);
    Task<ListeningExercise> DeleteAsync(int id);
}