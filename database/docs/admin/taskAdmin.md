TASK PLAN: XÂY DỰNG ADMIN DASHBOARD & QUẢN LÝ WRITING
1. Tổng quan dự án
Mục tiêu

Xây dựng giao diện quản trị (Admin) cho hệ thống học tiếng Anh hiện tại.

Đường dẫn truy cập:

/admin

Trong giai đoạn đầu, tập trung triển khai hai chức năng chính:

Admin Dashboard: Trang tổng quan quản trị hệ thống.
Writing Management: Quản lý đề bài Writing và bài làm của học viên.
Yêu cầu quan trọng về giao diện

Trước khi bắt đầu code, Agent bắt buộc phải đọc và phân tích giao diện hiện tại tại:

frontend/src/pages/Vocabulary

Đây là giao diện tham chiếu chính cho toàn bộ khu vực Admin.

Yêu cầu:

Tái sử dụng phong cách thiết kế hiện tại của trang Vocabulary.
Tham khảo và kế thừa phong cách sử dụng tailwind, màu sắc, font chữ, kích thước, khoảng cách, border, border-radius, shadow.
Tái sử dụng các component có sẵn nếu phù hợp.
Giữ sự đồng nhất giữa giao diện Admin và giao diện người dùng hiện tại.
Không tự tạo một Design System hoàn toàn mới.
Không làm ảnh hưởng đến các trang và chức năng hiện có.
2. Giai đoạn khảo sát trước khi triển khai

Agent phải thực hiện khảo sát codebase trước khi viết code.

2.1. Khảo sát Frontend

Đọc và phân tích:

frontend/src/pages/Vocabulary
Các component Layout hiện có.
Cấu hình Router.
Cơ chế Authentication và Authorization.
Cách tổ chức các trang và component trong dự án.

Mục tiêu là hiểu cách dự án đang tổ chức code để triển khai Admin theo đúng kiến trúc hiện tại.


3. Xây dựng Admin Layout

Tạo khu vực quản trị dùng chung tại /admin.

Có thể tổ chức thư mục như sau (được phép điều chỉnh theo kiến trúc thực tế):

src/
  pages/
    Admin/
      DashboardPage.jsx
      UsersPage.jsx
      CoursesPage.jsx
  components/
    admin/
      AdminLayout.jsx
      AdminSidebar.jsx
      AdminHeader.jsx
  services/
    adminApi.js



Đây là cấu trúc tham khảo, không bắt buộc nếu dự án đã có quy ước tổ chức khác.

3.1. Sidebar

Thiết kế Sidebar gồm:

Nhóm chính:

Dashboard
Quản lý Writing

Nhóm chức năng dự kiến mở rộng:

Quản lý Speaking
Quản lý Reading
Quản lý Listening
Quản lý Vocabulary
Quản lý Grammar
Quản lý Idioms
Quản lý Users

Trong giai đoạn 1, chỉ Dashboard và Writing cần hoạt động đầy đủ.

Các mục còn lại có thể hiển thị trạng thái đang phát triển, không triển khai chức năng giả.

3.2. Header

Bao gồm:

Tên trang hiện tại.
Breadcrumb.
Thông tin Admin đang đăng nhập.
Avatar hoặc biểu tượng tài khoản.
Menu tài khoản.
Nút đăng xuất.
3.3. Responsive
Desktop: Sidebar cố định bên trái.
Tablet: Sidebar có thể thu gọn.
Mobile: Sidebar chuyển thành Drawer.
Nội dung chính tự điều chỉnh chiều rộng.
Bảng dữ liệu phải có phương án hiển thị phù hợp trên màn hình nhỏ.
4. MODULE 1: ADMIN DASHBOARD
4.1. Mục tiêu

Xây dựng trang tổng quan để Admin có thể nhanh chóng nắm bắt tình hình hoạt động của hệ thống.

Đường dẫn:

/admin

4.2. Các thẻ thống kê tổng quan

Thiết kế các Stat Cards:

Tổng số người dùng.
Tổng số bài tập Writing.
Tổng số lượt làm Writing.
Tổng số bài đã hoàn thành.
Số bài đang chờ chấm.
Điểm Writing trung bình.

Không tạo dữ liệu thống kê giả. Các chỉ số phải lấy từ Backend.


