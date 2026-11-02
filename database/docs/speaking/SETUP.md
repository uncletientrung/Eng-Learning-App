# Cài đặt luồng Speaking assessment

## Database

- Database mới: import `database/englearning.sql` đã cập nhật.
- Database hiện có: chạy `dotnet ef database update --project .\EnglishLearning.DAL --startup-project .\EnglishLearning.API` từ `backend/EnglishLearning`. Migration mới chuyển kết quả chấm mới nhất sang lượt làm, đổi khóa ngoại tiêu chí sang `attempt_id`, thêm `Issues` và xóa bảng `speaking_grades`.
- Không chạy đồng thời migration EF và script SQL nâng cấp cho cùng database.
- File ghi âm được lưu ngoài database trong `App_Data/speaking` dưới thư mục chạy backend. Thư mục này đã được thêm vào `.gitignore`; khi deploy cần cấp quyền ghi và dùng ổ đĩa bền vững. Có thể đặt đường dẫn khác bằng cấu hình `Speaking:AudioStoragePath`.

## Điều kiện sử dụng

- Người học cần đăng nhập; access token hiện có được gửi dưới dạng Bearer token.
- Trình duyệt cần quyền microphone và hỗ trợ `MediaRecorder`. Speech-to-Text dùng `SpeechRecognition` của trình duyệt nếu có; nếu không, người học có thể nhập transcript thủ công.
- Âm thanh được chuẩn hóa sang WAV 16 kHz mono trước khi tải lên. Model Gemini được cấu hình phải hỗ trợ đầu vào audio.

## Trạng thái lượt làm

`IN_PROGRESS` → `SUBMITTED` → `GRADING` → `GRADED` hoặc `GRADING_FAILED`.

Backend tự đưa các lượt `SUBMITTED`/`GRADING` chưa hoàn tất vào hàng đợi khi khởi động lại. Điểm tổng và JSON kết quả được lưu trên `user_speaking_attempts`; điểm từng tiêu chí, nhận xét và danh sách lỗi được lưu trên `speaking_criterion_scores` theo `attempt_id`. Khi chấm lại cùng một lượt, kết quả tiêu chí được cập nhật theo kết quả mới nhất. Mỗi lần chọn một đề từ thư viện sẽ tạo lượt luyện mới; lượt đang làm dở trước đó được giữ câu trả lời với trạng thái `ABANDONED`, không hiển thị nhầm như lượt hiện tại.
