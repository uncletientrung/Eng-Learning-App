# TASK PLAN: XÂY DỰNG ADMIN QUẢN LÝ NGƯỜI DÙNG

## 1. Tổng quan

### Mục tiêu

Xây dựng module quản lý tài khoản người dùng trong khu vực Admin hiện có, sử dụng dữ liệu thật từ bảng `user` và bảo toàn lịch sử học tập liên quan.

Đường dẫn đề xuất:

- `/admin/users` — danh sách người dùng.
- `/admin/users/:id` — xem thông tin và hoạt động học tập của một người dùng.
- `/admin/users/:id/edit` — cập nhật thông tin được phép chỉnh sửa.

Chức năng giai đoạn đầu:

- Tìm kiếm, lọc và phân trang danh sách.
- Xem thông tin tài khoản và tóm tắt hoạt động học tập.
- Tạo tài khoản mới với mật khẩu được hash bằng cơ chế hiện có.
- Cập nhật thông tin cơ bản.
- Khóa/mở khóa tài khoản theo quy ước `Status` sau khi xác minh dữ liệu thực tế.
- Thay đổi quyền tài khoản theo chính sách Admin được duyệt.

Không xóa cứng tài khoản; không trả về mật khẩu/hash; không tạo số liệu không có trong database. Không thay đổi luồng đăng nhập hoặc cơ chế xác thực hiện tại ngoài phạm vi đã được duyệt.

## 2. Khảo sát hiện trạng và căn cứ database

### 2.1. Bảng `user`

Entity `User` và schema SQL hiện có các trường:

| Trường | Kiểu / giới hạn hiện tại | Ý nghĩa trong module |
|---|---|---|
| `Id` | `int`, khóa chính, tự tăng | Định danh tài khoản |
| `Name` | `varchar(255)`, bắt buộc | Tên hiển thị |
| `Role` | `varchar(255)`, bắt buộc | Vai trò; đăng nhập đưa giá trị này vào role claim |
| `Username` | `varchar(255)`, bắt buộc | Tên đăng nhập/định danh hiển thị nếu ứng dụng đang dùng |
| `Password` | `varchar(255)`, bắt buộc | Hash mật khẩu; không được trả về client |
| `Email` | `varchar(255)`, bắt buộc | Email đăng nhập hiện được tra cứu trong API login |
| `Phone` | `varchar(255)`, bắt buộc | Số điện thoại |
| `Status` | `tinyint`, bắt buộc | API login từ chối khi bằng `0`; cần khảo sát dữ liệu trước khi gán nhãn/ghi giá trị khác |
| `CurrentStreak` | `int`, mặc định `0` trong EF | Chuỗi ngày học hiện tại |
| `LastStudyDate` | `date`, nullable | Ngày học gần nhất được ghi nhận |

Schema được kiểm tra trong `database/englearning.sql` chỉ khai báo khóa chính cho `user`, chưa thể hiện unique index trên `Email` hoặc `Username`, cũng không có `CreatedAt`, `UpdatedAt`, `LastLoginAt`, ảnh đại diện hoặc cờ xóa mềm. Không đưa các trường này vào giao diện/API như thể đã có dữ liệu.

`AuthController` đang:

- Tìm tài khoản bằng `Email`.
- Từ chối đăng nhập nếu `Status == 0`.
- Phát JWT với `Id`, `Name`, `Role`.
- Xác minh hash bằng `IPasswordHasher<User>` với hash định dạng hiện tại; còn có nhánh tương thích dữ liệu mật khẩu legacy.

Vì vậy, API Admin phải giữ tương thích với cơ chế hash/đăng nhập; không tự lưu mật khẩu rõ, không ghi đè hash theo một format không tương thích.

### 2.2. Dữ liệu học tập liên quan

Schema SQL hiện có các quan hệ theo `user_id` hoặc `UserId` tối thiểu trong:

- `user_writing_attempts`
- `user_reading_attempts`
- `user_listening_attempts`
- `user_speaking_attempts`
- `user_translation_attempts`
- `user_word_progress`
- `user_translation_content_progress` nếu bảng này tồn tại trong database/migrations đang triển khai

Trong SQL dump, một số khóa ngoại đến `user` dùng `ON DELETE CASCADE` (Reading, Listening, Speaking, Translation và tiến độ từ vựng); Writing dùng `RESTRICT`/không cascade. Xóa tài khoản có thể làm mất bài làm hoặc tiến độ học tập. Cấu hình EF/migrations hiện tại có thể khác SQL dump, cần kiểm tra database và migrations của môi trường triển khai trước mọi thay đổi.

