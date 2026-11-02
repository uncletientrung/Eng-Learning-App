import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authApi";

const navigation = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Quản lý Writing", to: "/admin/writing", icon: FileText },
];

const writingNavigation = [
  { label: "Quản lý đề Writing", to: "/admin/writing", icon: FileText },
  { label: "Bài nộp Writing", to: "/admin/writing/submissions", icon: ClipboardList },
];

const comingSoon = [
  "Quản lý Speaking",
  "Quản lý Reading",
  "Quản lý Listening",
  "Quản lý Vocabulary",
  "Quản lý Grammar",
  "Quản lý Idioms",
  "Quản lý Users",
];

function currentTitle(pathname) {
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
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[19] hidden border-0 bg-[#10172580] max-[760px]:block"
          aria-label="Đóng menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`relative z-20 flex h-full w-[258px] shrink-0 flex-col overflow-auto border-r border-[#e4e7ed] bg-white px-[14px] py-5 transition-[width,flex-basis,transform] duration-200 max-[760px]:fixed max-[760px]:inset-y-0 max-[760px]:left-0 max-[760px]:z-20 max-[760px]:h-dvh max-[760px]:w-[min(290px,84vw)] max-[760px]:px-[14px] max-[760px]:py-[18px] ${mobileOpen ? "max-[760px]:translate-x-0" : "max-[760px]:-translate-x-[105%]"} ${collapsed ? "min-[761px]:w-[76px] min-[761px]:basis-[76px] min-[761px]:px-[10px]" : ""}`}>
        <div className={`${"flex min-h-12 items-center gap-2.5 border-b border-[#e4e7ed] px-[5px] pb-4"} ${collapsed ? "min-[761px]:justify-center min-[761px]:px-0" : ""}`}>
          <Link to="/" className="shrink-0 [&_img]:block [&_img]:size-[39px] [&_img]:rounded-xl [&_img]:border [&_img]:border-[#e4e7ed] [&_img]:object-cover" aria-label="Về trang chủ">
            <img src="/assets/logo-finall.png" alt="" />
          </Link>
          <div className={`${"flex min-w-0 flex-col gap-0.5 [&_strong]:overflow-hidden [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap [&_strong]:text-xs [&_strong]:font-black [&_strong]:tracking-[.045em] [&_span]:text-[9px] [&_span]:font-extrabold [&_span]:tracking-[.12em] [&_span]:text-[#6b7080]"} ${collapsed ? "min-[761px]:hidden max-[760px]:flex" : ""}`}>
            <strong>IELTS DICTIONARY</strong>
            <span>ADMIN WORKSPACE</span>
          </div>
          <button
            type="button"
            className="ml-auto hidden size-8 items-center justify-center rounded-[10px] text-[#1b1d22] hover:bg-[#f1f3f7] max-[760px]:inline-flex"
            aria-label="Đóng menu"
            onClick={() => setMobileOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <p className={`${"mx-2.5 mb-2 mt-5 text-[9px] font-black tracking-[.16em] text-[#6b7080]"} ${collapsed ? "min-[761px]:hidden max-[760px]:block" : ""}`}>QUẢN TRỊ</p>
        <nav className="grid gap-1" aria-label="Điều hướng quản trị">
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => {
                return `flex min-h-[42px] w-full items-center gap-[11px] rounded-xl px-[11px] py-[9px] text-left text-[13px] font-bold no-underline transition-colors hover:bg-[#f1f3f7] ${isActive ? "bg-[#eaf0ff] text-[#355fc8]" : "text-[#1b1d22]"}${collapsed ? " min-[761px]:justify-center min-[761px]:px-2 [&>span]:min-[761px]:hidden" : ""}`;
              }}
              title={collapsed ? label : undefined}
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <p className={`${"mx-2.5 mb-2 mt-5 text-[9px] font-black tracking-[.16em] text-[#6b7080] mt-6"} ${collapsed ? "min-[761px]:hidden max-[760px]:block" : ""}`}>SẮP RA MẮT</p>
        <nav className="grid gap-1" aria-label="Các chức năng đang phát triển">
          {comingSoon.map((label) => (
            <div className={`${"flex min-h-[42px] w-full items-center gap-[11px] rounded-xl px-[11px] py-[9px] text-left text-[13px] font-bold text-[#1b1d22] no-underline transition-colors hover:bg-[#f1f3f7] min-h-[34px] cursor-default py-1.5 text-[#6b7080] hover:bg-transparent [&_small]:ml-auto [&_small]:text-[9px] [&_small]:font-bold"} ${collapsed ? "min-[761px]:hidden max-[760px]:flex" : ""}`} key={label} title={label}>
              <span className="size-[7px] shrink-0 rounded-full border border-[#6b7080]" />
              <span>{label}</span>
              <small>Sắp tới</small>
            </div>
          ))}
        </nav>
        <div className="relative mt-auto grid gap-2 border-t border-[#e4e7ed] pt-4">
          <div className={`${"flex min-w-0 items-center gap-2.5 px-[5px] pb-1"} ${collapsed ? "min-[761px]:justify-center min-[761px]:px-0 max-[760px]:justify-start max-[760px]:px-[5px]" : ""}`}>
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e7edff] text-sm font-black text-[#355fc8]">{initials}</span>
            <div className={`${"flex min-w-0 flex-col gap-0.5 [&_strong]:overflow-hidden [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap [&_strong]:text-xs [&_strong]:font-black [&_strong]:tracking-[.045em] [&_span]:text-[9px] [&_span]:font-extrabold [&_span]:tracking-[.12em] [&_span]:text-[#6b7080]"} ${collapsed ? "min-[761px]:hidden max-[760px]:flex" : ""}`}>
              <strong>{user?.name || "Quản trị viên"}</strong>
              <span>ADMINISTRATOR</span>
            </div>
          </div>
          <button type="button" className={`${"flex min-h-[42px] w-full items-center gap-[11px] rounded-xl px-[11px] py-[9px] text-left text-[13px] font-bold text-[#d94355] no-underline hover:bg-[#f1f3f7]"} ${collapsed ? "min-[761px]:justify-center min-[761px]:px-2 [&>span]:min-[761px]:hidden" : ""}`} onClick={signOut}>
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
          <button
            type="button"
            className="absolute -top-8 right-0 inline-flex size-[26px] items-center justify-center rounded-lg border border-[#e4e7ed] bg-white text-[#6b7080] hover:bg-[#f1f3f7] max-[760px]:hidden"
            aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          </button>
        </div>
      </aside>

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
          <Outlet />
        </main>
      </div>
    </div>
  );
}
