# TASK PLAN: XÂY DỰNG ADMIN QUẢN LÝ SPEAKING

## 1. Mục tiêu và phạm vi

Xây dựng khu vực quản trị Speaking trong `/admin`, thống nhất với Admin Dashboard/Writing hiện tại và dùng dữ liệu thật:

- Quản lý đề Speaking và danh sách câu hỏi.
- Tra cứu bài nộp của học viên, xem kết quả chấm theo tiêu chí và nghe audio.
- Theo dõi trạng thái chấm tự động; hỗ trợ xử lý các lượt chấm thất bại theo quy tắc hiện có.
- Bảo vệ API Admin và dữ liệu/audio của học viên.

Không thay thế luồng luyện tập hiện có của học viên, không thay đổi cách chấm Speaking nếu chưa có yêu cầu nghiệp vụ riêng. Không triển khai code trong bước lập kế hoạch này.

## 2. Khảo sát hiện trạng

### 2.1. Frontend

- Admin hiện có route `/admin`, Dashboard và các route quản lý Writing trong `frontend/src/App.jsx`.
- `AdminLayout` có điều hướng Dashboard/Writing; các mục Speaking, Reading, Listening đang là mục dự kiến.
- Route Admin được bọc bởi `RequireAuth` và `RequireAdmin`; giao diện Admin đang dùng Tailwind trực tiếp trong JSX.
- Speaking phía học viên hiện có thư viện đề, các trang Part 1/2/3, API client, hook quản lý lượt làm và hook ghi âm.
- Phần thư viện đọc `SpeakingType` với các giá trị đang dùng: `INTRODUCTION_INTERVIEW`, `TOPIC`, `TOPIC_DISCUSS`. Part 2 chỉ dùng câu hỏi đầu tiên; Part 1/3 lần lượt hiển thị danh sách câu hỏi.

### 2.2. Backend và luồng chấm

- `SpeakingExercisesController` cung cấp API đọc đề; `SpeakingExerciseService/Repository` hiện chủ yếu phục vụ truy vấn, chưa có CRUD Admin.
- `SpeakingAssessmentController` phục vụ lượt làm của học viên. Các truy vấn lượt làm được ràng buộc theo `userId` trong claim; không dùng lại các endpoint này như API đọc dữ liệu toàn hệ thống cho Admin.
- Luồng chấm được xử lý nền bởi `SpeakingGradingWorker` và `SpeakingGradingQueue`. Các trạng thái đang có: `IN_PROGRESS`, `SUBMITTED`, `GRADING`, `GRADING_FAILED`, `GRADED`, `ABANDONED`.
- Điểm tổng được tính từ bốn tiêu chí `FLUENCY_COHERENCE`, `LEXICAL_RESOURCE`, `GRAMMAR_ACCURACY`, `PRONUNCIATION`; mỗi tiêu chí dùng thang 0–9 với bước 0.5. Khi hiển thị cần giữ đúng quy tắc tính điểm hiện tại.
- Audio được lưu trên disk theo `Speaking:AudioStoragePath` (mặc định `App_Data/speaking/{userId}/{attemptId}`); `AudioUrl` là đường dẫn tương đối, không phải URL public.
- Các giới hạn hiện tại cần giữ nguyên: tối đa 10 MB mỗi câu trả lời và 20 MB mỗi lượt làm. Ghi âm phía học viên hiện là WAV mono 16 kHz.

### 2.3. Database hiện có

Các bảng và trường chính:

- `topics`: dùng topic có `module_type = 'SPEAKING'`.
- `speaking_exercises`: `id`, `topic_id`, `title`, `speaking_type`, `created_at`.
- `speaking_questions`: `id`, `exercise_id`, `question_number`, `question_text`, `cues` (JSON), `closing`, `preparation_time`, `response_time`.
- `user_speaking_attempts`: `user_id`, `exercise_id`, `status`, `overall_score`, `grading_result`, `started_at`, `completed_at`.
- `user_speaking_answers`: `attempt_id`, `question_id`, `audio_url`, `transcript`, `submitted_at`.
- `speaking_criterion_scores`: `attempt_id`, `criterion_code`, `score`, `feedback`, `strengths`, `weaknesses`, `suggestions`, `issues` (JSON).

