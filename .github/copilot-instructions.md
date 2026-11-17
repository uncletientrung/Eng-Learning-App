# Copilot instructions

## Repository shape and architecture

- `frontend/` is a React 19/Vite SPA. `src/App.jsx` defines routes; pages compose reusable UI from `src/components/`, and API access is grouped in `src/services/`. The API base URL is centralized in `src/constant/apiConfig.js`.
- `backend/EnglishLearning/` contains the .NET solution. `EnglishLearning.API` owns controllers, authentication, dependency injection, and hosted workers; `EnglishLearning.BLL` owns services, service interfaces, and DTOs; `EnglishLearning.DAL` owns EF Core entities, `AppDbContext`, repositories, repository interfaces, seeders, and migrations. Keep request handling in controllers and put business logic in BLL services, with persistence behind DAL repositories.
- `EnglishLearning.Tests` contains xUnit tests for BLL behavior; Moq is used to isolate repository dependencies.
- `database/` contains SQL and documentation. There is also feature-specific agent guidance in `database/docs/speaking/AGENTS.md`; follow it when working in that area.
- The runtime provider is currently MySQL (`UseMySql` in the API startup), although the root README's technology summary says SQL Server. Check the actual provider and migration setup before making database-provider changes.

## Build, test, and lint

Run frontend commands from `frontend/`:

```powershell
npm run dev
npm run build
npm run lint
npx eslint src\services\writingGradingApi.js
```

The last command lints one file. There is no frontend test script in `package.json`.

Run backend commands from `backend/EnglishLearning/`:

```powershell
dotnet build EnglishLearning.slnx
dotnet test EnglishLearning.Tests/EnglishLearning.Tests.csproj
dotnet test EnglishLearning.Tests/EnglishLearning.Tests.csproj --filter "FullyQualifiedName=EnglishLearning.Tests.AdminServiceTests.UpdateWritingSubmissionAsync_RejectsInvalidCriterionScore"
dotnet run --project EnglishLearning.API/EnglishLearning.API.csproj
```

The filter example runs one xUnit test; replace its fully qualified name with the test to run. For EF migrations and database updates, use the commands and prerequisites documented in `HowToRunEFMigrations.md` and the root README. API startup applies migrations and seed data, and requires configured database and JWT settings.

## Repository conventions

- Backend projects enable nullable reference types and implicit usings. Follow existing interface-to-implementation registrations in `EnglishLearning.API/Program.cs`; add or update the relevant interface, implementation, and DI registration together.
- Keep API contracts in BLL DTOs rather than exposing EF entities directly. Existing controllers use attribute routes under `/api/...`; preserve established route and DTO shapes when extending an endpoint.
- Entity and relationship configuration lives in `AppDbContext.OnModelCreating`; schema changes must be represented by EF migrations. Check entity relationships, delete behavior, indexes, seeders, and existing migrations together when changing persisted data.
- Frontend API calls belong in the relevant `src/services/` module and should use the shared `API_URL`. Authenticated requests use the access token from `authApi`; a 401 should follow the existing logout/expired-session behavior.
- Protected frontend routes use `RequireAuth` and, for admin routes, `RequireAdmin`. Preserve these route guards when adding pages that require a signed-in user or administrator.
- AI grading is split between BLL grading services and API-registered `HttpClient`/worker services. Keep provider-specific calls behind their existing service interfaces and preserve configured timeout and failure handling.
- For feature work, read the directly related documentation and follow any nested `AGENTS.md`; keep changes within the requested feature and report relevant test results.
