import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, BookText, Headphones, Languages, Mic, PenLine } from "lucide-react";
import HeroMascot from "../sections/HeroMascot";
import "./QuickNavigation.css";

const destinations = [
  { path: "/writing", label: "Writing", icon: PenLine },
  { path: "/speaking", label: "Speaking", icon: Mic },
  { path: "/listening", label: "Listening", icon: Headphones },
  { path: "/vocabulary/dashboard", label: "Vocabulary", icon: Languages },
  { path: "/grammar", label: "Grammar", icon: BookText },
  { path: "/reading", label: "Reading", icon: BookOpen },
];

export default function QuickNavigation({ sidebarExpanded = false, dashboard = false }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`quick-navigation${dashboard ? " quick-navigation--dashboard" : ""}${sidebarExpanded ? " quick-navigation--sidebar-expanded" : ""}`}
    >
      <button
        ref={buttonRef}
        type="button"
        className="quick-navigation__button"
        aria-label={open ? "Đóng menu chuyển nhanh" : "Mở menu chuyển nhanh"}
        aria-expanded={open}
        aria-controls={open ? "quick-navigation-menu" : undefined}
        onClick={() => setOpen((previous) => !previous)}
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <div className="quick-navigation__sun" aria-hidden="true">
          <HeroMascot compact followFaceOnly hovered={hovered} isMascotSmiling={hovered} />
        </div>
      </button>
      {open && (
        <nav id="quick-navigation-menu" className="quick-navigation__menu" aria-label="Chuyển nhanh trang học">
          <p className="quick-navigation__heading">Hôm nay học gì nhỉ?</p>
          <div className="quick-navigation__links">
            {destinations.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                aria-current={location.pathname === path ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
