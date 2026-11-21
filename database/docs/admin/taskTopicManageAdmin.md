# TASK PLAN: XÂY DỰNG ADMIN QUẢN LÝ TOPICS

## 1. Tổng quan

### Mục tiêu

Xây dựng module quản lý chủ đề (`topics`) trong khu vực Admin hiện có. Admin có thể xem, tìm kiếm, tạo, sửa và (có điều kiện) xóa/ẩn topic, đồng thời bảo toàn dữ liệu bài tập, từ vựng và thành ngữ đang tham chiếu tới topic.

Đường dẫn đề xuất:

- `/admin/topics` — danh sách topic, tìm kiếm, lọc theo module.
- `/admin/topics/create` — tạo topic.
- `/admin/topics/:id/edit` — sửa topic.
- `/admin/topics/:id` — xem chi tiết topic và số lượng nội dung đang tham chiếu.

Chức năng giai đoạn đầu:

- Danh sách có tìm kiếm theo tên, lọc theo `module_type`, phân trang phía backend.
- Xem chi tiết topic và thống kê số bài tập/từ/thành ngữ đang dùng topic đó.
- Tạo và sửa `Name`, `Description`, `ImageURL`, `ModuleType` theo quy tắc đã chốt.
- Xóa topic chỉ khi không còn nội dung tham chiếu; nếu đã có dữ liệu thì chuyển sang ẩn (ngừng sử dụng).

Không xóa cứng topic đang có dữ liệu liên quan; không làm thay đổi hành vi hiện tại của `TopicsController` công khai (`/api/topics`) ngoài việc lọc topic đã ẩn.

## 2. Khảo sát hiện trạng và căn cứ database

### 2.1. Bảng `topics`

Entity [Topic.cs](/D:/Eng-Learning-App/backend/EnglishLearning/EnglishLearning.DAL/Entities/Topic.cs) và bảng `topics` trong [englearning.sql](/D:/Eng-Learning-App/database/englearning.sql) có các trường:

| Trường | Kiểu / giới hạn hiện tại | Ý nghĩa trong module |
|---|---|---|
| `Id` | `int`, khóa chính, tự tăng | Định danh topic |
| `Name` | `varchar(255)`, bắt buộc | Tên hiển thị |
| `Description` | `text`, nullable | Mô tả |
| `image_url` | `varchar(255)`, nullable | Đường dẫn ảnh (hiện là đường dẫn tĩnh, ví dụ `/assets/topics/tech.webp`) |
| `module_type` | `varchar(255)`, bắt buộc | Module sử dụng topic |
| `create_by` | `varchar(255)`, nullable | Tên người tạo (dữ liệu tự do) |
| `create_by_user_id` | `int`, nullable | Người tạo; topic seed hệ thống có thể để `NULL` |

Không có cột `created_at`, `updated_at`, `is_active` hay cờ xóa mềm. Không hiển thị ngày tạo/ngày sửa nếu chưa bổ sung cột và nguồn dữ liệu đáng tin cậy.

### 2.2. Giá trị `module_type` đang dùng

Từ [TopicSeeder.cs](/D:/Eng-Learning-App/backend/EnglishLearning/EnglishLearning.DAL/Data/Seeders/TopicSeeder.cs):

- `WRITING` — 12 topic.
- `SPEAKING` — 7 topic.
- `VOCABULARY` — 11 topic; có thể gắn `create_by_user_id` và chỉ hiển thị cho người tạo theo `CanViewTopic` trong [TopicsController.cs](/D:/Eng-Learning-App/backend/EnglishLearning/EnglishLearning.API/Controllers/TopicsController.cs).
- `IDIOM` — 17 topic.

Các bảng bài tập `reading_exercises`, `listening_exercises`, `translation_exercises` cũng có `topic_id` nhưng seeder không tạo topic cho các module này. Cần khảo sát dữ liệu thực tế trước khi cố định danh sách module hợp lệ (xem mục 2.4).

### 2.3. Các bảng tham chiếu tới `topics`