4.4. Bảng hoạt động gần đây

Hiển thị danh sách bài Writing gần đây được học viên nộp.

Các cột:

Cột	Nội dung
STT	Số thứ tự
Học viên	Tên học viên
Đề bài	Tên đề Writing
Loại bài	
Thời gian nộp	Ngày giờ nộp
Trạng thái	Trạng thái bài làm
Thao tác	Xem chi tiết

Cho phép chuyển nhanh sang trang quản lý bài nộp.

4.5. Quick Actions

Các thao tác nhanh:

Thêm đề Writing mới.
Xem danh sách đề Writing.
Xem bài nộp của học viên.
5. MODULE 2: QUẢN LÝ WRITING

Đây là module trọng tâm của giai đoạn 1.

Đường dẫn chính:

/admin/writing

Mục tiêu: Cho phép Admin quản lý toàn bộ đề Writing, phân loại đề, chỉnh sửa nội dung đề và theo dõi bài làm của học viên.

5.1. Quản lý danh sách đề Writing

Giao diện danh sách đề bài cần có:

Thanh công cụ
Nút Thêm đề Writing.
Ô tìm kiếm theo tên đề bài.
Bộ lọc theo chủ đề.
Bộ lọc theo trạng thái.
Nút làm mới dữ liệu.
Bảng danh sách đề bài

Các cột:

Cột	Nội dung
STT	Số thứ tự
ID	ID đề bài
Tiêu đề	Tên đề bài
Chủ đề	Topic
Loại bài	
Trạng thái	Công khai / Bản nháp / Ẩn
Ngày tạo	Thời gian tạo
Thao tác	Các chức năng quản lý
Chức năng
Xem danh sách.
Tìm kiếm đề bài.
Lọc đề bài.
Phân trang.
Xem chi tiết.
Thêm đề mới.
Chỉnh sửa đề.
Xóa đề.
Thay đổi trạng thái hiển thị.

Khi xóa đề bài cần có hộp thoại xác nhận.

Nếu đề bài đã có bài làm của học viên, phải kiểm tra quan hệ dữ liệu và không xóa gây mất lịch sử học tập.

5.2. Thêm đề Writing mới

Đường dẫn đề xuất:

/admin/writing/create

Thiết kế Form tạo đề bài.

Thông tin cơ bản
Tiêu đề đề bài.
Chủ đề (Topic).
Loại bài Writing:
Trạng thái:
Draft.
Published.
Hidden.
Nội dung đề bài

Các nút thao tác
Xuất bản.
Hủy.
Xem trước đề bài.

Yêu cầu kiểm tra dữ liệu đầu vào trước khi gửi Backend.

5.3. Chỉnh sửa đề Writing

Đường dẫn đề xuất:

/admin/writing/edit/:id

Chức năng:

Lấy dữ liệu đề bài theo ID.
Hiển thị dữ liệu hiện tại.
Cho phép chỉnh sửa thông tin.
Cho phép thay đổi hình ảnh.
Cho phép thay đổi nội dung.
Cập nhật trạng thái.
Lưu thay đổi.

Phải có xử lý khi đề bài không tồn tại hoặc xảy ra lỗi API.

5.4. Xem chi tiết đề Writing

Đường dẫn:

/admin/writing/:id

Hiển thị:

Thông tin đề bài.
Nội dung đề.
Hình ảnh.
Chủ đề.
Trạng thái.
Ngày tạo.
Ngày cập nhật.
Số lượt học viên làm bài.

Các thao tác:

Chỉnh sửa.
Xóa.
Xem bài nộp liên quan.
5.5. Quản lý bài làm của học viên

Đường dẫn:

/admin/writing/submissions

Đây là chức năng theo dõi và quản lý bài làm của học viên.

Danh sách bài nộp

Các cột:

Cột	Nội dung
STT	Số thứ tự
Học viên	Tên học viên
Đề bài	Tên đề Writing
Điểm	Điểm tổng
Trạng thái	Trạng thái chấm
Thời gian nộp	Thời gian hoàn thành
Thao tác	Xem chi tiết
Bộ lọc
Tìm theo tên học viên.
Tìm theo tên đề bài.
Lọc theo trạng thái.
Lọc theo khoảng thời gian.
Lọc theo điểm.
Xem chi tiết bài làm

