import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Flame, Mail, Pencil, Phone, RefreshCw, ShieldCheck, ShieldOff, UserRound } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getCurrentUser } from "../../../services/authApi";
import { getAdminUser, updateAdminUserStatus } from "../../../services/adminApi";

function formatDate(value) {
  if (!value) return "Chưa ghi nhận";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? "Chưa ghi nhận"
    : new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(date);
}

const activityItems = [
  ["Writing", "writingAttempts"],
  ["Reading", "readingAttempts"],
  ["Listening", "listeningAttempts"],
  ["Speaking", "speakingAttempts"],
  ["Translation", "translationAttempts"],
  ["Tiến độ từ vựng", "vocabularyProgressItems"],
  ["Tiến độ Translation", "translationProgressItems"],
];

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const currentUserId = Number(getCurrentUser()?.id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [busy, setBusy] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    getAdminUser(id)
      .then((data) => {
        if (active) {
          setUser(data);
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
  }, [id, refreshVersion]);

  async function changeStatus() {
    const nextIsActive = !user.isActive;
    const action = nextIsActive ? "mở khóa" : "khóa";
    if (!window.confirm(`Bạn có chắc muốn ${action} tài khoản "${user.name}"?`)) return;

    setBusy(true);
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
      setBusy(false);
    }
  }

  function reload() {
    setError("");
    setLoading(true);
    setRefreshVersion((version) => version + 1);
  }

  if (loading) {
    return <div className="
      mx-auto max-w-[1100px] rounded-2xl border border-[#e4e7ed] bg-white px-4
      py-10 text-center text-xs text-[#6b7080]
    " role="status">Đang tải hồ sơ người dùng...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {error && <div className="
        mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px]
        py-[13px] text-xs text-[#a63240]
      " role="alert"><p className="mb-2 mt-0">{error}</p><button type="button" className="
        inline-flex items-center gap-2 rounded-[9px] border border-[#e4e7ed]
        bg-white px-3 py-2 font-extrabold text-[#1b1d22]
      " onClick={reload}><RefreshCw size={14} /> Thử lại</button></div>}
      {notice && <div className="
        mb-[13px] rounded-xl border border-[#b9e8cc] bg-[#effaf3] px-[15px]
        py-[13px] text-xs text-[#187347]
      " role="status">{notice}</div>}
      {!user && !error ? (
        <div className="
          rounded-2xl border border-[#e4e7ed] bg-white px-4 py-10 text-center text-xs
          text-[#6b7080]
        ">Không tìm thấy người dùng.</div>
      ) : user && (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="m-0 text-[clamp(20px,2vw,25px)] font-black tracking-[-.025em]">{user.name}</h2>
              <p className="mb-0 mt-[5px] text-[13px] text-[#6b7080]">Hồ sơ người dùng #{user.id} · @{user.username}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link className="
                inline-flex min-h-[39px] items-center justify-center gap-[7px]
                rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px]
                font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7]
              " to="/admin/users"><ArrowLeft size={15} /> Danh sách</Link>
              <Link className="
                inline-flex min-h-[39px] items-center justify-center gap-[7px]
                rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7] px-3 py-2 text-[11px]
                font-extrabold text-white no-underline hover:bg-[#3d68d8]
              " to={`/admin/users/${user.id}/edit`}><Pencil size={14} /> Chỉnh sửa</Link>
              {user.id !== currentUserId && <button type="button" className={`
                inline-flex min-h-[39px] items-center justify-center gap-[7px]
                rounded-[10px] border bg-white px-3 py-2 text-[11px] font-extrabold
                disabled:opacity-55 ${user.isActive ? "border-[#f1c1c5] text-[#a63240] hover:bg-[#fff4f5]" : "border-[#b9e8cc] text-[#187347] hover:bg-[#effaf3]"}
              `} disabled={busy} onClick={changeStatus}>{user.isActive ? <><ShieldOff size={14} /> Khóa tài khoản</> : <><ShieldCheck size={14} /> Mở khóa</>}</button>}
            </div>
          </div>

          <div className="grid gap-[14px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <section className="rounded-2xl border border-[#e4e7ed] bg-white p-5 shadow-[0_7px_22px_#17203308]">
              <h3 className="mb-4 mt-0 text-sm font-black">Thông tin tài khoản</h3>
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#f7f8fb] p-3">
                <span className="
                  inline-flex size-12 items-center justify-center rounded-xl bg-[#e7edff]
                  text-lg font-black text-[#355fc8]
                ">{user.name.trim().charAt(0).toUpperCase() || "U"}</span>
                <div className="min-w-0"><strong className="block truncate text-sm">{user.name}</strong><span className="mt-1 block text-xs text-[#6b7080]">@{user.username}</span></div>
              </div>
              <dl className="grid gap-3 text-xs">
                <div className="flex items-start gap-2"><Mail size={15} className="mt-0.5 shrink-0 text-[#6b7080]" /><div><dt className="text-[10px] font-bold text-[#6b7080]">Email</dt><dd className="mt-0.5 break-all font-semibold">{user.email}</dd></div></div>
                <div className="flex items-start gap-2"><Phone size={15} className="mt-0.5 shrink-0 text-[#6b7080]" /><div><dt className="text-[10px] font-bold text-[#6b7080]">Điện thoại</dt><dd className="mt-0.5 font-semibold">{user.phone}</dd></div></div>
                <div className="flex items-start gap-2"><UserRound size={15} className="mt-0.5 shrink-0 text-[#6b7080]" /><div><dt className="text-[10px] font-bold text-[#6b7080]">Vai trò</dt><dd className="mt-0.5 font-semibold">{user.role}</dd></div></div>
                <div><dt className="text-[10px] font-bold text-[#6b7080]">Trạng thái</dt><dd className={`
                  mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-black ${user.isActive ? "bg-[#e7f7ee] text-[#188452]" : "bg-[#fce9eb] text-[#b63a48]"}
                `}>{user.isActive ? "Đang hoạt động" : "Đã khóa"}</dd></div>
                <div className="flex items-start gap-2"><Flame size={15} className="mt-0.5 shrink-0 text-[#a76a00]" /><div><dt className="text-[10px] font-bold text-[#6b7080]">Chuỗi ngày học</dt><dd className="mt-0.5 font-semibold">{user.currentStreak} ngày</dd></div></div>
                <div className="flex items-start gap-2"><CalendarDays size={15} className="mt-0.5 shrink-0 text-[#6b7080]" /><div><dt className="text-[10px] font-bold text-[#6b7080]">Ngày học gần nhất</dt><dd className="mt-0.5 font-semibold">{formatDate(user.lastStudyDate)}</dd></div></div>
              </dl>
              <p className="mb-0 mt-5 border-t border-[#e4e7ed] pt-3 text-[10px] leading-5 text-[#6b7080]">Mật khẩu và dữ liệu xác thực không được hiển thị trong trang quản trị.</p>
            </section>

            <section className="rounded-2xl border border-[#e4e7ed] bg-white p-5 shadow-[0_7px_22px_#17203308]">
              <h3 className="mb-1 mt-0 text-sm font-black">Hoạt động học tập</h3>
              <p className="mb-4 mt-0 text-xs text-[#6b7080]">Số lượt làm và tiến độ được tổng hợp từ dữ liệu hiện có.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {activityItems.map(([label, key]) => (
                  <div className="rounded-xl border border-[#e4e7ed] bg-[#fbfcfe] p-4" key={key}>
                    <span className="block text-[10px] font-bold text-[#6b7080]">{label}</span>
                    <strong className="mt-1 block text-xl font-black tracking-[-.03em] text-[#1b1d22]">{user.activity?.[key] ?? 0}</strong>
                    <span className="text-[10px] text-[#6b7080]">{key.includes("Progress") ? "mục tiến độ" : "lượt làm"}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
