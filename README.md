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

## Đăng nhập và access token

Backend phát JWT tại `POST /api/auth/login` sau khi xác thực email/mật khẩu
trong bảng `user`. Trước khi chạy API, cấu hình khóa ký bí mật (tối thiểu 32
byte) bằng .NET User Secrets hoặc biến môi trường `Jwt__SigningKey`; không
đưa khóa này vào `appsettings.json` hay frontend.

Ví dụ chạy trong thư mục `backend/EnglishLearning/EnglishLearning.API`:

```powershell
dotnet user-secrets set "Jwt:SigningKey" "replace-with-a-random-secret-of-at-least-32-bytes"
```

Frontend lưu `accessToken` và thông tin user trong `sessionStorage`, chỉ tồn
tại trong tab hiện tại và bị xóa khi tab đóng. API chấm Writing gửi token bằng
header `Authorization: Bearer <accessToken>`. `sessionStorage` vẫn có thể bị
đọc bởi JavaScript cùng nguồn, vì vậy cần tránh XSS; ứng dụng production nên
cân nhắc cookie `HttpOnly; Secure; SameSite` qua backend-for-frontend.

## Gemini Writing grading

Gemini grading dùng `generateContent` với JSON response schema để giữ đầu ra
đúng cấu trúc, model được cấu hình tại `Gemini:Model`, reasoning mức thấp và
tối đa 3 lỗi quan trọng cho mỗi tiêu chí. `Gemini:TimeoutSeconds` đặt giới hạn
thời gian chờ (mặc định 60 giây). Request tự retry tối đa 3 lần cho HTTP
429/503.