| Bảng | Cột | Hành vi xóa theo `englearning.sql` | Ghi chú |
|---|---|---|---|
| `listening_exercises` | `topic_id` | `ON DELETE CASCADE` | Xóa topic sẽ xóa đề |
| `reading_exercises` | `topic_id` | `ON DELETE CASCADE` | Xóa topic sẽ xóa đề |
| `translation_exercises` | `topic_id` | `ON DELETE CASCADE` | Xóa topic sẽ xóa đề |
| `words` | `topic_id` | `ON DELETE CASCADE` | Xóa topic sẽ xóa từ vựng |
| `speaking_exercises` | `topic_id` | Không khai báo (mặc định chặn) | Ràng buộc từ SQL dump |
| `writing_exercises` | `topic_id` | Không khai báo (mặc định chặn) | EF cấu hình `Restrict` tại `AppDbContext` |
| `idioms` | `topic_id` | Cần xác minh trong SQL/migration | Entity `Idiom` có `TopicId`, controller nhóm theo topic |

Speaking attempts/answers và các lượt làm bài phía học viên phụ thuộc vào đề; xóa đề/topic có thể làm mất lịch sử chấm điểm. Các cascade trong bảng trên chỉ phản ánh SQL dump; **phải đối chiếu với migration mới nhất và `AppDbContext` trước khi viết logic xóa**, vì EF snapshot có thể khác.

### 2.4. Kiểm tra bắt buộc trước khi code

1. So sánh `englearning.sql`, entity `Topic`, `AppDbContext`, migration mới nhất (`AddedImageURLToTopics`, `AddedTopicIdToIdioms`) và schema thực tế. Xác minh chính xác delete behavior của từng FK `topic_id`.
2. Thống kê phân bố `module_type` trên dữ liệu đã triển khai, kể cả giá trị không chuẩn hóa (khác hoa/thường, khoảng trắng).
3. Kiểm tra trùng lặp `(module_type, Name)` không phân biệt hoa thường. `TopicSeeder` đang dedup theo cặp này bằng `Normalize`, nên đây là quy tắc nghiệp vụ hiện hành; cần kiểm kê trước khi thêm unique index.
4. Thống kê số topic `VOCABULARY` có `create_by_user_id` khác `NULL` và quyết định Admin được phép sửa/xóa topic do người dùng tạo hay không.
5. Kiểm tra cách `image_url` đang được frontend dùng (đường dẫn `/assets/topics/...` trong `public/assets/topics/`) và có cần upload ảnh hay chỉ nhập đường dẫn.
6. Kiểm tra cấu trúc `AdminController`, `AdminVocabularyController`, `AdminSpeakingController` (pattern `api/admin/...`, `[Authorize(Roles = "ADMIN")]`), DI trong `Program.cs`, và convention phân trang đang dùng trong `AdminReadModels`.

## 3. Quy tắc thiết kế và an toàn dữ liệu

1. Tạo API riêng dưới `/api/admin/topics`; controller có `[Authorize(Roles = "ADMIN")]`. Route guard frontend không thay thế kiểm tra quyền ở backend.
2. Không xóa cứng topic đang được tham chiếu. Trước khi xóa, backend đếm các bảng tham chiếu (mục 2.3); nếu số lượng lớn hơn 0 thì trả `409 Conflict` kèm số lượng theo từng bảng.
3. Chốt cơ chế ẩn topic:
   - Phương án đề xuất: thêm cột `is_active` (`tinyint(1)`, mặc định `1`) bằng migration không phá hủy.
   - Topic ẩn: không hiện trong `GET /api/topics` và `GET /api/topics/module/{moduleType}`; vẫn hiện trong Admin với nhãn "Đã ẩn"; API học viên từ chối truy cập bài thuộc topic ẩn theo quy tắc của từng module.
   - Chặn tạo bài mới gắn với topic ẩn.