Schema hiện chưa có trạng thái xuất bản/ngừng sử dụng cho đề và chưa lưu bản chụp nội dung câu hỏi tại thời điểm học viên làm bài. Snapshot EF hiện cấu hình cascade delete từ topic đến đề, từ đề đến câu hỏi/lượt làm, và từ câu hỏi/lượt làm đến câu trả lời; xóa đề hoặc topic có thể làm mất lịch sử attempt/answers/scores, đồng thời làm audio mất liên kết hoặc để lại file mồ côi trên disk. Đây là ràng buộc phải xử lý trước khi triển khai chức năng xóa/ẩn đề.

## 3. Quyết định thiết kế cần giữ

1. Tạo API Admin riêng dưới `/api/admin/speaking`; mọi endpoint phải xác thực `ADMIN` ở backend. Kiểm tra role ở frontend chỉ phục vụ điều hướng, không thay thế phân quyền API.
2. Không trả `AudioUrl` dạng đường dẫn hệ thống cho trình duyệt. Phát audio qua endpoint xác thực theo `answerId`, xác minh bản ghi, rồi stream nội dung từ storage riêng.
3. Không xóa cứng đề, topic, lượt làm hoặc câu trả lời nếu tồn tại dữ liệu liên quan. Quan hệ cascade hiện tại khiến xóa cứng có thể xóa submission. Ưu tiên bổ sung trạng thái đề (`is_active` hoặc trạng thái tương đương) bằng migration, lọc đề ngừng hoạt động khỏi thư viện và chặn tạo lượt mới. Giữ cho lượt đang làm/lịch sử có thể truy cập theo chính sách được duyệt.
4. Vì attempt tham chiếu đề hiện tại và answer tham chiếu trực tiếp `question_id`, thay đổi title/topic/Part hoặc chỉnh sửa/xóa câu hỏi sau khi có submission đều có thể làm sai nội dung lịch sử. Giai đoạn đầu nên khóa mọi chỉnh sửa nội dung đề đã có attempt, chỉ cho phép bật/tắt trạng thái; nếu cần chỉnh sửa, phải thiết kế version/snapshot và migration trước.
5. Không chỉnh trực tiếp điểm, phản hồi hoặc trạng thái attempt qua API CRUD thông thường. Chức năng retry chỉ dành cho trạng thái cho phép (tối thiểu `GRADING_FAILED`), phải dùng lại queue/service hiện có và chống enqueue trùng.
6. Chỉ bổ sung migration nếu quyết định triển khai trạng thái xuất bản hoặc snapshot lịch sử; không tạo lại các bảng Speaking hiện hữu.
7. Không giả định có trường mô tả đề trong schema Speaking hiện tại. Chỉ thêm nếu nghiệp vụ cần và đã có migration/API đồng bộ.

## 4. Setup plan theo giai đoạn

### Giai đoạn 0 — Chốt hành vi và ràng buộc dữ liệu

- Xác nhận cách ẩn/ngừng xuất bản đề, xử lý lượt đang làm, và chính sách giữ audio.
- Chốt giới hạn nội dung câu hỏi có thể sửa sau khi đề có submission.
- Kiểm tra lại cấu hình storage trên môi trường triển khai; không giả định thư mục audio luôn nằm trong web root.

### Giai đoạn 1 — Backend Admin

- Tạo DTO, service/repository Admin tách biệt cho quản lý đề và bài nộp.
- Bổ sung CRUD đề/câu hỏi có validate và quy tắc bảo vệ lịch sử.
- Bổ sung danh sách/chi tiết submission, truy vấn audio an toàn và retry grading có điều kiện.
- Bổ sung trạng thái đề/migration nếu được chốt ở Giai đoạn 0; cập nhật API thư viện và API tạo lượt làm của học viên tương thích.

### Giai đoạn 2 — Frontend Admin

- Thêm khu vực Speaking vào `AdminLayout`, theo cấu trúc menu Writing: chuyển qua lại giữa “Quản lý đề Speaking” và “Bài nộp Speaking”.
- Thêm danh sách, form tạo/sửa, trang chi tiết đề.
- Thêm danh sách submission có tìm kiếm/lọc/phân trang và trang chi tiết kết quả/audio.
- Dùng Tailwind trực tiếp trong JSX, theo các component/layout Admin hiện tại; có loading, error, empty và trạng thái thao tác.