Khi Admin nhấn vào một bài nộp, hiển thị:

Thông tin học viên

Tên.
Username.
Email.

Thông tin bài làm

Đề bài.
Chủ đề.
Nội dung đề.
Câu trả lời của học viên.
Thời gian bắt đầu.
Thời gian hoàn thành.

Thông tin chấm điểm

Dựa trên bảng user_writing_criterion_scores:

criterion_code
Score
Feedback
Strengths
Weaknesses
Suggestions
Issues

Hiển thị từng tiêu chí đánh giá dưới dạng các Card hoặc bảng.

Các tiêu chí có thể gồm:

Task Achievement / Task Response.
Coherence and Cohesion.
Lexical Resource.
Grammatical Range and Accuracy.

Lưu ý: Cần kiểm tra dữ liệu criterion_code thực tế trước khi ánh xạ tên tiêu chí.

Thao tác quản trị
Xem nội dung bài làm.
Xem kết quả chấm.
Xem phản hồi chi tiết.
Xem lịch sử bài làm.
Cập nhật trạng thái xử lý nếu Backend hỗ trợ.

Không triển khai chức năng chấm điểm thủ công nếu chưa có yêu cầu và thiết kế nghiệp vụ riêng.

6. DATABASE VÀ BACKEND

Agent phải kiểm tra cấu trúc database thực tế trước khi viết API.

6.1. Các bảng hiện có liên quan

topics

Dùng để lấy danh sách chủ đề Writing với điều kiện:

module_type = 'WRITING'

user_writing_attempts

Dùng để quản lý bài làm:

Id
user_id
exercise_id
user_response
overall_score
llm_raw_response
started_at
completed_at

user_writing_criterion_scores

Dùng để lấy điểm và phản hồi theo từng tiêu chí.

6.2. Bảng đề xuất bổ sung

Nếu chưa tồn tại bảng đề bài Writing, đề xuất thiết kế writing_exercises với các trường:

Id
topic_id
Level
Title
question_type
prompt
image_url
image_description
status
created_at
updated_at

Có thể điều chỉnh các trường theo cấu trúc nghiệp vụ thực tế.

Phải đảm bảo writing type sẽ không dùng

Cần xem xét tương thích với các bài làm cũ trước khi thêm khóa ngoại hoặc thay đổi cấu trúc.

6.3. API cần có

Danh sách API đề xuất:

Writing Exercises

GET /api/admin/writing
GET /api/admin/writing/:id
POST /api/admin/writing
PUT /api/admin/writing/:id
DELETE /api/admin/writing/:id
PATCH /api/admin/writing/:id/status

Writing Submissions

GET /api/admin/writing/submissions
GET /api/admin/writing/submissions/:id

Dashboard

GET /api/admin/dashboard

Tên endpoint chỉ là đề xuất. Phải tuân thủ quy ước routing hiện tại của Backend.

Tất cả API Admin phải kiểm tra quyền ADMIN ở Backend, không chỉ kiểm tra trên giao diện.

7. UI/UX REQUIREMENTS
Thiết kế tổng thể
Kế thừa giao diện trang Vocabulary.
Đồng nhất màu sắc và typography.
Giao diện sạch, hiện đại, dễ sử dụng.
Có phân cấp thông tin rõ ràng.
Không lạm dụng màu sắc và hiệu ứng.
Các bảng dữ liệu phải dễ đọc.
Modal và Form phải thống nhất với giao diện hiện có.
Trạng thái giao diện

Mọi chức năng cần có đầy đủ:

Loading.
Empty State.
Error State.
Success Notification.
Confirmation Dialog.
Validation Message.

Không để xuất hiện các nút chỉ có giao diện nhưng không hoạt động.

Hiệu năng
Sử dụng phân trang phía Backend khi dữ liệu lớn.
Tránh gọi API không cần thiết.
Không tải toàn bộ dữ liệu bài nộp cùng lúc.
Tái sử dụng component hợp lý.
8. BẢO MẬT VÀ PHÂN QUYỀN
Chỉ tài khoản ADMIN được truy cập /admin.
Người chưa đăng nhập phải được chuyển đến trang đăng nhập.
Người dùng không có quyền ADMIN không được phép truy cập API quản trị.
Không lưu thông tin nhạy cảm vào Local Storage nếu không cần thiết.
Không trả về password hoặc password hash trong API.
Kiểm tra và validate dữ liệu ở Backend.
Sử dụng prepared statements để tránh SQL Injection.
Kiểm tra quyền khi xóa hoặc sửa đề bài.
9. THỨ TỰ TRIỂN KHAI

