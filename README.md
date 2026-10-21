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
│   │
│   ├── Middleware/
│   ├── Program.cs
│   └── appsettings.json
│
├── EnglishLearning.BLL/
│   ├── Services/
│   │
│   ├── Interfaces/
│   └── DTOs/
│
└── EnglishLearning.DAL/
    ├── Entities/
    │
    ├── Data/
    │   └── AppDbContext.cs
    │   └── DbSeeder.cs
    │
    ├── Repositories/
    ├── Configurations/
    └── Migrations/
    └── Interfaces/


    Cách chạy : 
    Nếu chưa có migrations: dotnet ef migrations add InitialCreate --project EnglishLearning.DAL --startup-project EnglishLearning.API --context    AppDbContext
    donet build
    dotnet ef database update --project EnglishLearning.DAL --startup-project EnglishLearning.API --context AppDbContext