4. `module_type` chỉ nhận giá trị thuộc tập được chốt (ví dụ `WRITING`, `SPEAKING`, `VOCABULARY`, `IDIOM`, và các module khác nếu khảo sát xác nhận). Chuẩn hóa `Trim().ToUpperCase()` khi nhận input, khớp với `TopicRepository.GetByModuleTypeAsync`.
5. Không cho đổi `module_type` của topic đã có nội dung tham chiếu, vì bài tập/từ/thành ngữ có thể không còn hợp lệ với module mới.
6. `Name` không rỗng, tối đa 255 ký tự; không trùng `(module_type, Name)` không phân biệt hoa thường trong cùng module. Kiểm tra ở service và, sau khi kiểm kê dữ liệu, thêm unique index bằng migration.
7. `Description` tối đa theo `text`; `ImageURL` tối đa 255 ký tự và chỉ chấp nhận đường dẫn tương đối (`/assets/topics/...`) hoặc URL `https` đã được duyệt. Không nhận đường dẫn tuyệt đối tới file hệ thống.
8. Topic do Admin tạo là topic hệ thống: `CreateBy = "ADMIN"`, `CreateByUserId = NULL` (cùng quy ước `AdminVocabularyService` và seeder; `CreateByUserId` khác `NULL` nghĩa là topic cá nhân của học viên). Backend không nhận các trường này từ payload và không đổi khi sửa. Người thực hiện được ghi qua log ứng dụng (`UserId` + `TopicId`).
9. Module Admin chỉ thao tác trên topic hệ thống (`CreateByUserId == NULL`); topic Vocabulary cá nhân của học viên không hiển thị và không thể sửa/xóa trong module này.
10. Tìm kiếm dùng truy vấn EF có tham số, chuẩn hóa input và giới hạn độ dài từ khóa; không nối chuỗi SQL.
11. Mọi thay đổi schema (`is_active`, unique index) đi qua EF migration; không chạy migration phá hủy trên database thật. Unique index chỉ thêm sau khi xử lý trùng lặp có sẵn.
12. Mỗi thao tác ghi (tạo/sửa/ẩn/xóa) cần log có `UserId` người thực hiện và `TopicId`; nếu hệ thống chưa có bảng audit thì ghi log ứng dụng, không tạo bảng audit trong phạm vi này trừ khi được duyệt.

## 4. Phạm vi giao diện và hành vi

### 4.1. Danh sách — `/admin/topics`

Thanh công cụ:

- Ô tìm theo `Name`.
- Lọc theo `module_type` và trạng thái (`Đang dùng` / `Đã ẩn`).
- Nút "Tạo topic".
- Phân trang phía backend.

Cột đề xuất:

| Cột | Nội dung |
|---|---|
| ID | `Id` |
| Tên | `Name` kèm ảnh thu nhỏ từ `ImageURL` |
| Module | `ModuleType` |
| Số nội dung | Tổng tham chiếu (từ endpoint usage hoặc field tổng hợp) |
| Trạng thái | Theo `is_active` sau khi chốt |
| Thao tác | Xem, sửa, ẩn/hiện, xóa (chỉ hiện khi không có tham chiếu) |

### 4.2. Form tạo/sửa — `/admin/topics/new`, `/admin/topics/:id/edit`

- Trường: `Name`, `Description`, `ModuleType` (select), `ImageURL`.
- `ModuleType` bị khóa khi topic đã có nội dung tham chiếu.
- Hiển thị lỗi validation từ backend theo field.
- Không hiển thị `CreateByUserId` dạng số thô; hiển thị `CreateBy` nếu có.

### 4.3. Chi tiết — `/admin/topics/:id`

- Thông tin topic.
- Thống kê tham chiếu theo bảng/module (số đề, số từ, số thành ngữ).
- Nút sửa, ẩn/hiện, xóa (bị vô hiệu hóa khi còn tham chiếu, kèm lý do).

## 5. Thiết kế API

Tất cả endpoint nằm trong `AdminTopicsController`, route `api/admin/topics`, `[Authorize(Roles = "ADMIN")]`.

| Method | Route | Mô tả |
|---|---|---|
| GET | `/api/admin/topics?search=&moduleType=&isActive=&page=&pageSize=` | Danh sách phân trang |
| GET | `/api/admin/topics/{id}` | Chi tiết topic |
| GET | `/api/admin/topics/{id}/usage` | Số lượng tham chiếu theo bảng |
| POST | `/api/admin/topics` | Tạo topic |
| PUT | `/api/admin/topics/{id}` | Sửa `Name`, `Description`, `ImageURL` (và `ModuleType` nếu chưa có tham chiếu) |
| PATCH | `/api/admin/topics/{id}/status` | Ẩn/hiện topic (`is_active`) |
| DELETE | `/api/admin/topics/{id}` | Xóa cứng; chỉ thành công khi không có tham chiếu, ngược lại `409` |

Mã lỗi thống nhất:

- `400` — dữ liệu không hợp lệ (tên rỗng, `module_type` ngoài tập cho phép, URL ảnh sai định dạng).
- `404` — không tìm thấy topic.
- `409` — trùng tên trong module, đổi `module_type` khi đã có tham chiếu, hoặc xóa khi còn tham chiếu.

Phân trang trả về: `items`, `page`, `pageSize`, `totalCount`, `totalPages`.

## 6. Phân rã công việc

Thứ tự: khảo sát (T1) → DB (T2) → DAL (T3) → BLL (T4) → API (T5) → Frontend (T6) → Test (T7) → Tài liệu (T8).

