import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bell, RotateCcw, X } from "lucide-react";
import { Link } from "react-router-dom";
import { reviewDate } from "./flashcard/flashcardStorage";
import { useDueFolders, dueFolderLink } from "./flashcard/useDueFolders";
import "./ReviewNotifications.css";

const dismissedKey = "vocabulary-review-dismissed-v1";
function readDismissed() {
  try { return JSON.parse(localStorage.getItem(dismissedKey)) || {}; } catch { return {}; }
}

export default function ReviewNotifications() {
  const dueFolders = useDueFolders();
  const [open, setOpen] = useState(false);
  const [portalHost, setPortalHost] = useState(null);
  const dismissed = readDismissed();
  const container = useRef(null);
  const panel = useRef(null);
  const button = useRef(null);
  const today = reviewDate();
  const folders = dueFolders.filter((folder) => dismissed[folder.id] !== `${today}:${folder.signature}`);
  useEffect(() => {
    if (!open) return;
    const outside = (event) => { if (!container.current?.contains(event.target) && !panel.current?.contains(event.target)) setOpen(false); };
    const escape = (event) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  const dismiss = (folder) => {
    const next = { ...readDismissed(), [folder.id]: `${today}:${folder.signature}` };
    try { localStorage.setItem(dismissedKey, JSON.stringify(next)); } catch { /* Still allow dismissal for this session. */ }
    window.dispatchEvent(new Event("vocabulary-progress-updated"));
  };
  return <div className="vr-notifications" ref={container}>
    <button ref={button} type="button" title="Thông báo" aria-label={`Thông báo, ${folders.length} bộ từ cần ôn tập`} aria-expanded={open} className="vd-icon-button vr-bell" onClick={(event) => { setPortalHost(event.currentTarget.closest(".vd-shell")); setOpen(!open); }}><Bell size={18} />{folders.length > 0 && <span className="vr-badge">{folders.length}</span>}</button>
    {open && portalHost && createPortal(<section ref={panel} className="vr-panel" aria-label="Thông báo ôn tập">
      <header><h2>Thông báo</h2><button type="button" aria-label="Đóng thông báo" onClick={() => setOpen(false)}><X size={18} /></button></header>
      <div className="vr-items">
        {folders.map((folder) => <article key={folder.id} className="vr-item"><span className="vr-icon"><RotateCcw size={22} /></span><div><p>Đã đến lịch ôn tập bộ từ <strong>“{folder.name}”</strong>.</p><small>{folder.dueWords.length} từ đến hạn ôn tập</small><div className="vr-actions"><Link to={dueFolderLink(folder.id)} onClick={() => setOpen(false)}>Ôn ngay</Link><button type="button" onClick={() => dismiss(folder)}>Bỏ qua</button></div></div></article>)}
        {!folders.length && <p className="vr-empty">Bạn chưa có thông báo ôn tập mới.</p>}
      </div>
      <Link className="vr-all" to="/vocabulary/dashboard?tab=botu" onClick={() => setOpen(false)}>XEM TẤT CẢ BỘ TỪ</Link>
    </section>, portalHost)}
  </div>;
}