### Giai đoạn 3 — Kiểm thử và rollout

- Kiểm thử quyền, validate, dữ liệu lịch sử, phát audio, retry grading và tương thích API học viên.
- Kiểm tra migration trên database có dữ liệu sao lưu; kiểm tra không xóa dữ liệu khi ẩn đề.
- Kiểm tra responsive, log lỗi, console và các luồng Speaking hiện có trước khi rollout.

## 5. Định nghĩa task

### TASK 1 — Khảo sát và chốt quy tắc Admin Speaking

**Mục tiêu:** Xác nhận API, auth, schema, grading worker, storage và chính sách dữ liệu trước khi triển khai.

**Công việc:**

- Đối chiếu controller/service/repository/DTO và route frontend hiện tại.
- Xác minh role claim/API pattern đang dùng trong Admin Writing.
- Chốt trạng thái xuất bản, quyền sửa đề có submission, retention audio và retry grading.
- Ghi rõ các thay đổi schema cần migration trước khi bắt đầu code.

**Hoàn thành khi:** Có quyết định rõ cho các trường hợp xóa/ẩn/sửa đề và endpoint audio; không còn giả định về cascade hoặc quyền Admin.

### TASK 2 — Bảo vệ vòng đời đề và dữ liệu lịch sử

**Mục tiêu:** Không để thay đổi quản trị làm mất hoặc làm sai lệch bài đã nộp.

**Công việc:**

- Nếu được duyệt, thêm trạng thái active/inactive và migration tương thích dữ liệu cũ (đề hiện hữu tiếp tục được bật).
- Lọc đề inactive khỏi danh sách luyện tập; chặn tạo attempt mới cho đề inactive nhưng không làm hỏng lượt đang làm/lịch sử theo chính sách đã chốt.
- Chặn xóa cứng đề/topic có attempt; khóa sửa các trường đề và sửa/xóa câu hỏi khi đã có attempt/answer, hoặc triển khai snapshot/version nếu yêu cầu nghiệp vụ cần sửa.
- Kiểm tra lại delete behavior/schema trước khi chạy migration.

**Hoàn thành khi:** Có kiểm thử chứng minh không thể xóa dây chuyền submission/audio; migration không làm mất dữ liệu và API học viên vẫn tương thích.

### TASK 3 — Xây dựng API quản lý đề Speaking

**Mục tiêu:** Cung cấp CRUD Admin cho đề và câu hỏi theo schema hiện hữu.

**API đề xuất:**

- `GET /api/admin/speaking/exercises` — danh sách, tìm kiếm, lọc theo topic/Part/trạng thái, phân trang.
- `GET /api/admin/speaking/exercises/{id}` — chi tiết đề và câu hỏi theo thứ tự.
- `POST /api/admin/speaking/exercises` — tạo đề và các câu hỏi.
- `PUT /api/admin/speaking/exercises/{id}` — cập nhật đề/câu hỏi theo quy tắc khóa lịch sử.
- `PATCH /api/admin/speaking/exercises/{id}/status` — bật/tắt đề nếu có trạng thái được duyệt.
- Không cung cấp xóa cứng ở giai đoạn đầu; trả `409 Conflict` nếu thao tác vi phạm ràng buộc có submission.

**Validate tối thiểu:**

- Topic phải tồn tại và thuộc `SPEAKING`; `Title` không rỗng; `SpeakingType` thuộc tập giá trị được ứng dụng hỗ trợ.
- Danh sách câu hỏi phải hợp lệ, số thứ tự không trùng và sắp xếp xác định; `QuestionNumber` nằm trong miền kiểu dữ liệu.
- `QuestionText` không rỗng; `Cues` phải là JSON array hợp lệ; thời gian chuẩn bị/trả lời phải không âm và phù hợp Part.
- Part 2 cần hỗ trợ cue card (`Cues`, `Closing`, timer) và cách dùng một câu hỏi như UI học viên hiện tại.

