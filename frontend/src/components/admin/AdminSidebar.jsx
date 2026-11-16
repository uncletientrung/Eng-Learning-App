import { useEffect, useRef } from "react";
import {
  BookOpen,
  BookText,
  FileText,
  Headphones,
  LibraryBig,
  LayoutDashboard,
  LogOut,
  Mic,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Quote,
  Sun,
  Users,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { getCurrentUser } from "../../services/authApi";
import "./AdminSidebar.css";

const navigation = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Quản lý Writing", to: "/admin/writing", icon: FileText },
  { label: "Quản lý Speaking", to: "/admin/speaking", icon: Mic },
  { label: "Quản lý Vocabulary", to: "/admin/vocabulary", icon: LibraryBig },
];

const comingSoon = [
  { label: "Quản lý Reading", icon: BookOpen },
  { label: "Quản lý Listening", icon: Headphones },
  { label: "Quản lý Grammar", icon: BookText },
  { label: "Quản lý Idioms", icon: Quote },
  { label: "Quản lý Users", icon: Users },
];

function AdminThemeButton({ dark, onToggle }) {
  const Icon = dark ? Sun : Moon;
  return (
    <button
      type="button"
      title="Chế độ sáng / tối"
      aria-label="Chế độ sáng / tối"
      onClick={onToggle}
      className="admin-sidebar-theme"
    >
      <Icon size={17} />
    </button>
  );
}

export default function AdminSidebar({ expanded, onToggleExpanded, mobileOpen, onCloseMobile, onLogout, dark, onToggleTheme }) {
  const user = getCurrentUser();
  const name = user?.name || "Quản trị viên";
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousFocus = document.activeElement;
    const sidebar = sidebarRef.current;
    sidebar.querySelector(".admin-sidebar-mobile-close")?.focus();

    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const controls = sidebar.querySelectorAll("a[href], button:not(:disabled)");
      const visible = [...controls].filter((control) => control.getClientRects().length > 0);
      const first = visible[0];
      const last = visible[visible.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    sidebar.addEventListener("keydown", trapFocus);
    return () => {
      sidebar.removeEventListener("keydown", trapFocus);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Đóng menu"
          className="admin-sidebar-backdrop"
          onClick={onCloseMobile}
        />
      )}
      <aside
        id="admin-sidebar"
        ref={sidebarRef}
        className={`admin-sidebar${expanded ? " is-expanded" : ""}${mobileOpen ? " is-mobile-open" : ""}${dark ? " is-dark" : ""}`}
        aria-label="Menu quản trị"
        role={mobileOpen ? "dialog" : undefined}
        aria-modal={mobileOpen ? true : undefined}
      >
        <div className="admin-sidebar-top">
          <Link to="/" title="Về trang chủ" className="admin-sidebar-brand">
            <img src="/assets/logo-finall.png" alt="The IELTS Dictionary" />
            <span>The IELTS Dictionary</span>
          </Link>
          <div className="admin-sidebar-tools">
            <AdminThemeButton dark={dark} onToggle={onToggleTheme} />
            <button
              type="button"
              className="admin-sidebar-icon admin-sidebar-expand"
              title={expanded ? "Thu gọn menu" : "Mở rộng menu"}
              aria-label={expanded ? "Thu gọn menu" : "Mở rộng menu"}
              aria-expanded={expanded}
              aria-controls="admin-navigation"
              aria-keyshortcuts={"Control+\\ Meta+\\"}
              onClick={onToggleExpanded}
            >
              {expanded ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            <button
              type="button"
              className="admin-sidebar-icon admin-sidebar-mobile-close"
              aria-label="Đóng menu"
              onClick={onCloseMobile}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="admin-sidebar-separator" role="separator" />
        <p className="admin-sidebar-section">QUẢN TRỊ</p>
        <nav id="admin-navigation" className="admin-sidebar-nav" aria-label="Điều hướng quản trị">
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onCloseMobile}
              title={label}
              aria-label={label}
              className={({ isActive }) => `admin-sidebar-item${isActive ? " is-active" : ""}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <p className="admin-sidebar-section admin-sidebar-coming-title">SẮP RA MẮT</p>
        <nav className="admin-sidebar-nav" aria-label="Các chức năng đang phát triển">
          {comingSoon.map(({ label, icon: Icon }) => (
            <button type="button" disabled className="admin-sidebar-item admin-sidebar-coming" key={label} title={`${label} — Sắp ra mắt`} aria-label={`${label} — Sắp ra mắt`}>
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-divider" />
          <div className="admin-sidebar-account">
            <div className="admin-sidebar-avatar" aria-hidden="true">
              {name.trim().charAt(0).toUpperCase() || "A"}
            </div>
            <span>{name}</span>
          </div>
          <button type="button" title="Đăng xuất" aria-label="Đăng xuất" onClick={onLogout} className="admin-sidebar-item admin-sidebar-exit">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
}