### T1. Khảo sát dữ liệu và xác nhận quyết định

- Kiểm kê `module_type`, trùng `(module_type, Name)`, topic VOCABULARY có người tạo.
- Đối chiếu delete behavior của mọi FK `topic_id` với migration mới nhất.
- Chốt: danh sách `module_type` hợp lệ; có dùng `is_active` không; Admin có sửa topic do người dùng tạo không; upload ảnh hay chỉ nhập đường dẫn.
- Đầu ra: ghi kết quả vào mục 7 của tài liệu này.
- Phụ thuộc: không.

### T2. Thay đổi schema bằng migration

- Thêm `is_active` (`tinyint(1)`, `NOT NULL`, mặc định `1`) vào entity `Topic` và `AppDbContext` (nếu được duyệt).
- Thêm unique index `(module_type, Name)` chỉ khi kiểm kê T1 không còn trùng; nếu có trùng thì làm sạch dữ liệu trước theo quy trình đã duyệt.
- Tạo migration bằng `dotnet ef migrations add`, không sửa migration cũ; cập nhật `HowToRunEFMigrations.md` nếu có bước mới.
- Phụ thuộc: T1.

### T3. DAL: repository quản trị

- Tạo `IAdminTopicRepository` và `AdminTopicRepository` trong `EnglishLearning.DAL`:
  - `QueryAsync(filter, paging)` — danh sách có tìm kiếm/lọc/phân trang, `AsNoTracking`.
  - `GetByIdAsync`, `ExistsAsync(module, name, excludeId)`.
  - `GetUsageCountsAsync(topicId)` — đếm tham chiếu từ `listening_exercises`, `reading_exercises`, `translation_exercises`, `words`, `speaking_exercises`, `writing_exercises`, `idioms`.
  - `AddAsync`, `UpdateAsync`, `DeleteAsync`.
- Đăng ký DI trong `Program.cs` cùng nhóm với `ITopicRepository`.
- Phụ thuộc: T2.

### T4. BLL: service và DTO

- Tạo DTO trong `EnglishLearning.DAL/ReadModels/` (`AdminTopicReadModels.cs`, theo mẫu `AdminUserReadModels.cs`): request, response, paging.
- Tạo `IAdminTopicService` và `AdminTopicService` trong `Interfaces/` và `Services/`:
  - Validate theo mục 3 (tên, module, URL ảnh, trùng tên).
  - Quy tắc xóa: kiểm tra tham chiếu trước khi xóa; trả kết quả có cấu trúc để controller map sang `409`.
  - Quy tắc đổi `module_type`: chặn khi có tham chiếu.
- Đăng ký DI trong `Program.cs`.
- Phụ thuộc: T3.

### T5. API: controller admin

- Tạo `AdminTopicsController` theo mẫu `AdminVocabularyController` / `AdminSpeakingController`.
- Controller chỉ parse request, gọi service, map lỗi sang `400/404/409`; không chứa logic nghiệp vụ.
- Lấy `UserId` từ claim để ghi log người thực hiện.
- Phụ thuộc: T4.

### T6. Frontend

- Thêm hàm gọi API vào `frontend/src/services/adminApi.js` (module dùng chung `request` có `API_URL`, token từ `authApi` và xử lý 401 → logout).
- Tạo trang trong `src/pages/` cho danh sách, form tạo/sửa, chi tiết; đặt route trong `src/App.jsx` bọc `RequireAuth` và `RequireAdmin`.
- Thêm mục "Topics" vào menu admin hiện có.
- Hiển thị lỗi 409 bằng thông báo rõ ràng (ví dụ "Topic đang có 12 bài tập tham chiếu").
- Chạy `npm run lint` trong `frontend/`.
- Phụ thuộc: T5 (có thể làm song song với mock theo contract API đã chốt ở mục 5).

### T7. Kiểm thử

- Thêm `AdminTopicServiceTests.cs` vào `EnglishLearning.Tests` (dùng Moq cho `IAdminTopicRepository`), chỉ các ca:
  - Tạo/sửa với tên rỗng, `module_type` không hợp lệ, URL ảnh sai.
  - Trùng `(module, Name)` không phân biệt hoa thường.
  - Đổi `module_type` khi có tham chiếu bị từ chối.
  - Xóa khi có tham chiếu trả kết quả conflict; xóa khi không có tham chiếu thành công.
  - Chuẩn hóa `moduleType` về chữ hoa.