Tóm tắt hoạt động người dùng có thể tổng hợp từ các bảng attempt/progress hiện hữu. Mỗi loại bài có trạng thái và mốc thời gian riêng; chỉ hiển thị chỉ số có thể truy vấn chính xác. Không gộp các trạng thái khác nhau thành một nhãn chung nếu chưa có quy tắc ánh xạ.

### 2.3. Kiểm tra bắt buộc trước khi code

1. So sánh `englearning.sql`, entity, `AppDbContext`, migration mới nhất và schema thực tế; xác minh chính xác bảng progress và tên/casing cột.
2. Thống kê phân bố `Role`, `Status`, giá trị `Email`/`Username` trùng hoặc rỗng trên dữ liệu đã triển khai.
3. Xác minh toàn bộ nơi ghi `Status`, nơi kiểm tra `Role`, quy tắc role được chấp nhận và luồng đăng ký/tạo tài khoản hiện hành.
4. Kiểm tra frontend Admin, route guards, `AdminController`/`AdminService`, DI và pagination convention đang dùng.
5. Chốt quyền nào được phép chỉnh role và quy trình khóa tài khoản; xác minh JWT đang có hiệu lực có bị thu hồi hay vẫn dùng đến hết hạn.

## 3. Quy tắc thiết kế và an toàn dữ liệu

1. Tạo API Admin riêng dưới `/api/admin/users`; tất cả endpoint phải dùng `[Authorize(Roles = "ADMIN")]` hoặc cơ chế tương đương tại backend. Route guard frontend không phải biện pháp bảo vệ API.
2. Danh sách/chi tiết chỉ trả DTO allowlist: `Id`, `Name`, `Role`, `Username`, `Email`, `Phone`, trạng thái đã chuẩn hóa, `CurrentStreak`, `LastStudyDate` và các số liệu học tập đã tổng hợp. Tuyệt đối không trả `Password`, hash hoặc credential.
3. Không xóa cứng user. Tác vụ “xóa” trong UI nếu có chỉ là khóa tài khoản bằng `Status`; phải xác minh quy tắc trạng thái trước khi cập nhật.
4. Không tự suy diễn mọi giá trị `Status` khác `0` là cùng một trạng thái nghiệp vụ. Hiện login chỉ coi `0` là bị khóa; giữ nguyên giá trị lịch sử và chuẩn hóa active/inactive theo quy tắc được chốt.
5. User mới mặc định có quyền thấp nhất được ứng dụng hỗ trợ (dự kiến `USER` sau khi xác minh) và trạng thái theo chính sách hiện hành. Không nhận `Role`/`Status` tùy ý từ payload tạo tài khoản. Cấp quyền `ADMIN` cần endpoint/luồng riêng có xác nhận, kiểm tra quyền và ghi nhận được người thực hiện nếu hệ thống có audit.
6. Chặn tự khóa/tự hạ quyền Admin và bảo vệ không để hệ thống mất Admin cuối cùng. Việc kiểm tra phải an toàn trước cập nhật đồng thời; nếu chưa có audit/concurrency mechanism thì phải xác định giới hạn và ghi rõ trước khi rollout.
7. Không sửa `CurrentStreak` hoặc `LastStudyDate` qua form hồ sơ thông thường; đây là dữ liệu tiến độ do luồng học cập nhật.
8. Với tìm kiếm email/username, dùng truy vấn EF có tham số, chuẩn hóa input và giới hạn độ dài; không nối chuỗi SQL từ input.
9. Chỉ thêm unique index cho `Email`/`Username` sau khi kiểm kê trùng lặp, chốt quy tắc so sánh hoa-thường/collation và có phương án xử lý dữ liệu cũ. Không chạy migration phá hủy trên database thật.
10. Nếu cần khóa hiệu lực ngay với JWT đã phát hành, thiết kế đồng bộ kiểm tra trạng thái/role ở backend hoặc cơ chế thu hồi token. Chỉ đổi `Status`/`Role` trong DB không tự sửa claims của JWT hiện có; xác định rõ thời gian hiệu lực tối đa trước khi phát hành.

## 4. Phạm vi giao diện và hành vi

