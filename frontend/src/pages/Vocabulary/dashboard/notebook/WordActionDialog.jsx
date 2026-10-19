import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import PartOfSpeechBadge from "./PartOfSpeechBadge";
import { moveNotebookWord, updateNotebookWord, useNotebookFolders } from "./notebookStorage";
import "./AddWordsDialog.css";

const types = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection", "determiner", "article", "phrase"];

export default function WordActionDialog({ mode, word, folderId, onClose, onSuccess }) {
  const dialogRef = useRef(null);
  const folders = useNotebookFolders().filter((folder) => folder.id !== folderId);
  const [draft, setDraft] = useState(() => ({ word: word.word, type: word.type, meaning: word.meaning, example: word.example || "" }));
  const [targetId, setTargetId] = useState("");
  const [error, setError] = useState("");
  const editing = mode === "edit";
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  const change = (field, value) => { setError(""); setDraft((previous) => ({ ...previous, [field]: value })); };
  const submit = (event) => {
    event.preventDefault();
    const result = editing ? updateNotebookWord(folderId, word.id, draft) : moveNotebookWord(folderId, targetId, word.id);
    if (result.error) { setError(result.error); return; }
    onSuccess(editing ? `Đã cập nhật từ “${draft.word.trim()}”.` : `Đã chuyển “${word.word}” sang thư mục “${result.targetName}”.`);
    onClose();
  };
  return (
    <dialog ref={dialogRef} className="vd-add-words-dialog vd-word-action-dialog" aria-labelledby="vd-word-action-title" onClose={(event) => { if (!event.currentTarget.open) onClose(); }}>
      <form onSubmit={submit} className="vd-add-words-form">
        <header className="vd-add-words-header">
          <div><h2 id="vd-word-action-title">{editing ? "Chỉnh sửa từ vựng" : "Chuyển sang thư mục khác"}</h2></div>
          <button type="button" className="vd-add-words-close" aria-label="Đóng" onClick={onClose}><X size={21} /></button>
        </header>
        <div className="vd-add-words-body vd-word-action-fields">
          {editing ? <>
            <label>Từ tiếng Anh<input required maxLength={100} value={draft.word} onChange={(event) => change("word", event.target.value)} /></label>
            <label>Loại từ<span className="vd-edit-word-type"><PartOfSpeechBadge type={draft.type} /><select required value={draft.type} onChange={(event) => change("type", event.target.value)}>{[...new Set([draft.type, ...types])].filter(Boolean).map((type) => <option key={type} value={type}>{type}</option>)}</select></span></label>
            <label>Định nghĩa<textarea required rows={3} value={draft.meaning} onChange={(event) => change("meaning", event.target.value)} /></label>
            <label>Ví dụ (không bắt buộc)<textarea rows={2} value={draft.example} onChange={(event) => change("example", event.target.value)} /></label>
          </> : <>
            <p>Chọn thư mục để chuyển <strong>{word.word}</strong> vào.</p>
            {folders.length ? folders.map((folder) => <label className="vd-move-folder-option" key={folder.id}><input type="radio" name="target-folder" value={folder.id} checked={targetId === folder.id} onChange={() => { setTargetId(folder.id); setError(""); }} /><span>{folder.name}<small>{folder.words.length} từ vựng</small></span></label>) : <p>Bạn cần tạo thêm một thư mục để chuyển từ.</p>}
          </>}
        </div>
        <footer className="vd-add-words-footer">
          {error && <p className="vd-word-save-error" role="alert">{error}</p>}
          <button type="button" className="vd-word-cancel" onClick={onClose}>Hủy</button>
          <button type="submit" className="vd-word-save" disabled={editing ? !draft.word.trim() || !draft.type.trim() || !draft.meaning.trim() : !targetId}>{editing ? "Lưu thay đổi" : "Chuyển từ"}</button>
        </footer>
      </form>
    </dialog>
  );
}
