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
dotnet ef database update --project EnglishLearning.DAL --startup-project EnglishLearning.API
```
# - Run: dotnet ``` dotnet run --project EnglishLearning.API ```
- ### Kiểm tra thư mục Migrations và database

## Cập nhật schema cho Admin Writing

Migration `AddWritingAdminMetadata` bổ sung trạng thái đề và thời gian cập nhật. Khi dùng database đã có dữ liệu, chạy từ thư mục `backend/EnglishLearning`:

```
dotnet ef database update --project EnglishLearning.DAL --startup-project EnglishLearning.API
```

Các đề Writing hiện có sẽ được gán trạng thái `PUBLISHED` để tiếp tục hiển thị với học viên. Migration cũng bỏ hành vi tự cập nhật `created_at` khi sửa đề; thời điểm sửa được ghi riêng trong `updated_at`.