Agent phải thực hiện theo đúng thứ tự:

TASK 1: Khảo sát dự án
Đọc trang Vocabulary.
Phân tích phong cách sử dụng tailwind và Layout.
Đọc Router.
Đọc Backend.
Kiểm tra database.
Báo cáo kiến trúc hiện tại.
TASK 2: Thiết kế Admin Layout
Tạo Admin Layout.
Tạo Sidebar.
Tạo Header.
Cấu hình route /admin.
Kiểm tra Responsive.
Kiểm tra phân quyền.
TASK 3: Dashboard
Thiết kế giao diện Dashboard.
Xây dựng các Stat Cards.
Xây dựng biểu đồ.
Xây dựng bảng hoạt động gần đây.
Kết nối API thực tế.
TASK 4: Writing Management
Xây dựng danh sách đề Writing.
Tìm kiếm và lọc.
Phân trang.
Thêm đề.
Chỉnh sửa đề.
Xem chi tiết đề.
Xóa đề.
Quản lý trạng thái.
TASK 5: Writing Submissions
Xây dựng danh sách bài nộp.
Tìm kiếm và lọc.
Xem chi tiết bài làm.
Hiển thị điểm theo tiêu chí.
Hiển thị Feedback, Strengths, Weaknesses, Suggestions và Issues.
TASK 6: Kiểm thử và hoàn thiện
Kiểm tra tất cả các route.
Kiểm tra API.
Kiểm tra phân quyền.
Kiểm tra CRUD.
Kiểm tra dữ liệu thực tế.
Kiểm tra Responsive.
Kiểm tra lỗi Console.
Kiểm tra không ảnh hưởng đến các trang cũ.

10. ACCEPTANCE CRITERIA

Chỉ xem là hoàn thành khi đáp ứng các tiêu chí:

Giao diện Admin kế thừa đúng phong cách trang Vocabulary.
Truy cập được /admin.
Admin Layout hoạt động.
Sidebar điều hướng đúng.
Dashboard hiển thị số liệu thực tế.
Dashboard có biểu đồ và hoạt động gần đây.
Danh sách đề Writing hoạt động.
Có chức năng tìm kiếm, lọc và phân trang.
Có chức năng thêm đề Writing.
Có chức năng chỉnh sửa đề Writing.
Có chức năng xem chi tiết đề Writing.
Có chức năng xóa an toàn.
Có chức năng quản lý trạng thái đề.
Có danh sách bài làm của học viên.
Xem được nội dung bài làm.
Xem được điểm và phản hồi theo tiêu chí.
API được bảo vệ bằng quyền ADMIN.
Có Loading, Error và Empty State.
Không làm hỏng chức năng hiện tại.
Giao diện Responsive.

11. NGUYÊN TẮC LÀM VIỆC CỦA AGENT
Không code ngay khi chưa khảo sát codebase.
Không tự ý thay đổi kiến trúc hiện tại.
Không tự ý thay đổi giao diện trang Vocabulary.
Không tạo dữ liệu giả để thay thế API thật.
Không tự ý thay đổi cấu trúc database khi chưa phân tích tác động.
Nếu thiếu bảng hoặc thiếu trường dữ liệu, phải báo cáo và đề xuất migration.
Tái sử dụng component hiện có khi phù hợp.
Không tạo chức năng giả hoặc nút bấm không có xử lý.
Phải kiểm tra lại toàn bộ chức năng sau khi triển khai.
Báo cáo các file đã tạo, file đã sửa, API đã triển khai và database đã thay đổi.

DELIVERABLE CUỐI CÙNG:

Một khu vực Admin hoàn chỉnh tại /admin, có Dashboard và Writing Management hoạt động với dữ liệu thực tế, giao diện đồng nhất với trang Vocabulary hiện tại và sẵn sàng mở rộng thêm các module quản trị khác trong những giai đoạn tiếp theo.