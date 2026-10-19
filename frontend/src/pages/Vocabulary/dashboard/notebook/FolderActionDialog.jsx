import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { deleteNotebookFolder, renameNotebookFolder, useNotebookFolders } from "./notebookStorage";
import "./AddWordsDialog.css";

export default function FolderActionDialog({ folder, mode, onClose, onSuccess }) {
  const ref = useRef(null);
  const [name, setName] = useState(folder.name);
  const [error, setError] = useState("");
  const currentFolder = useNotebookFolders().find((item) => item.id === folder.id);
  const renaming = mode === "rename";
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    if (renaming) dialog.querySelector("input")?.select();
    return () => dialog.close();
  }, [renaming]);
  return (
    <dialog ref={ref} className="vd-add-words-dialog vd-folder-action-dialog" aria-labelledby="vd-folder-action-title" onClose={(event) => { if (!event.currentTarget.open) onClose(); }}>
      <form className="vd-add-words-form" onSubmit={(event) => {
        event.preventDefault();
        const result = renaming ? renameNotebookFolder(folder.id, name) : deleteNotebookFolder(folder.id);
        if (result.error) { setError(result.error); return; }
        onSuccess(renaming ? `Đã đổi tên thư mục thành “${result.name}”.` : `Đã xóa thư mục “${currentFolder?.name || folder.name}”.`);
        onClose();
      }}>
        <header className="vd-add-words-header"><h2 id="vd-folder-action-title">{renaming ? "Đổi tên thư mục" : "Xóa thư mục"}</h2><button type="button" className="vd-add-words-close" aria-label="Đóng" onClick={onClose}><X size={21} /></button></header>
        <div className="vd-add-words-body">
          {renaming ? <label className="vd-folder-rename-label">Tên thư mục<input aria-label="Tên thư mục mới" required maxLength={80} value={name} onChange={(event) => { setName(event.target.value); setError(""); }} /></label> : <p className="vd-folder-delete-description">Xóa thư mục <strong>“{currentFolder?.name || folder.name}”</strong> cùng {currentFolder?.words.length ?? folder.words.length} từ vựng bên trong? Thao tác này không thể hoàn tác.</p>}
        </div>
        <footer className="vd-add-words-footer">
          {error && <p role="alert" className="vd-word-save-error">{error}</p>}
          <button type="button" className="vd-word-cancel" onClick={onClose}>Hủy</button>
          <button type="submit" className={`vd-word-save${renaming ? "" : " vd-folder-delete-confirm"}`} disabled={renaming && !name.trim()}>{renaming ? "Lưu tên" : "Xóa thư mục"}</button>
        </footer>
      </form>
    </dialog>
  );
}