- Chạy:
  ```powershell
  cd backend\EnglishLearning
  dotnet build EnglishLearning.slnx
  dotnet test EnglishLearning.Tests/EnglishLearning.Tests.csproj --filter "FullyQualifiedName~AdminTopicServiceTests"
  ```
- Kiểm thử thủ công: API với token ADMIN và USER (USER phải nhận 403); topic ẩn không xuất hiện ở `/api/topics`.
- Phụ thuộc: T4, T5.

### T8. Tài liệu

- Cập nhật `HowToRunEFMigrations.md` nếu có migration mới.
- Cập nhật phần API admin liên quan trong README nếu có danh sách endpoint.
- Phụ thuộc: T2, T5.

## 7. Kết quả khảo sát và quyết định (T1) — đã chốt

| Hạng mục | Kết quả | Quyết định |
|---|---|---|
| Phân bố `module_type` | Seeder/SQL dump chỉ có `WRITING`, `SPEAKING`, `VOCABULARY`, `IDIOM`. Chưa kiểm kê được DB production. | Tạo mới chỉ nhận 4 module này. Topic cũ có module khác vẫn sửa được nếu giữ nguyên module. |
| Trùng `(module_type, Name)` | Chưa kiểm kê DB thực tế; MySQL collation `utf8mb4_general_ci` so sánh không phân biệt hoa thường. | Chặn trùng ở repository (`409`). **Chưa thêm unique index**; chỉ thêm sau khi kiểm kê và làm sạch dữ liệu. |
| Topic VOCABULARY do người dùng tạo | `CreateByUserId != NULL` là topic cá nhân (xem `VocabularyRepository`). | Admin chỉ quản lý topic hệ thống (`CreateByUserId == NULL`). |
| Delete behavior `topic_id` | EF snapshot: `Cascade` với Listening/Words; `Restrict` với Writing/Speaking; `reading`/`translation` là FK nullable; `idioms.topic_id` **không có FK** (cột `int` thuần). | Không dựa vào ràng buộc DB: đếm tham chiếu ở cả 7 bảng và chặn xóa/đổi module khi tổng > 0. |
| Có dùng `is_active` không | Không có sẵn. | Có: migration `AddIsActiveToTopics` (`tinyint(1) NOT NULL DEFAULT 1`). Topic ẩn bị loại khỏi `/api/topics*`, danh sách Idioms/Vocabulary hệ thống, và không cho tạo/sửa đề Writing/Speaking gắn vào. |
| Upload ảnh | Ảnh được lưu trong `frontend/public/assets/topics`, database lưu URL `/assets/topics/...`. | Admin chọn file JPEG, PNG, GIF hoặc WebP tối đa 5 MB; ảnh cũ được giữ khi không chọn file mới. |

Backend dùng `TopicImages:Directory` để cấu hình thư mục lưu ảnh; mặc định trỏ tới `frontend/public/assets/topics` trong repository. Thư mục phải tồn tại, cho phép backend ghi và được web server phục vụ tại `/assets/topics`. Khi triển khai frontend và backend riêng biệt, cần chia sẻ thư mục lưu trữ bền vững này với web server; ảnh upload sau khi build không tự xuất hiện trong bản build Vite.

## 8. Trạng thái triển khai

| Task | Trạng thái | Ghi chú |
|---|---|---|
| T1 Khảo sát | Xong | Mục 7; chưa kiểm kê dữ liệu DB production. |
| T2 Migration | Xong | `20261121120612_AddIsActiveToTopics`; đã áp trên DB dev khi khởi động API. |
| T3 DAL | Xong | `IAdminTopicRepository`, `AdminTopicRepository`, `AdminTopicReadModels.cs`. |
| T4 BLL | Xong | `IAdminTopicService`, `AdminTopicService`; DTO dùng chung read model trong DAL như module Users. |
| T5 API | Xong | `AdminTopicsController`; DI trong `Program.cs`. |
| T6 Frontend | Xong | `pages/admin/topics/` (Tailwind v4 inline, không thêm CSS), hàm API trong `services/adminApi.js`, route trong `App.jsx`, menu "Quản lý Topics". |
| T7 Kiểm thử | Xong | `AdminTopicServiceTests` + `dotnet test` (42 test đạt), `eslint`, `npm run build`; kiểm thử API thủ công với token ADMIN (không token → `401`). Chưa kiểm thử với token USER (`403`). |
| T8 Tài liệu | Xong | Không có bước migration mới ngoài `dotnet ef database update`; README không có danh sách endpoint admin nên không đổi. |