### 4.1. Danh sách người dùng — `/admin/users`

Thanh công cụ:

- Tìm theo tên, email hoặc username.
- Lọc theo role và trạng thái.
- Làm mới và phân trang phía backend.
- Nút tạo người dùng nếu luồng tạo mới đã được chốt.

Cột đề xuất:

| Cột | Nội dung |
|---|---|
| ID | `Id` |
| Người dùng | `Name`, kèm `Username` |
| Email | Email tài khoản |
| Điện thoại | `Phone` |
| Vai trò | `Role` |
| Trạng thái | Hiển thị theo quy ước đã xác minh từ `Status` |
| Hoạt động | `CurrentStreak`, `LastStudyDate` hoặc thống kê attempt có sẵn |
| Thao tác | Xem, sửa, khóa/mở khóa theo quyền |

Không hiển thị ngày tạo/ngày đăng nhập nếu chưa có cột hoặc nguồn dữ liệu đáng tin cậy.

### 4.2. Chi tiết người dùng — `/admin/users/:id`

Hiển thị thông tin hồ sơ được phép xem, role, trạng thái và các chỉ số học tập lấy từ dữ liệu thực tế. Có thể tổng hợp số lượt làm theo module (Writing/Reading/Listening/Speaking/Translation) khi đã kiểm chứng schema và định nghĩa rõ “lượt làm” tính mọi trạng thái hay chỉ lượt hoàn tất.

Thống kê liên quan nhiều bảng nên được tính bằng truy vấn aggregate riêng theo `user_id`, tránh join đồng thời nhiều tập con làm nhân bản số đếm. Phân trang khi liệt kê lịch sử; không tải toàn bộ attempt của người dùng.

### 4.3. Tạo và chỉnh sửa

Thông tin cơ bản: `Name`, `Username`, `Email`, `Phone`; role và trạng thái tuân theo các quy tắc ở mục 3.

- Validate bắt buộc, độ dài tối đa 255 ký tự theo schema, định dạng email và quy tắc trùng lặp.
- Tạo tài khoản cần mật khẩu ban đầu; hash bằng `IPasswordHasher<User>` hiện dùng và tuyệt đối không trả mật khẩu/hash trong response/log.
- Không hiển thị hoặc cho sửa trực tiếp giá trị hash đang lưu.
- Nếu chưa chốt quy trình tạo mật khẩu ban đầu/reset mật khẩu an toàn, đưa việc tạo tài khoản và reset mật khẩu ra ngoài giai đoạn đầu thay vì dùng mật khẩu mặc định tĩnh.
- Mọi thay đổi trạng thái/quyền cần xác nhận rõ; UI phải thông báo lỗi conflict (trùng email/username, tài khoản không tồn tại, không thể khóa Admin cuối cùng).

**Quyết định đã chốt cho chức năng tạo tài khoản Admin:** role được server gán cố định là `USER`; Admin nhập mật khẩu ban đầu (8–255 ký tự); backend hash qua `IPasswordHasher<User>`. Không có trường chọn role, không trả mật khẩu/hash và không ghi mật khẩu vào log. Hệ thống hiện chưa hỗ trợ bắt đổi mật khẩu ở lần đăng nhập đầu tiên.

## 5. API đề xuất

Tên endpoint là đề xuất; điều chỉnh theo convention hiện tại nhưng giữ nguyên phân quyền backend và quy tắc DTO.

### Danh sách và chi tiết

- `GET /api/admin/users?page=1&pageSize=20&search=&role=&status=`
  - Trả danh sách DTO đã loại bỏ dữ liệu nhạy cảm, `totalCount`, `page`, `pageSize`.
  - Phân trang; sắp xếp ổn định theo `Id` hoặc trường có thật.
- `GET /api/admin/users/{id}`
  - Trả hồ sơ allowlist và các aggregate học tập được thống nhất.
- `GET /api/admin/users/{id}/activity?page=1&pageSize=20&module=`
  - Chỉ triển khai nếu cần xem lịch sử; dữ liệu nhiều module có thể có DTO chung nhưng phải giữ nguồn và trạng thái gốc.

### Tạo/cập nhật/trạng thái

- `POST /api/admin/users`
  - Chỉ mở nếu nghiệp vụ tạo tài khoản được duyệt; role mặc định do server quyết định, password được hash ở backend.