**Hoàn thành khi:** API có phân quyền backend, validate lỗi rõ ràng (`400`, `404`, `409`), không thay đổi response của API học viên ngoài yêu cầu vòng đời đề, và có unit/integration tests cho CRUD/quy tắc lịch sử.

### TASK 4 — Xây dựng API bài nộp và audio

**Mục tiêu:** Admin có thể tra cứu, xem kết quả và nghe bản ghi mà không bỏ qua quyền sở hữu ở endpoint học viên.

**API đề xuất:**

- `GET /api/admin/speaking/submissions` — phân trang; lọc theo học viên, đề, topic, Part, trạng thái, khoảng điểm và thời gian; sắp xếp mới nhất.
- `GET /api/admin/speaking/submissions/{attemptId}` — chi tiết học viên, đề/câu hỏi, transcript, thời điểm trả lời, trạng thái, điểm tổng, bốn tiêu chí và dữ liệu feedback.
- `GET /api/admin/speaking/answers/{answerId}/audio` — stream audio đã xác minh quyền Admin; không trả filesystem path hoặc cho phép client chỉ định path.
- `POST /api/admin/speaking/submissions/{attemptId}/retry-grading` — chỉ cho trạng thái được phép, ưu tiên `GRADING_FAILED`; không enqueue trùng và dùng lại service/queue hiện tại.

**Hoàn thành khi:** API không cho phép truy cập attempt tùy ý qua endpoint học viên; trả đúng trạng thái và tiêu chí; audio không public; lỗi file không tồn tại được thể hiện rõ; retry không làm tạo grading job trùng.

### TASK 5 — Tích hợp route và điều hướng Admin Speaking

**Mục tiêu:** Bổ sung điểm vào khu vực Speaking theo UX quản lý Writing.

**Công việc:**

- Thêm lazy routes dưới `/admin/speaking` và các route con list/create/edit/detail/submissions.
- Thêm mục Speaking vào sidebar và menu chuyển đổi giữa quản lý đề/bài nộp.
- Cập nhật tiêu đề trang và active state theo route; giữ các route Writing/Dashboard hiện tại.

**Hoàn thành khi:** Admin truy cập được các route; non-admin không vào được; route Writing và Dashboard không bị đổi hành vi; có fallback khi tải trang.

### TASK 6 — Xây dựng giao diện quản lý đề

**Mục tiêu:** Admin tạo, xem, lọc và cập nhật đề/câu hỏi đúng format học viên sử dụng.

**Công việc:**

- Danh sách có tìm kiếm, topic, Part, trạng thái, phân trang và thông tin số câu hỏi.
- Form tạo/sửa gồm topic, title, Part và editor câu hỏi có thêm/xóa/sắp xếp.
- Editor theo Part: question text, cues, closing, preparation/response time; thể hiện rõ trường nào không áp dụng.
- Trang chi tiết hiển thị nội dung giống cấu trúc thư viện, có cảnh báo khi đề đã có submission và khóa thao tác nguy hiểm.

**Hoàn thành khi:** Dữ liệu lưu qua API thật, UI không tạo dữ liệu giả, hiển thị validation lỗi, xác nhận thao tác đổi trạng thái và có loading/error/empty state responsive.

### TASK 7 — Xây dựng giao diện bài nộp Speaking

**Mục tiêu:** Tra cứu submission và hỗ trợ xem kết quả chấm có thể kiểm tra được.

**Công việc:**

- Bảng danh sách có học viên, đề/Part, thời gian nộp, trạng thái, điểm và thao tác xem.
- Filter/search/pagination đồng bộ với query API; biểu diễn riêng trạng thái đang chấm, thất bại và đã chấm.
- Trang chi tiết nhóm nội dung theo từng câu: đề, transcript, audio player, trạng thái, điểm tiêu chí, feedback, strengths, weaknesses, suggestions, issues.
- Hiển thị đủ bốn tiêu chí và điểm tổng; chỉ hiện nút retry grading khi trạng thái cho phép.

**Hoàn thành khi:** Dữ liệu là response API thật; audio phát qua endpoint được bảo vệ; retry có xác nhận/loading/thông báo kết quả; lỗi tải audio hoặc kết quả được hiển thị rõ.

### TASK 8 — Kiểm thử, bảo mật và hoàn thiện

