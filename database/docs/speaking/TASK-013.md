TASK-013: XÂY DỰNG DỊCH VỤ AI ĐÁNH GIÁ SPEAKING
1. Mục tiêu

Xây dựng dịch vụ đánh giá IELTS Speaking bằng AI dựa trên 4 tiêu chí chấm điểm IELTS.

2. Ngữ cảnh

Đọc các tài liệu sau:

database/docs/speaking/PROJECT_SPEC.md
database/docs/speaking/AGENTS.md
backend/Entities (Đọc các thành phần liên quan Speaking)
3. Đầu vào
ID lượt làm bài Speaking.
Danh sách câu trả lời của người dùng.
Đường dẫn các file âm thanh.
Nội dung transcript tương ứng.
4. Đầu ra mong đợi

Một kết quả đánh giá bao gồm:

Điểm tổng thể.
Điểm Fluency and Coherence.
Điểm Lexical Resource.
Điểm Grammatical Range and Accuracy.
Điểm Pronunciation.
Nhận xét tổng thể.
Nhận xét từng câu trả lời.
5. Phạm vi công việc
Xây dựng theo mô hình đã tổ chức.
Tích hợp nhà cung cấp AI đã được cấu hình.
Sinh kết quả đánh giá có cấu trúc (như bên GeminiGradingService là của writing giờ viết thành GeminiGradingSpeakingService).
Kiểm tra tính hợp lệ của kết quả AI.
Xử lý lỗi từ nhà cung cấp AI.
6. Ràng buộc
Không chỉnh sửa các module không liên quan.
Không ghi đè kết quả đánh giá cũ.
Không viết cứng API credentials trong source code.
Không tin tưởng trực tiếp điểm số do AI trả về khi chưa kiểm tra.
Tuân thủ kiến trúc và quy ước lập trình hiện tại.
7. Tiêu chí chấp nhận
Dịch vụ nhận đúng ID lượt làm bài đã nộp.
Trả về đủ 4 tiêu chí đánh giá.
Có nhận xét tổng thể.
Từ chối kết quả AI không hợp lệ.
Xử lý được lỗi và timeout.
Lưu kết quả đánh giá thành công.
8. Công việc phụ thuộc
Nộp bài Speaking.
ích hợp Speech-to-Text.
9. Yêu cầu kiểm thử
Kiểm thử đánh giá thành công.
Kiểm thử kết quả AI không hợp lệ.
Kiểm thử timeout.
Kiểm thử thiếu transcript.
Kiểm thử lưu kết quả đánh giá.