- `PUT /api/admin/users/{id}`
  - Chỉ cập nhật các trường hồ sơ được phép; không nhận `Password`, `CurrentStreak`, `LastStudyDate` trong DTO.
- `PATCH /api/admin/users/{id}/status`
  - Khóa/mở khóa theo quy ước `Status` đã chốt; không xóa record.
- `PATCH /api/admin/users/{id}/role`
  - Chỉ mở khi đã chốt chính sách phân quyền; kiểm tra role hợp lệ, chống tự hạ quyền và bảo vệ Admin cuối cùng.

Mã phản hồi đề xuất: `400` validate thất bại, `401` chưa xác thực, `403` không đủ quyền, `404` không tồn tại, `409` trùng dữ liệu hoặc vi phạm quy tắc chuyển trạng thái/quyền. Không trả thông tin nội bộ hoặc hash trong lỗi.

## 6. Database và migration

### Không cần migration cho CRUD cơ bản

Entity/bảng `user` đã tồn tại và chứa trường hồ sơ, role, status và streak. Chỉ cần migration nếu khảo sát phát hiện schema runtime thiếu cột/index cần thiết cho yêu cầu đã được duyệt.

### Migration có thể cân nhắc sau khi khảo sát

- Unique index cho `Email` và/hoặc `Username`, sau khi xử lý dữ liệu trùng và thống nhất collation.
- `CreatedAt`/`UpdatedAt` hoặc audit log nếu yêu cầu lịch sử quản trị cần các thông tin này.
- Cấu trúc token revocation/security stamp nếu cần thu hồi JWT ngay khi khóa tài khoản hoặc đổi role.
- Bảng audit cho thao tác nhạy cảm (khóa/mở khóa, cấp/thu hồi Admin, reset mật khẩu) nếu chính sách sản phẩm yêu cầu.

Không thêm trường/bảng dự phòng vào giai đoạn đầu nếu chưa có yêu cầu nghiệp vụ cụ thể. Mọi migration cần cập nhật entity, `AppDbContext`, migration EF và kiểm thử trên bản sao database có dữ liệu.

## 7. Setup plan theo giai đoạn

### Giai đoạn 0 — Khảo sát và chốt nghiệp vụ

- Đối chiếu SQL dump, entity, migrations và database thực tế.
- Kiểm tra giá trị `Role`, `Status`, dữ liệu trùng Email/Username và các luồng tạo tài khoản.
- Chốt role hợp lệ, quyền tạo tài khoản, reset mật khẩu, khóa/mở khóa, chỉnh role và hiệu lực JWT.
- Chốt chỉ số học tập, tiêu chí đếm lượt làm và phạm vi trang lịch sử.
- Xác định migration cần thiết; không thay schema nếu không có yêu cầu.

**Đầu ra:** Bảng quy đổi `Status`/`Role`, phạm vi trường có thể sửa, API/DTO dự kiến, báo cáo migration và quyết định lưu trữ dữ liệu lịch sử.

### Giai đoạn 1 — Backend và hợp đồng API

- Tạo read models/DTO, repository interface/implementation, service interface/implementation và đăng ký DI theo kiến trúc hiện tại.
- Tạo controller Admin riêng, bảo vệ bằng role `ADMIN`.
- Triển khai truy vấn danh sách, tìm kiếm/lọc/phân trang và chi tiết.
- Thêm tạo/cập nhật/trạng thái/quyền sau khi chính sách đã chốt.
- Dùng allowlist DTO; tránh serialize trực tiếp entity `User`.
- Viết unit tests cho quyền nghiệp vụ, validate, dữ liệu trùng, status và quy tắc Admin cuối cùng.

### Giai đoạn 2 — Frontend Admin

- Thêm route và mục điều hướng Users trong Admin layout hiện có; giữ nguyên route Dashboard/Writing/Speaking.
- Tạo danh sách, bộ lọc, phân trang, chi tiết, form và hộp thoại xác nhận.
- Dùng API service hiện hành và cơ chế token/401 hiện có.
- Có loading, empty, error, success, validation, responsive; mọi thao tác hiển thị đều phải gọi API thật.

### Giai đoạn 3 — Migration và rollout (nếu cần)

- Kiểm tra dữ liệu trước migration (duplicate, null, giá trị status/role ngoài dự kiến).
- Sao lưu và thử migration trên môi trường thử nghiệm có dữ liệu đại diện.
- Xác nhận rollback/forward strategy và không thay đổi/xóa các attempt/progress.
- Kiểm tra khóa tài khoản và thay đổi quyền với JWT đã phát hành.

