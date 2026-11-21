import { useEffect, useState } from "react";
import { ArrowLeft, RefreshCw, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAdminUser, updateAdminUserProfile } from "../../../services/adminApi";
import AdminPageTitle from "../../../components/admin/AdminPageTitle";

const inputClass = [
  "min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2",
  "text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2",
  "focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]",
].join(" ");

export default function AdminUserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", username: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getAdminUser(id)
      .then((data) => {
        if (!active) return;
        setUser(data);
        setForm({
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateAdminUserProfile(id, form);
      navigate(`/admin/users/${id}`, {
        replace: true,
        state: { notice: "Đã cập nhật thông tin người dùng." },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="
      mx-auto max-w-[900px] rounded-2xl border border-[#e4e7ed] bg-white px-4
      py-10 text-center text-xs text-[#6b7080]
    " role="status">Đang tải thông tin...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-[900px]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><AdminPageTitle title="Chỉnh sửa người dùng" /><p className="mb-0 mt-[5px] text-[13px] text-[#6b7080]">{user ? `Cập nhật thông tin tài khoản #${user.id}.` : "Không tìm thấy người dùng."}</p></div>
        <Link className="
          inline-flex min-h-[39px] items-center justify-center gap-[7px]
          rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px]
          font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7]
        " to="/admin/users"><ArrowLeft size={15} /> Quay lại</Link>
      </div>

      {error && <div className="
        mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px]
        py-[13px] text-xs text-[#a63240]
      " role="alert"><p className="mb-2 mt-0">{error}</p><button type="button" className="
        inline-flex items-center gap-2 rounded-[9px] border border-[#e4e7ed]
        bg-white px-3 py-2 font-extrabold text-[#1b1d22]
      " onClick={() => window.location.reload()}><RefreshCw size={14} /> Tải lại</button></div>}

      {!user && !error ? (
        <div className="
          rounded-2xl border border-[#e4e7ed] bg-white px-4 py-10 text-center text-xs
          text-[#6b7080]
        ">Không tìm thấy người dùng.</div>
      ) : user && (
        <form className="
          rounded-2xl border border-[#e4e7ed] bg-white p-5
          shadow-[0_7px_22px_#17203308] sm:p-7
        " onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Họ và tên
              <input className={inputClass} name="name" value={form.name} onChange={updateField} maxLength={255} required />
            </label>
            <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Username
              <input className={inputClass} name="username" value={form.username} onChange={updateField} maxLength={255} required />
            </label>
            <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Email đăng nhập
              <input className={inputClass} name="email" type="email" value={form.email} onChange={updateField} maxLength={255} required />
            </label>
            <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Số điện thoại
              <input className={inputClass} name="phone" type="tel" value={form.phone} onChange={updateField} maxLength={255} required />
            </label>
          </div>
          <div className="
            mt-5 rounded-xl border border-[#e4e7ed] bg-[#f7f8fb] px-4 py-3 text-xs
            text-[#6b7080]
          ">
            Vai trò: <strong className="text-[#1b1d22]">{user.role}</strong>. Trang này không thay đổi quyền, trạng thái hoặc mật khẩu.
          </div>
          <div className="mt-5 flex justify-end">
            <button type="submit" className="
              inline-flex min-h-[39px] items-center justify-center gap-[7px]
              rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7] px-4 py-2 text-[11px]
              font-extrabold text-white hover:bg-[#3d68d8] disabled:cursor-not-allowed
              disabled:opacity-55
            " disabled={saving}>
              <Save size={15} /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