**Mục tiêu:** Xác nhận Admin Speaking hoạt động đầu-cuối và không ảnh hưởng luồng học viên.

**Kiểm thử bắt buộc:**

- Auth: chưa đăng nhập, user thường, Admin; thử trực tiếp API chứ không chỉ route UI.
- Exercise: CRUD, topic không thuộc SPEAKING, Part không hợp lệ, câu hỏi trùng số, cues JSON lỗi, timer sai, đề có/không có attempt.
- Submission: mỗi trạng thái, không có điểm, đủ bốn criteria, filter/pagination, attempt không tồn tại.
- Audio: file hợp lệ, file thiếu, quyền truy cập, giới hạn dung lượng; không lộ đường dẫn nội bộ.
- Retry: trạng thái cho phép/không cho phép, enqueue lặp và worker đang xử lý.
- Regression: các trang Part 1/2/3, tạo/lưu/nộp attempt, queue grading và kết quả học viên.
- Responsive, accessibility cơ bản, console/network và migration trên database thử nghiệm có dữ liệu mẫu đã sao lưu.

**Hoàn thành khi:** Build/type/lint và các test liên quan đạt; không mất lịch sử/submission/audio; các luồng Speaking học viên hiện tại vẫn dùng được.

## 6. Phân thứ tự và phụ thuộc

| Thứ tự | Task | Phụ thuộc |
|---|---|---|
| 1 | Khảo sát và chốt quy tắc Admin Speaking | Không |
| 2 | Bảo vệ vòng đời đề và dữ liệu lịch sử | TASK 1 |
| 3 | API quản lý đề Speaking | TASK 1, TASK 2 |
| 4 | API bài nộp và audio | TASK 1 |
| 5 | Route và điều hướng Admin Speaking | TASK 1 |
| 6 | Giao diện quản lý đề | TASK 3, TASK 5 |
| 7 | Giao diện bài nộp Speaking | TASK 4, TASK 5 |
| 8 | Kiểm thử, bảo mật và hoàn thiện | TASK 2–7 |

TASK 3 và TASK 4 có thể triển khai song song sau khi chốt hợp đồng DTO/API; TASK 6 và TASK 7 có thể triển khai song song khi route/layout và API tương ứng đã ổn định.

## 7. Tiêu chí nghiệm thu tổng thể

- Admin có thể quản lý đề/câu hỏi và bài nộp Speaking từ `/admin`, dùng đúng dữ liệu và cấu trúc hiện tại.
- Tìm kiếm, lọc, phân trang, loading/error/empty state hoạt động ở cả hai khu vực.
- Tất cả API Admin được bảo vệ bằng quyền `ADMIN` ở backend.
- Điểm tổng, tiêu chí, feedback và trạng thái grading khớp dữ liệu lưu; không sửa âm thầm kết quả.
- Audio được stream có xác thực; không công khai thư mục storage hoặc đường dẫn nội bộ.
- Không thể xóa dây chuyền attempt, câu trả lời, criterion scores hoặc audio; đề có lịch sử tuân theo chính sách đã chốt.
- API học viên, ghi âm, lưu câu trả lời, nộp bài và worker grading hiện tại vẫn hoạt động.
- Frontend Admin dùng Tailwind trực tiếp, responsive, thống nhất với Admin hiện tại; không thêm stylesheet riêng nếu không có yêu cầu.
- Migration (nếu có) được kiểm thử trên database có dữ liệu và có phương án rollback/backup; không thực hiện thao tác destructive trên database thật trong quá trình phát triển.

## 8. Nguyên tắc triển khai

- Đọc code và schema thực tế trước mỗi thay đổi; ưu tiên tái sử dụng service/repository/helper hiện có.
- Tách rõ endpoint Admin khỏi endpoint học viên; không bỏ qua kiểm tra quyền hoặc ràng buộc `userId` hiện có.
- Không tự ý đổi model chấm, trạng thái, giới hạn audio hay format ghi âm.
- Không xóa cứng dữ liệu có liên quan; mọi thay đổi schema cần nêu tác động và kiểm thử dữ liệu cũ.
- Không đưa audio hoặc transcript nhạy cảm vào log; trả lỗi rõ ràng, không dùng dữ liệu giả để thay API.
