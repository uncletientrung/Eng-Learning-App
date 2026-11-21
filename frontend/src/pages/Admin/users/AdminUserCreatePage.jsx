import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createAdminUser } from "../../../services/adminApi";
import AdminPageTitle from "../../../components/admin/AdminPageTitle";

const inputClass = [
  "min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2",
  "text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2",
  "focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]",
].join(" ");

export default function AdminUserCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const user = await createAdminUser(form);
      navigate(`/admin/users/${user.id}`, {
        replace: true,
        state: { notice: "Đã tạo tài khoản người dùng." },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[900px]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <AdminPageTitle title="Thêm người dùng" />
          <p className="mb-0 mt-[5px] text-[13px] text-[#6b7080]">Tạo tài khoản học viên mới trong hệ thống.</p>
        </div>
        <Link className="
          inline-flex min-h-[39px] items-center justify-center gap-[7px]
          rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px]
          font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7]
        " to="/admin/users"><ArrowLeft size={15} /> Danh sách</Link>
      </div>

      {error && <div className="
        mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px]
        py-[13px] text-xs text-[#a63240]
      " role="alert">{error}</div>}

      <form className="
        rounded-2xl border border-[#e4e7ed] bg-white p-5
        shadow-[0_7px_22px_#17203308] sm:p-7
      " onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Họ và tên
            <input className={inputClass} name="name" value={form.name} onChange={updateField} maxLength={255} autoComplete="name" required />
          </label>
          <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Username
            <input className={inputClass} name="username" value={form.username} onChange={updateField} maxLength={255} autoComplete="username" required />
          </label>
          <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Email đăng nhập
            <input className={inputClass} name="email" type="email" value={form.email} onChange={updateField} maxLength={255} autoComplete="email" required />
          </label>
          <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a]">Số điện thoại
            <input className={inputClass} name="phone" type="tel" value={form.phone} onChange={updateField} maxLength={255} autoComplete="tel" required />
          </label>
          <label className="grid gap-1.5 text-[11px] font-extrabold text-[#424b5a] sm:col-span-2">Mật khẩu ban đầu
            <input className={inputClass} name="password" type="password" value={form.password} onChange={updateField} minLength={8} maxLength={255} autoComplete="new-password" required />
            <span className="font-normal text-[#6b7080]">Tối thiểu 8 ký tự. Mật khẩu sẽ được hash ở backend và không hiển thị lại.</span>
          </label>
        </div>
        <div className="
          mt-5 rounded-xl border border-[#d8e2ff] bg-[#f3f6ff] px-4 py-3 text-xs
          text-[#315fc5]
        ">
          Tài khoản mới được gán role <strong>USER</strong> và trạng thái hoạt động. Không thể cấp quyền Admin từ form này.
        </div>
        <div className="mt-5 flex justify-end">
          <button type="submit" className="
            inline-flex min-h-[39px] items-center justify-center gap-[7px]
            rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7] px-4 py-2 text-[11px]
            font-extrabold text-white hover:bg-[#3d68d8] disabled:cursor-not-allowed
            disabled:opacity-55
          " disabled={saving}>
            <Save size={15} /> {saving ? "Đang tạo..." : "Tạo tài khoản"}
          </button>
        </div>
      </form>
    </div>
  );
}
