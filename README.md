# Eng-Learning-App

English learning application.

## Technologies

### Frontend
- ReactJS
- Vite

### Backend
- ASP.NET Core Web API
- Entity Framework Core

### Database
- SQL Server

## Project Structure

- frontend: ReactJS application
- backend: ASP.NET Core Web API
- docs: project documentation and database design


Cấu trúc dự án phần backend
backend/
│
├── EnglishLearning.API/
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── UserController.cs
│   │   ├── VocabularyController.cs
│   │   ├── GrammarController.cs
│   │   ├── TranslationController.cs
│   │   ├── ListeningController.cs
│   │   ├── ReadingController.cs
│   │   ├── WritingController.cs
│   │   └── SpeakingController.cs
│   │
│   ├── Middleware/
│   ├── Program.cs
│   └── appsettings.json
│
├── EnglishLearning.BLL/
│   ├── Services/
│   │   ├── AuthService.cs
│   │   ├── UserService.cs
│   │   ├── VocabularyService.cs
│   │   ├── GrammarService.cs
│   │   ├── TranslationService.cs
│   │   ├── ListeningService.cs
│   │   ├── ReadingService.cs
│   │   ├── WritingService.cs
│   │   └── SpeakingService.cs
│   │
│   ├── Interfaces/
│   └── DTOs/
│
└── EnglishLearning.DAL/
    ├── Entities/
    │   ├── User.cs
    │   ├── Role.cs
    │   ├── Vocabulary.cs
    │   ├── GrammarSection.cs
    │   ├── GrammarLesson.cs
    │   ├── TranslationExercise.cs
    │   ├── ListeningExercise.cs
    │   ├── ReadingExercise.cs
    │   ├── WritingExercise.cs
    │   ├── SpeakingExercise.cs
    │   ├── SpeakingAttempt.cs
    │   └── SpeakingGrade.cs
    │
    ├── Data/
    │   └── AppDbContext.cs
    │
    ├── Repositories/
    ├── Configurations/
    └── Migrations/