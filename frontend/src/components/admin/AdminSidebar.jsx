import {
  FileText,
  LayoutDashboard,
  LogOut,
  Mic,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { getCurrentUser } from "../../services/authApi";
import "./AdminSidebar.css";

const navigation = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Quản lý Writing", to: "/admin/writing", icon: FileText },
  { label: "Quản lý Speaking", to: "/admin/speaking", icon: Mic },
];

const comingSoon = [
  "Quản lý Reading",
  "Quản lý Listening",
  "Quản lý Vocabulary",
  "Quản lý Grammar",
  "Quản lý Idioms",
  "Quản lý Users",
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
        className={`admin-sidebar${expanded ? " is-expanded" : ""}${mobileOpen ? " is-mobile-open" : ""}${dark ? " is-dark" : ""}`}
        aria-label="Menu quản trị"
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
        <nav className="admin-sidebar-nav" aria-label="Điều hướng quản trị">
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onCloseMobile}
              title={label}
              className={({ isActive }) => `admin-sidebar-item${isActive ? " is-active" : ""}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <p className="admin-sidebar-section admin-sidebar-coming-title">SẮP RA MẮT</p>
        <nav className="admin-sidebar-nav" aria-label="Các chức năng đang phát triển">
          {comingSoon.map((label) => (
            <div className="admin-sidebar-coming" key={label} title={label}>
              <span className="admin-sidebar-coming-dot" />
              <span>{label}</span>
              <small>Sắp tới</small>
            </div>
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
