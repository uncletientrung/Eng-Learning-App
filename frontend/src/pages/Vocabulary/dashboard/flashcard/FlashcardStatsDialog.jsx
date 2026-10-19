import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import "../notebook/AddWordsDialog.css";

export default function FlashcardStatsDialog({ title, words, onSelect, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return <dialog ref={ref} className="vd-add-words-dialog vf-stats-dialog" aria-labelledby="vf-stats-title" onClose={(event) => { if (!event.currentTarget.open) onClose(); }}>
    <header className="vd-add-words-header"><h2 id="vf-stats-title">{title} · {words.length} từ</h2><button type="button" className="vd-add-words-close" aria-label="Đóng thống kê" onClick={onClose}><X size={20} /></button></header>
    <div className="vd-add-words-body">{words.length ? words.map((word) => <button type="button" className="vf-stats-word" key={word.id} onClick={() => { onSelect(word.id); onClose(); }}><strong>{word.word}</strong><span>{word.meaning}</span></button>) : <p>Chưa có từ nào ở nhóm này.</p>}</div>
  </dialog>;
}
