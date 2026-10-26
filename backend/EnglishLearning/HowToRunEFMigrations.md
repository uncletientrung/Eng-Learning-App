# Kiểm tra packages
- ### Các packages được tự động cài khi mở project
- ### Kiểm tra bằng `dotnet package list`
---
# Tạo DB Code First
- ### Nếu chưa có thì cài thủ công bằng `dotnet restore` (Phải đang ở thư mục chứa file .slnx)
- ### dotnet tự động khởi tạo lại folder bin và obj, kiểm tra lại bằng `dotnet package list`
- ### Chạy xampp và mysql service
- ### Vẫn ở đường dẫn chứa file .slnx (bắt buộc vì dotnet chạy dựa trên file Program.cs), chạy
```
dotnet ef migrations add initDb --project EnglishLearning.DAL --startup-project EnglishLearning.API
dotnet ef update database
```
- ### Kiểm tra thư mục Migrations và database