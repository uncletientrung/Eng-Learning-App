import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, FolderPlus, PencilLine, Plus } from "lucide-react";
import CalendarBadge from "../overview/CalendarBadge";
import NotebookFolderCard from "./NotebookFolderCard";
import NotebookFolderDetail from "./NotebookFolderDetail";
import FolderActionDialog from "./FolderActionDialog";
import { addNotebookWords, getNotebookFolders, saveNotebookFolders, useNotebookFolders } from "./notebookStorage";
import "./NotebookTab.css";

export default function NotebookTab({ onBack }) {
  const folders = useNotebookFolders();
  const [creating, setCreating] = useState(false);
  const [folderAction, setFolderAction] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState(false);
  const nameInputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFolderId = searchParams.get("folder");
  const selectedFolder = folders.find((folder) => folder.id === selectedFolderId);

  useEffect(() => {
    if (creating) nameInputRef.current?.focus();
  }, [creating]);

  const startCreating = () => {
    setCreating(true);
    nameInputRef.current?.focus();
  };
  const cancelCreating = () => {
    setCreating(false);
    setName("");
    setError("");
  };
  const createFolder = (event) => {
    event.preventDefault();
    const folderName = name.trim();
    if (!folderName) {
      setError("Vui lòng nhập tên thư mục.");
      nameInputRef.current?.focus();
      return;
    }
    const nextFolders = [{ id: crypto.randomUUID(), name: folderName, createdAt: new Date().toISOString(), words: [], wordCount: 0 }, ...getNotebookFolders()];
    try {
      saveNotebookFolders(nextFolders);
      setStorageError(false);
    } catch { setStorageError(true); return; }
    cancelCreating();
  };
  const wordCount = folders.reduce((total, folder) => total + folder.wordCount, 0);
  const openFolder = (id) => {
    cancelCreating();
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set("folder", id);
      return next;
    });
  };
  const backToFolders = () => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.delete("folder");
      return next;
    });
  };

  if (selectedFolder) return <NotebookFolderDetail key={selectedFolder.id} folder={selectedFolder} onBack={backToFolders} onAddWords={(selections) => addNotebookWords(selectedFolder.id, selections)} />;
  if (selectedFolderId) return <section className="vd-notebook"><button type="button" className="vd-notebook-back" onClick={backToFolders}><ChevronLeft size={17} />Tất cả thư mục</button><p role="status">Không tìm thấy thư mục.</p></section>;

  return (
    <section className="vd-notebook" aria-labelledby="vd-notebook-title">
      <button type="button" className="vd-notebook-back" onClick={onBack}><ChevronLeft size={17} strokeWidth={2.6} />Tất cả bộ từ</button>
      <header className="vd-notebook-header">
        <span className="vd-notebook-grid" aria-hidden="true" />
        <span className="vd-notebook-orb" aria-hidden="true" />
        <span className="vd-notebook-badge" aria-hidden="true"><CalendarBadge /><PencilLine size={26} color="white" /></span>
        <div className="vd-notebook-heading">
          <span className="vd-notebook-eyebrow">BỘ TỪ CỦA BẢN THÂN</span>
          <h1 id="vd-notebook-title">Thư mục của bạn.</h1>
          <div className="vd-notebook-counts">
            <span><i className="vd-notebook-dot-green" aria-hidden="true" />{folders.length} thư mục</span>
            <span><i className="vd-notebook-dot-yellow" aria-hidden="true" />{wordCount} từ vựng tự thêm</span>
          </div>
        </div>
        <div className="vd-notebook-actions">
          <button type="button" onClick={startCreating} className="vd-notebook-create"><FolderPlus size={17} />Tạo thư mục mới</button>
        </div>
      </header>
      {storageError && <p role="status" className="text-sm text-d-mute">Trình duyệt chưa lưu được thư mục. Vui lòng kiểm tra dung lượng hoặc quyền lưu rồi thử lại.</p>}
      {message && <p role="status" className="vd-notebook-folder-message">{message}</p>}
      <div className="vd-notebook-folders">
        {creating ? (
          <form className="vd-notebook-folder-form" onSubmit={createFolder} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); cancelCreating(); } }} aria-label="Tạo thư mục">
            <input ref={nameInputRef} type="text" aria-label="Tên thư mục" aria-invalid={Boolean(error)} aria-describedby={error ? "vd-folder-name-error" : undefined} placeholder="Tên thư mục ..." maxLength={80} value={name} onChange={(event) => { setName(event.target.value); setError(""); }} />
            {error && <p id="vd-folder-name-error" role="alert">{error}</p>}
            <div className="vd-notebook-folder-form-actions"><button type="submit">Tạo</button><button type="button" onClick={cancelCreating}>Hủy</button></div>
          </form>
        ) : <button type="button" onClick={startCreating} className="vd-notebook-new-folder"><Plus size={20} strokeWidth={3} />Thư mục mới</button>}
        {folders.map((folder) => <NotebookFolderCard key={folder.id} folder={folder} onOpen={openFolder} onAction={(mode, target) => setFolderAction({ mode, folder: target })} />)}
      </div>
      {folderAction && <FolderActionDialog folder={folderAction.folder} mode={folderAction.mode} onClose={() => setFolderAction(null)} onSuccess={setMessage} />}
    </section>
  );
}