### Giai đoạn 4 — Kiểm thử và hoàn thiện

- Kiểm thử endpoint trực tiếp với anonymous, user thường và Admin.
- Kiểm thử tìm kiếm, lọc, pagination, aggregate, trạng thái, trùng lặp và dữ liệu không tồn tại.
- Kiểm thử hồi quy login, password hash, luồng học và tiến độ của user bị khóa/đang hoạt động theo chính sách đã chốt.
- Kiểm tra không lộ hash trong response, lỗi, log hoặc frontend state.

## 8. Định nghĩa task

### TASK 1 — Khảo sát schema và nghiệp vụ User

**Mục tiêu:** Chốt hợp đồng dữ liệu và quy tắc tài khoản dựa trên schema triển khai.

**Công việc:**

- Đối chiếu `user` giữa SQL dump, entity, migrations và database thực tế.
- Thống kê role/status và kiểm tra dữ liệu trùng email/username.
- Truy vết tất cả nơi đọc/ghi user, login, password hashing, authorization và các bảng học tập phụ thuộc.
- Chốt hành vi khóa tài khoản, cấp role, tạo/reset password, hiệu lực JWT và thống kê hoạt động.

**Hoàn thành khi:** Có mapping role/status được xác nhận, danh sách trường có thể chỉnh sửa, nguồn dữ liệu activity và quyết định rõ migration; không còn giả định về xóa user hoặc dữ liệu không tồn tại.

### TASK 2 — Xây dựng API danh sách và chi tiết User

**Mục tiêu:** Cho phép Admin tra cứu hồ sơ an toàn và xem hoạt động thật.

**Công việc:**

- Tạo DTO/read model chỉ chứa trường cần thiết, không bao gồm `Password`.
- Triển khai danh sách phân trang, tìm kiếm và lọc theo role/status.
- Triển khai chi tiết và aggregate theo module; xác minh count tránh nhân bản khi join.
- Bảo vệ toàn bộ endpoint bằng quyền Admin tại backend.

**Hoàn thành khi:** Có test phân quyền, pagination, filter, user không tồn tại và serialization xác nhận không trả hash; mọi dữ liệu aggregate đối chiếu được với bảng nguồn.

### TASK 3 — Triển khai cập nhật hồ sơ và trạng thái tài khoản

**Mục tiêu:** Cập nhật tài khoản mà không làm mất dữ liệu học tập hoặc vô hiệu hóa nhầm quản trị.

**Công việc:**

- Validate các trường hồ sơ theo schema và quy tắc trùng đã chốt.
- Cập nhật `Name`, `Username`, `Email`, `Phone` qua endpoint riêng.
- Triển khai khóa/mở khóa dựa trên `Status`; giữ nguyên quy ước login và lịch sử status hiện có.
- Không hard-delete; không sửa tiến độ học tập từ màn hình hồ sơ.
- Thêm kiểm tra chống tự khóa/tự hạ quyền và bảo vệ Admin cuối cùng nếu status/role mutation được triển khai.

**Hoàn thành khi:** Update hợp lệ hoạt động; request sai/trùng trả lỗi rõ; khóa tài khoản không xóa attempt/progress; kiểm thử ràng buộc bảo vệ Admin đạt.

### TASK 4 — Tạo tài khoản và quản trị mật khẩu (nếu được duyệt)

**Mục tiêu:** Hỗ trợ tạo tài khoản không làm lộ hoặc lưu mật khẩu không an toàn.

**Công việc:**

- Chốt luồng cấp mật khẩu ban đầu/reset mật khẩu trước khi phát triển.
- Chỉ hash ở backend bằng `IPasswordHasher<User>` và format tương thích login.
- Tự gán role thấp nhất được chấp nhận; không cho payload tạo user tự cấp `ADMIN`.
- Không log hoặc trả lại password/hash; bảo vệ endpoint với quyền Admin.

**Hoàn thành khi:** Test xác nhận mật khẩu mới đăng nhập được qua cơ chế hiện tại, password/hash không xuất hiện trong response/log, và client không thể tự chọn quyền đặc biệt.

### TASK 5 — Tích hợp giao diện Admin Users

**Mục tiêu:** Cung cấp UX tra cứu và quản lý người dùng thống nhất với Admin hiện có.

