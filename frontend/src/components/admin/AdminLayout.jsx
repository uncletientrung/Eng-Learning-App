import { useState } from "react";
import {
  FileText,
  ClipboardList,
  LogOut,
  Menu,
  Mic,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authApi";
import AdminSidebar from "./AdminSidebar";

const writingNavigation = [
  { label: "Quản lý đề Writing", to: "/admin/writing", icon: FileText },
  { label: "Bài nộp Writing", to: "/admin/writing/submissions", icon: ClipboardList },
];

const speakingNavigation = [
  { label: "Quản lý đề Speaking", to: "/admin/speaking", icon: Mic },
  { label: "Bài nộp Speaking", to: "/admin/speaking/submissions", icon: ClipboardList },
];

function currentTitle(pathname) {
  if (pathname.startsWith("/admin/speaking")) {
    if (pathname.includes("/submissions")) return "Bài nộp Speaking";
    if (pathname.includes("/create")) return "Thêm đề Speaking";
    if (pathname.includes("/edit/")) return "Chỉnh sửa đề Speaking";
    if (pathname.match(/\/admin\/speaking\/\d+/)) return "Chi tiết đề Speaking";
    return "Quản lý Speaking";
  }
  if (pathname.includes("/submissions")) return "Bài nộp Writing";
  if (pathname.includes("/writing/create")) return "Thêm đề Writing";
  if (pathname.includes("/writing/edit/")) return "Chỉnh sửa đề Writing";
  if (pathname.match(/\/admin\/writing\/\d+/)) return "Chi tiết đề Writing";
  if (pathname.startsWith("/admin/writing")) return "Quản lý Writing";
  return "Dashboard";
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const title = currentTitle(location.pathname);
  const initials = (user?.name || "A").trim().charAt(0).toUpperCase();

  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-dvh min-h-dvh w-full overflow-hidden bg-[#e9edf3] text-[#1b1d22] font-sans [&_*]:box-border [&_button]:[font:inherit] [&_a]:[font:inherit] [&_input]:[font:inherit] [&_select]:[font:inherit] [&_textarea]:[font:inherit] [&_button]:[-webkit-tap-highlight-color:transparent] [&_a]:[-webkit-tap-highlight-color:transparent] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[#4f7cf7] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[#4f7cf7] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-offset-2 [&_input:focus-visible]:outline-[#4f7cf7] [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-offset-2 [&_select:focus-visible]:outline-[#4f7cf7] [&_textarea:focus-visible]:outline-2 [&_textarea:focus-visible]:outline-offset-2 [&_textarea:focus-visible]:outline-[#4f7cf7]">
      <AdminSidebar
        expanded={!collapsed}
        onToggleExpanded={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onLogout={signOut}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="relative z-10 flex min-h-[76px] items-center justify-between gap-[18px] border-b border-[#e4e7ed] bg-white px-[30px] py-3 max-[760px]:min-h-[68px] max-[760px]:justify-start max-[760px]:gap-2.5 max-[760px]:px-[14px] max-[760px]:py-2.5">
          <button
            type="button"
            className="hidden size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#f1f3f7] text-[#1b1d22] max-[760px]:inline-flex"
            aria-label="Mở menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={21} />
          </button>
          <div className="min-w-0 [&_p]:m-0 [&_p]:mb-[3px] [&_p]:text-[9px] [&_p]:font-black [&_p]:tracking-[.13em] [&_p]:text-[#6b7080] [&_h1]:m-0 [&_h1]:text-lg [&_h1]:font-black max-[760px]:flex-1 [&_h1]:max-[760px]:overflow-hidden [&_h1]:max-[760px]:text-ellipsis [&_h1]:max-[760px]:whitespace-nowrap [&_h1]:max-[760px]:text-[15px] [&_p]:max-[760px]:text-[8px]">
            <p>ADMIN / {title.toUpperCase()}</p>
            <h1>{title}</h1>
          </div>
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-[9px] rounded-xl bg-transparent p-1 text-inherit hover:bg-[#f1f3f7]"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((value) => !value)}
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e7edff] text-sm font-black text-[#355fc8]">{initials}</span>
              <span className={`${"grid text-left [&_strong]:max-w-40 [&_strong]:overflow-hidden [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap [&_strong]:text-xs [&_small]:text-[10px] [&_small]:text-[#6b7080] max-[760px]:hidden"} ${collapsed ? "min-[761px]:hidden" : ""}`}>
                <strong>{user?.name || "Quản trị viên"}</strong>
                <small>Admin</small>
              </span>
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-[calc(100%+9px)] z-30 w-[220px] rounded-[13px] border border-[#e4e7ed] bg-white p-2 shadow-[0_12px_30px_#1720331a] [&_p]:my-1 [&_p]:mx-1.5 [&_p]:overflow-hidden [&_p]:text-ellipsis [&_p]:text-[11px] [&_p]:text-[#6b7080] [&_button]:flex [&_button]:w-full [&_button]:items-center [&_button]:gap-2 [&_button]:rounded-[9px] [&_button]:px-[7px] [&_button]:py-[9px] [&_button]:text-left [&_button]:text-xs [&_button]:font-extrabold [&_button]:text-[#d94355] [&_button]:hover:bg-[#f1f3f7]">
                <p>{user?.email || ""}</p>
                <button type="button" onClick={signOut}>
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-auto px-[30px] pb-[34px] pt-[26px] max-[760px]:px-[14px] max-[760px]:pb-7 max-[760px]:pt-[19px]" key={location.pathname}>
          {location.pathname.startsWith("/admin/writing") && (
            <nav className="mx-auto mb-5 flex w-full max-w-[1440px] gap-1 overflow-x-auto rounded-xl border border-[#e4e7ed] bg-white p-1.5" aria-label="Điều hướng quản lý Writing">
              {writingNavigation.map(({ label, to, icon: Icon }) => {
                const active = to.endsWith("/submissions")
                  ? location.pathname.startsWith(to)
                  : !location.pathname.startsWith("/admin/writing/submissions");
                return (
                  <Link
                    key={to}
                    to={to}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-[9px] px-4 py-2 text-xs font-extrabold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] ${active ? "bg-[#4f7cf7] text-white shadow-[0_3px_8px_#315fc52e]" : "text-[#6b7080] hover:bg-[#f1f3f7] hover:text-[#1b1d22]"}`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}
          {location.pathname.startsWith("/admin/speaking") && (
            <nav className="mx-auto mb-5 flex w-full max-w-[1440px] gap-1 overflow-x-auto rounded-xl border border-[#e4e7ed] bg-white p-1.5" aria-label="Điều hướng quản lý Speaking">
              {speakingNavigation.map(({ label, to, icon: Icon }) => {
                const active = to.endsWith("/submissions")
                  ? location.pathname.startsWith(to)
                  : !location.pathname.startsWith("/admin/speaking/submissions");
                return (
                  <Link
                    key={to}
                    to={to}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-[9px] px-4 py-2 text-xs font-extrabold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] ${active ? "bg-[#4f7cf7] text-white shadow-[0_3px_8px_#315fc52e]" : "text-[#6b7080] hover:bg-[#f1f3f7] hover:text-[#1b1d22]"}`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
