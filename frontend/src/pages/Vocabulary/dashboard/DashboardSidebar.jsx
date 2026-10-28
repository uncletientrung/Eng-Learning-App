import ReviewNotifications from "./ReviewNotifications";
import { Link } from "react-router-dom";
import { History, Layers, LayoutGrid, LibraryBig, LogOut, Moon, PanelLeftClose, PanelLeftOpen, Sun, TrendingUp, X } from "lucide-react";

const items = [
  { label: "Tổng quan", icon: LayoutGrid, view: "overview" },
  { label: "Bộ từ", icon: LibraryBig, view: "sets" },
  { label: "Flashcard", icon: Layers, view: "flashcard" },
  { label: "Thống kê", icon: TrendingUp, view: "statistics", disabled: true },
  { label: "Lịch sử làm bài", icon: History, view: "history", disabled: true },
];

export function DashboardThemeButton({ dark, onToggle }) {
  const Icon = dark ? Sun : Moon;
  return <button type="button" title="Chế độ sáng / tối" aria-label="Chế độ sáng / tối" onClick={onToggle} className="vd-theme-button"><Icon size={17} /></button>;
}

export default function DashboardSidebar({ expanded, onToggleExpanded, mobileOpen, onCloseMobile, dark, onToggleTheme, view, onNavigate }) {
  return (
    <>
      {mobileOpen && <button type="button" aria-label="Đóng menu" className="vd-menu-backdrop" onClick={onCloseMobile} />}
      <aside className={`vd-sidebar ${expanded ? "is-expanded" : ""} ${mobileOpen ? "is-mobile-open" : ""}`} aria-label="Menu dashboard">
        <div className="vd-sidebar-top">
          <Link to="/" title="Về trang chủ" className="vd-brand"><img src="/assets/logo-finall.png" alt="The IELTS Dictionary" /><span>The IELTS Dictionary</span></Link>
          <div className="vd-sidebar-tools">
            <DashboardThemeButton dark={dark} onToggle={onToggleTheme} />
            <button type="button" className="vd-icon-button vd-expand" title={expanded ? "Thu gọn menu" : "Mở rộng menu"} aria-label={expanded ? "Thu gọn menu" : "Mở rộng menu"} aria-expanded={expanded} onClick={onToggleExpanded}>{expanded ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}</button>
            <button type="button" className="vd-icon-button vd-mobile-close" aria-label="Đóng menu" onClick={onCloseMobile}><X size={18} /></button>
          </div>
        </div>
        <div className="vd-sidebar-separator" role="separator" />
        <nav className="vd-nav">
          {items.map(({ label, icon: Icon, view: target, disabled }) => <div key={target}>
            <button type="button" title={label} disabled={disabled} aria-current={view === target ? "page" : undefined} onClick={() => onNavigate(target, label)} className={`vd-nav-item ${view === target ? "is-active" : ""}`}><Icon size={20} /><span>{label}</span></button>
          </div>)}
        </nav>
        <div className="vd-sidebar-bottom">
          <div className="vd-divider" />
          <div className="vd-account"><div className="vd-avatar" aria-hidden="true">B</div><span>Bạn học</span><ReviewNotifications /></div>
          <button type="button" title="Đăng xuất" aria-label="Đăng xuất" disabled className="vd-nav-item vd-exit"><LogOut size={20} /><span>Đăng xuất</span></button>
        </div>
      </aside>
    </>
  );
}
