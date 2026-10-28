import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardSidebar, { DashboardThemeButton } from "./dashboard/DashboardSidebar";
import OverviewTab from "./dashboard/overview/OverviewTab";
import WordSetsTab from "./dashboard/word-sets/WordSetsTab";
import FlashcardTab from "./dashboard/flashcard/FlashcardTab";
import NotebookTab from "./dashboard/notebook/NotebookTab";
import NotebookFlashcards from "./dashboard/flashcard/NotebookFlashcards";
import ReviewNotifications from "./dashboard/ReviewNotifications";
import DashboardDialog from "./dashboard/DashboardDialog";
import "./dashboard/dashboard-sample.css";
import "./VocabularyDashboard.css";

// Đọc từ Localstorage
function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem("vocabulary-dashboard") || "{}");
    // object.attribute
    // -> attribute : giá trị attribute
    return {
      dark: typeof saved.dark === "boolean" ? saved.dark : true,
      sidebarExpanded: typeof saved.sidebarExpanded === "boolean" ? saved.sidebarExpanded : false,
      band: typeof saved.band === "number" && saved.band >= 4 && saved.band <= 9 && saved.band * 2 % 1 === 0 ? saved.band : null,
      examDate: /^\d{4}-\d{2}-\d{2}$/.test(saved.examDate || "") && !Number.isNaN(Date.parse(saved.examDate)) ? saved.examDate : "",
    };
  } catch { return { dark: true, sidebarExpanded: false, band: null, examDate: "" }; }
}

function bangkokDate() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export default function VocabularyDashboard({ flashcardPage = false }) {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState(loadPreferences);
  const expanded = preferences.sidebarExpanded;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const folderId = searchParams.get("folder");
  const view = flashcardPage ? "flashcard" : tab === "botu" ? "sets" : tab === "flashcard" ? "flashcard" : tab === "notebook" ? "notebook" : "overview";
  const [notice, setNotice] = useState(null);
  const [today, setToday] = useState(bangkokDate);
  const contentRef = useRef(null);
  const toggleSidebar = useCallback(() => setPreferences((previous) => ({ ...previous, sidebarExpanded: !previous.sidebarExpanded })), []);

  useEffect(() => {
    try { localStorage.setItem("vocabulary-dashboard", JSON.stringify(preferences)); } catch { /* Keep the dashboard usable when storage is unavailable. */ }
  }, [preferences]);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [view, folderId]);
  useEffect(() => {
    const timer = window.setInterval(() => setToday(bangkokDate()), 60_000);
    const shortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "\\") { event.preventDefault(); toggleSidebar(); }
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", shortcut);
    return () => { clearInterval(timer); window.removeEventListener("keydown", shortcut); };
  }, [toggleSidebar]);

  const changeBand = useCallback((band) => setPreferences((previous) => ({ ...previous, band })), []);
  const toggleTheme = () => setPreferences((previous) => ({ ...previous, dark: !previous.dark }));
  const showNotice = (title, description) => setNotice({ title, description });
  const changeView = (target) => {
    if (flashcardPage || target === "flashcard") {
      navigate(target === "flashcard" ? "/vocabulary/flashcard" : `/vocabulary/dashboard${target === "overview" ? "" : `?tab=${target === "sets" ? "botu" : "notebook"}`}`);
      return;
    }
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous); // copy tham số hiện tại
      next.delete("folder");
      if (target === "overview") {
        next.delete("tab"); // Màn default -> khỏi cần url có tab
      } else if (target === "sets") {
        next.set("tab", "botu");
      } else if (target === "flashcard") {
        next.set("tab", "flashcard");
      } else if (target === "notebook") {
        next.set("tab", "notebook");
      }
      return next; // dùng
    });
  };
  const navigateView = (target, label) => {
    setMobileOpen(false);
    if (["overview", "sets", "flashcard", "notebook"].includes(target)) {
      changeView(target);
    } else {
      showNotice(label || "Thông tin", "Chưa có nội dung để hiển thị.");
    }
  };
  const handleAction = (event) => {
    const control = event.target.closest("[data-dashboard-action]");
    if (!control) return;
    event.preventDefault();
    const action = control.dataset.dashboardAction;
    if (action === "sets" || action === "history" || action === "notebook") navigateView(action);
    else if (action === "set-preview") showNotice(control.dataset.setTitle, "Bộ từ này chưa có nội dung học.");
    else showNotice("Luyện tập", "Chưa có bài luyện tập để hiển thị.");
  };

  return (
    <div className="vocabulary-dashboard">
      <div className={`tid-dash vd-shell ${preferences.dark ? "dark" : ""}`}>
        <DashboardSidebar expanded={expanded} onToggleExpanded={toggleSidebar} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} dark={preferences.dark} onToggleTheme={toggleTheme} view={view === "notebook" ? "sets" : view} onNavigate={navigateView} onNotice={showNotice} />
        <header className="vd-mobile-header">
          <button type="button" aria-label="Mở menu" aria-expanded={mobileOpen} className="vd-icon-button" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <div className="min-w-0 flex-1"><p className="truncate text-[10px] font-extrabold tracking-widest text-d-mute">{view === "overview" ? "TỔNG QUAN · TIẾN ĐỘ LUYỆN ĐỀ" : view === "flashcard" ? "FLASHCARD · IELTS" : view === "notebook" ? "BỘ TỪ CỦA BẢN THÂN" : "BỘ TỪ VỰNG · IELTS"}</p><p className="truncate text-sm font-bold">{view === "overview" ? "Chào bạn, hôm nay luyện đề nhé!" : view === "flashcard" ? (folderId ? "Lật thẻ, nhớ từ lâu hơn" : "Chọn bộ từ để bắt đầu ôn tập") : view === "notebook" ? "Thư mục của bạn." : "Chọn bộ từ để bắt đầu học"}</p></div>
          <ReviewNotifications />
          <DashboardThemeButton dark={preferences.dark} onToggle={toggleTheme} />
        </header>
        <main ref={contentRef} className={`vd-main${view === "flashcard" && folderId ? " vd-main-study" : ""}`} onClick={handleAction}>
          {view === "overview"
            ? <OverviewTab preferences={preferences} onBandChange={changeBand} onExamDateChange={(examDate) => setPreferences((previous) => ({ ...previous, examDate }))} today={today} />
            : view === "flashcard"
              ? folderId ? <NotebookFlashcards key={`${folderId}:${searchParams.get("review") || ""}`} folderId={folderId} /> : <FlashcardTab onChooseSet={() => navigateView("sets")} />
              : view === "notebook"
                ? <NotebookTab onBack={() => navigateView("sets")} />
                : <WordSetsTab key={view} />}
        </main>
        {notice && <DashboardDialog notice={notice} onClose={() => setNotice(null)} />}
      </div>
    </div>
  );
}