**Công việc:**

- Thêm routes/sidebar và trạng thái active tương ứng.
- Xây dựng danh sách, search/filter, pagination, trang chi tiết và form theo API đã chốt.
- Thêm hộp thoại xác nhận cho thay đổi trạng thái/quyền; chỉ hiển thị action được phép.
- Hiển thị loading/empty/error/success/validation và xử lý 401 theo cơ chế hiện hữu.

**Hoàn thành khi:** Tất cả action hoạt động qua API thật, giao diện responsive và các route Admin cũ không đổi hành vi.

### TASK 6 — Migration (chỉ khi TASK 1 kết luận cần)

**Mục tiêu:** Bổ sung schema hỗ trợ yêu cầu đã duyệt mà không làm hỏng dữ liệu hiện có.

**Công việc:**

- Chỉ thêm unique index/audit/timestamp/revocation fields theo quyết định và phương án xử lý dữ liệu cũ.
- Cập nhật entity, model configuration và EF migration đồng bộ.
- Kiểm tra migration lên/xuống trên database thử nghiệm có dữ liệu; không thực thi trên production.

**Hoàn thành khi:** Không còn duplicate vi phạm constraint, migration tương thích dữ liệu cũ và mọi bảng attempts/progress được giữ nguyên.

## 9. Phụ thuộc và thứ tự triển khai

| Thứ tự | Task | Phụ thuộc |
|---|---|---|
| 1 | Khảo sát schema và nghiệp vụ User | Không |
| 2 | API danh sách và chi tiết User | TASK 1 |
| 3 | Cập nhật hồ sơ và trạng thái | TASK 1, TASK 2 |
| 4 | Tạo tài khoản/quản trị mật khẩu | TASK 1; chỉ thực hiện khi được duyệt |
| 5 | Giao diện Admin Users | TASK 2, TASK 3; TASK 4 nếu có tạo user |
| 6 | Migration | TASK 1; chỉ thực hiện nếu cần |
| 7 | Kiểm thử và nghiệm thu | TASK 2–6 theo phạm vi được triển khai |

TASK 2 và TASK 6 có thể làm song song sau khi hoàn tất khảo sát, miễn là API không phụ thuộc vào schema chưa được chốt. Không triển khai UI thao tác trước khi API và quy tắc quyền được xác nhận.

## 10. Tiêu chí nghiệm thu tổng thể

- Admin truy cập danh sách và chi tiết User; non-admin không truy cập được API dù gọi trực tiếp.
- Tìm kiếm/lọc/phân trang chạy phía backend với kết quả ổn định.
- Chỉ hiển thị thông tin có trong schema hoặc nguồn dữ liệu được xác nhận.
- Không API/UI/log nào trả password hoặc hash.
- Các thay đổi hồ sơ, status và role tuân thủ validate, authorization và quy tắc bảo vệ Admin đã chốt.
- Khóa tài khoản không xóa user, attempts, scores hoặc tiến độ.
- Không hiển thị ngày tạo/đăng nhập hoặc thống kê giả khi database chưa có nguồn dữ liệu.
- Tạo/reset password (nếu được duyệt) dùng hash tương thích login hiện tại và không cấp quyền ngoài ý muốn.
- Migration (nếu có) được kiểm chứng trên dữ liệu thử nghiệm; không thực hiện thay đổi destructive lên database thật.
- Dashboard, Writing, Speaking và luồng học hiện tại không bị ảnh hưởng.

## 11. Nguyên tắc triển khai

- Khảo sát code/schema trước khi sửa; runtime migrations và database thực tế là căn cứ cuối cùng khi khác SQL dump.
- Tái sử dụng pattern Admin hiện có cho route, DTO, service, repository, DI, phân trang và xác thực.
- Không serialize entity `User` trực tiếp; không dùng dữ liệu giả hoặc success-shaped fallback.
- Không xóa user và không sửa tiến độ học tập từ công cụ quản trị hồ sơ.
- Không tự suy diễn ý nghĩa `Role`/`Status`, unique constraint hoặc thời gian hiệu lực JWT.
- Mọi thay đổi schema cần nêu rõ lý do, phương án dữ liệu cũ, kiểm thử và khả năng rollback.
- Báo cáo file thay đổi, endpoint, migration (nếu có), test và giới hạn còn lại khi bàn giao.
