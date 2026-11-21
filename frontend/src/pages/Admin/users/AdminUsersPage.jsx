import { useEffect, useState } from "react";
import { Eye, Pencil, RefreshCw, Search, ShieldCheck, ShieldOff, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../../services/authApi";
import { getAdminUsers, updateAdminUserStatus } from "../../../services/adminApi";
import AdminPageTitle from "../../../components/admin/AdminPageTitle";

const pageSize = 10;

function StatusBadge({ isActive }) {
  return (
    <span className={`
      inline-flex min-h-[23px] items-center whitespace-nowrap rounded-full px-2
      py-[3px] text-[9px] font-black ${isActive ? "bg-[#e7f7ee] text-[#188452]" : "bg-[#fce9eb] text-[#b63a48]"}
    `}>
      {isActive ? "Đang hoạt động" : "Đã khóa"}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "Chưa ghi nhận";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? "Chưa ghi nhận"
    : new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(date);
}

export default function AdminUsersPage() {
  const location = useLocation();
  const currentUserId = Number(getCurrentUser()?.id);
  const [pageData, setPageData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [busyId, setBusyId] = useState(null);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearchTerm(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;
    getAdminUsers({ page, pageSize, search: searchTerm, role, status })
      .then((data) => {
        if (active) {
          setPageData(data);
          setError("");
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [page, searchTerm, role, status, refreshVersion]);

  const pageCount = Math.max(1, Math.ceil((pageData?.totalCount || 0) / pageSize));
  const refresh = () => {
    setLoading(true);
    setError("");
    setRefreshVersion((version) => version + 1);
  };
  const changeFilter = (setter, value) => {
    setLoading(true);
    setter(value);
    setPage(1);
  };
  const changePage = (value) => {
    setLoading(true);
    setPage(value);
  };

  async function changeStatus(user) {
    const nextIsActive = !user.isActive;
    const action = nextIsActive ? "mở khóa" : "khóa";
    if (!window.confirm(`Bạn có chắc muốn ${action} tài khoản "${user.name}"?`)) return;

    setBusyId(user.id);
    setError("");
    setNotice("");
    try {
      await updateAdminUserStatus(user.id, nextIsActive);
      setNotice(`Đã ${action} tài khoản ${user.name}.`);
      setLoading(true);
      setRefreshVersion((version) => version + 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="
        mb-[22px] flex items-start justify-between gap-4 [&_p]:mt-[5px] [&_p]:mb-0 [&_p]:text-[13px]
        [&_p]:text-[#6b7080] max-[760px]:mb-4 max-[760px]:items-stretch
        max-[760px]:flex-col
      ">
        <div>
          <AdminPageTitle title="Quản lý Users" />
          <p>Tra cứu hồ sơ, hoạt động học tập và trạng thái tài khoản.</p>
        </div>
        <Link className="
          inline-flex min-h-[39px] shrink-0 items-center justify-center gap-[7px]
          rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7] px-3 py-2 text-[11px]
          font-extrabold text-white no-underline hover:border-[#3d68d8]
          hover:bg-[#3d68d8]
        " to="/admin/users/create"><UserPlus size={15} /> Thêm người dùng</Link>
      </div>

      {notice && <div className="
        mb-[13px] rounded-xl border border-[#b9e8cc] bg-[#effaf3] px-[15px]
        py-[13px] text-xs text-[#187347]
      " role="status">{notice}</div>}
      {error && (
        <div className="
          mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px]
          py-[13px] text-xs text-[#a63240]
        " role="alert">
          <p className="mb-2 mt-0">{error}</p>
          <button type="button" className="
            inline-flex min-h-[39px] items-center justify-center gap-[7px]
            rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px]
            font-extrabold text-[#1b1d22] hover:bg-[#f1f3f7] disabled:opacity-55
          " onClick={refresh}><RefreshCw size={14} /> Thử lại</button>
        </div>
      )}

      <div className="
        mb-[14px] flex flex-wrap items-center gap-[9px]
        [&>select]:max-[760px]:min-w-[calc(50%-5px)]
        [&>select]:max-[760px]:flex-[1_1_130px]
      ">
        <label className="
          relative min-w-[min(100%,250px)] flex-[1_1_245px] [&_svg]:absolute
          [&_svg]:left-3 [&_svg]:top-1/2 [&_svg]:-translate-y-1/2
          [&_svg]:text-[#6b7080] [&_input]:pl-[37px]
        ">
          <Search size={16} />
          <input
            className="
              min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px]
              py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad]
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-[#4f7cf7]
            "
            value={search}
            onChange={(event) => { setLoading(true); setSearch(event.target.value); setPage(1); }}
            placeholder="Tìm tên, username, email hoặc số điện thoại..."
            aria-label="Tìm kiếm người dùng"
          />
        </label>
        <select className="
          min-h-10 min-w-[145px] rounded-[10px] border border-[#e4e7ed] bg-white
          px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]
        " value={role} onChange={(event) => changeFilter(setRole, event.target.value)} aria-label="Lọc theo vai trò">
          <option value="">Tất cả vai trò</option>
          {(pageData?.roles || []).map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
        <select className="
          min-h-10 min-w-[145px] rounded-[10px] border border-[#e4e7ed] bg-white
          px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]
        " value={status} onChange={(event) => changeFilter(setStatus, event.target.value)} aria-label="Lọc theo trạng thái">
          <option value="">Tất cả trạng thái</option>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="INACTIVE">Đã khóa</option>
        </select>
        <button type="button" className="
          inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] border
          border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold
          text-[#1b1d22] hover:bg-[#f1f3f7] disabled:opacity-55
        " onClick={refresh} disabled={loading}><RefreshCw size={14} /> Làm mới</button>
      </div>

      <section className="
        min-w-0 rounded-2xl border border-[#e4e7ed] bg-white
        shadow-[0_7px_22px_#17203308]
      ">
        {loading ? (
          <div className="px-[15px] py-[35px] text-center text-xs text-[#6b7080]" role="status">Đang tải người dùng...</div>
        ) : pageData?.items?.length ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="
                w-full border-collapse text-left text-xs [&_th]:whitespace-nowrap
                [&_th]:border-b [&_th]:border-[#e4e7ed] [&_th]:bg-[#f1f3f7] [&_th]:px-[14px]
                [&_th]:py-[11px] [&_th]:text-xs! [&_th]:font-black
                [&_th]:tracking-[.04em] [&_th]:text-[#6b7080] [&_td]:border-b
                [&_td]:border-[#e4e7ed] [&_td]:px-[14px] [&_td]:py-3 [&_td]:align-middle
                [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:hover]:bg-[#f7f8fb]
              ">
                <thead><tr><th>STT</th><th>ID</th><th>Người dùng</th><th>Email</th><th>Điện thoại</th><th>Vai trò</th><th>Trạng thái</th><th>Hoạt động</th><th>Thao tác</th></tr></thead>
                <tbody>
                  {pageData.items.map((user, index) => {
                    const activity = user.activity || {};
                    const attemptCount = ["writingAttempts", "readingAttempts", "listeningAttempts", "speakingAttempts", "translationAttempts"]
                      .reduce((sum, key) => sum + (activity[key] || 0), 0);
                    const progressCount = (activity.vocabularyProgressItems || 0) + (activity.translationProgressItems || 0);
                    return (
                      <tr key={user.id}>
                        <td>{(page - 1) * pageSize + index + 1}</td>
                        <td>#{user.id}</td>
                        <td>
                          <Link className="
                            block max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap
                            text-[11px] font-extrabold text-[#355fc8] no-underline hover:underline
                          " to={`/admin/users/${user.id}`}>{user.name}</Link>
                          <span className="mt-0.5 block text-[10px] text-[#6b7080]">@{user.username}</span>
                        </td>
                        <td className="whitespace-nowrap">{user.email}</td>
                        <td className="whitespace-nowrap">{user.phone}</td>
                        <td><span className="rounded-full bg-[#f1f3f7] px-2 py-1 text-[9px] font-black text-[#525b6b]">{user.role}</span></td>
                        <td><StatusBadge isActive={user.isActive} /></td>
                        <td><span className="block font-extrabold text-[#1b1d22]">{attemptCount} lượt làm</span><span className="mt-0.5 block text-[10px] text-[#6b7080]">{progressCount} mục tiến độ · {user.currentStreak} ngày streak</span><span className="mt-0.5 block text-[10px] text-[#6b7080]">Học gần nhất: {formatDate(user.lastStudyDate)}</span></td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Link className="
                              inline-flex min-h-[30px] items-center justify-center gap-1 rounded-[8px]
                              border border-[#4f7cf7] bg-[#4f7cf7] px-2 py-[5px] text-[10px]
                              font-extrabold text-white no-underline hover:border-[#3d68d8]
                              hover:bg-[#3d68d8]
                            " to={`/admin/users/${user.id}`}><Eye size={13} /> Xem</Link>
                            <Link className="
                              inline-flex min-h-[30px] items-center justify-center gap-1 rounded-[8px]
                              border border-[#d8e2ff] bg-[#f3f6ff] px-2 py-[5px] text-[10px]
                              font-extrabold text-[#315fc5] no-underline hover:bg-[#e8eeff]
                            " to={`/admin/users/${user.id}/edit`}><Pencil size={13} /> Sửa</Link>
                            {user.id !== currentUserId && <button type="button" className={`
                              inline-flex min-h-[30px] items-center justify-center gap-1 rounded-[8px]
                              border bg-white px-2 py-[5px] text-[10px] font-extrabold
                              disabled:cursor-not-allowed disabled:opacity-55 ${user.isActive ? "border-[#f1c1c5] text-[#a63240] hover:bg-[#fff4f5]" : "border-[#b9e8cc] text-[#187347] hover:bg-[#effaf3]"}
                            `} disabled={busyId === user.id} onClick={() => changeStatus(user)}>{user.isActive ? <><ShieldOff size={13} /> Khóa</> : <><ShieldCheck size={13} /> Mở khóa</>}</button>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="
              flex items-center justify-between gap-3 rounded-b-2xl px-4 py-3 text-xs
              text-[#6b7080] max-[500px]:items-start max-[500px]:flex-col
            ">
              <span>{pageData.totalCount} người dùng</span>
              <div className="flex items-center gap-[6px]">
                <button type="button" className="
                  inline-flex min-h-[30px] items-center justify-center rounded-[10px] border
                  border-[#e4e7ed] bg-white px-2 py-[5px] text-[10px] font-extrabold
                  text-[#1b1d22] hover:bg-[#f1f3f7] disabled:cursor-not-allowed
                  disabled:opacity-55
                " disabled={page <= 1 || loading} onClick={() => changePage(page - 1)}>Trước</button>
                <span>Trang {page} / {pageCount}</span>
                <button type="button" className="
                  inline-flex min-h-[30px] items-center justify-center rounded-[10px] border
                  border-[#e4e7ed] bg-white px-2 py-[5px] text-[10px] font-extrabold
                  text-[#1b1d22] hover:bg-[#f1f3f7] disabled:cursor-not-allowed
                  disabled:opacity-55
                " disabled={page >= pageCount || loading} onClick={() => changePage(page + 1)}>Sau</button>
              </div>
            </div>
          </>
        ) : (
          <div className="px-[15px] py-[35px] text-center text-xs text-[#6b7080]">
            <strong className="mb-1 block text-[#1b1d22]">Không tìm thấy người dùng</strong>
            Thử thay đổi từ khóa hoặc bộ lọc.
          </div>
        )}
      </section>
    </div>
  );
}
