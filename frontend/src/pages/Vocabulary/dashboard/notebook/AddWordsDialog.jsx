import { useEffect, useRef, useState } from "react";
import { BookPlus, Plus, X } from "lucide-react";
import DictionaryWordRow from "./DictionaryWordRow";
import "./AddWordsDialog.css";

const newDraft = () => ({ id: crypto.randomUUID(), query: "", selection: null });

export default function AddWordsDialog({ folderName, onSave, onClose }) {
  const dialogRef = useRef(null);
  const [drafts, setDrafts] = useState(() => [newDraft()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const filled = drafts.filter((draft) => draft.query.trim());
  const canSave = filled.length > 0 && filled.every((draft) => draft.selection);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    dialog.querySelector("input")?.focus();
    return () => dialog.close();
  }, []);
  const updateDraft = (id, changes) => {
    setError("");
    setDrafts((previous) => previous.map((draft) => draft.id === id ? { ...draft, ...changes } : draft));
  };
  const save = async (event) => {
    event.preventDefault();
    if (!canSave || saving) return;
    setSaving(true);
    try {
      const result = await onSave(filled.map((draft) => draft.selection));
      if (result.error) setError(result.error);
      else { onClose(); return; }
    } catch { setError("Chưa lưu được từ vựng. Vui lòng thử lại."); }
    setSaving(false);
  };
  return (
    <dialog ref={dialogRef} className="vd-add-words-dialog" onClose={(event) => { if (!event.currentTarget.open) onClose(); }} onCancel={(event) => { if (saving) event.preventDefault(); }} aria-labelledby="vd-add-words-title" aria-describedby="vd-add-words-description">
      <form onSubmit={save} className="vd-add-words-form">
        <header className="vd-add-words-header">
          <div className="vd-add-words-icon" aria-hidden="true"><BookPlus size={24} /></div>
          <div><span className="vd-add-words-folder">{folderName}</span><h2 id="vd-add-words-title">Thêm từ mới</h2></div>
          <button type="button" onClick={onClose} disabled={saving} aria-label="Đóng thêm từ" className="vd-add-words-close"><X size={21} /></button>
          <p id="vd-add-words-description">Nhập từ tiếng Anh, rồi chọn loại từ và định nghĩa phù hợp. Bạn có thể thêm nhiều từ trong một lần.</p>
        </header>
        <div className="vd-add-words-body">
          {drafts.map((draft, index) => <DictionaryWordRow key={draft.id} draft={draft} index={index} onChange={(changes) => updateDraft(draft.id, changes)} onRemove={() => { setError(""); setDrafts((previous) => previous.length === 1 ? [newDraft()] : previous.filter((item) => item.id !== draft.id)); }} />)}
          <button type="button" className="vd-add-another-word" onClick={() => {
            setDrafts((previous) => [...previous, newDraft()]);
            requestAnimationFrame(() => {
              const inputs = dialogRef.current?.querySelectorAll("input");
              inputs?.[inputs.length - 1]?.focus();
            });
          }}><Plus size={18} />Thêm một từ nữa</button>
        </div>
        <footer className="vd-add-words-footer">
          {error && <p role="alert" className="vd-word-save-error">{error}</p>}
          <span className="vd-add-words-summary">{filled.filter((draft) => draft.selection).length} từ đã chọn nghĩa</span>
          <button type="button" className="vd-word-cancel" onClick={onClose} disabled={saving}>Hủy</button>
          <button type="submit" className="vd-word-save" disabled={!canSave || saving}>{saving ? "Đang lưu..." : `Lưu${canSave ? ` ${filled.length} từ` : " từ vựng"}`}</button>
        </footer>
      </form>
    </dialog>
  );
}
