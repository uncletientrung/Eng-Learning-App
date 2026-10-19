import { useState } from "react";
import { ChevronLeft, CircleCheck, Folder, FolderInput, Layers, Pencil, Plus, X } from "lucide-react";
import AddWordsDialog from "./AddWordsDialog";
import PartOfSpeechBadge from "./PartOfSpeechBadge";
import WordActionDialog from "./WordActionDialog";
import { deleteNotebookWords } from "./notebookStorage";
import "./NotebookFolderDetail.css";

export default function NotebookFolderDetail({ folder, onBack, onAddWords }) {
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState(null);
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState([]);
  const words = folder.words ?? [];
  const selectedIds = selected.filter((id) => words.some((item) => item.id === id));
  const removeWords = (ids) => {
    const result = deleteNotebookWords(folder.id, ids);
    setMessage(result.error || `Đã xóa ${result.deletedCount} từ khỏi thư mục.`);
    if (!result.error) { setSelected([]); setSelecting(false); }
  };
  return (
    <section className="vd-notebook vd-folder-detail" aria-labelledby="vd-folder-detail-title">
      <button type="button" className="vd-notebook-back" onClick={onBack}><ChevronLeft size={17} strokeWidth={2.6} />Tất cả thư mục</button>
      <header className="vd-folder-detail-header">
        <span className="vd-folder-detail-orb" aria-hidden="true" />
        <span className="vd-folder-detail-dots" aria-hidden="true" />
        <span className="vd-folder-detail-icon" aria-hidden="true"><Folder size={34} /></span>
        <div className="vd-folder-detail-heading">
          <span>BỘ TỪ CỦA BẠN</span>
          <h1 id="vd-folder-detail-title">{folder.name}</h1>
          <p>{words.length} từ vựng</p>
        </div>
        <div className="vd-folder-detail-actions">
          <button type="button" onClick={() => { setMessage(""); setAdding(true); }} className="vd-folder-add-word"><Plus size={20} />Thêm từ mới</button>
          <button type="button" disabled={!words.length} className="vd-folder-select-words" aria-pressed={selecting} onClick={() => { setSelecting(!selecting); setSelected([]); }}><CircleCheck size={20} />{selecting ? "Hủy chọn" : "Chọn để xoá"}</button>
          <button type="button" disabled className="vd-folder-practice"><Layers size={21} />Luyện Flashcard</button>
        </div>
      </header>
      {message && <p className="vd-folder-save-message" role="status">{message}</p>}
      {selecting && <div className="vd-folder-selection-bar"><label><input type="checkbox" checked={words.length > 0 && selectedIds.length === words.length} onChange={(event) => setSelected(event.target.checked ? words.map((item) => item.id) : [])} />Chọn tất cả</label><button type="button" disabled={!selectedIds.length} onClick={() => removeWords(selectedIds)}>Xóa {selectedIds.length} từ đã chọn</button></div>}
      {!words.length && <p className="vd-folder-empty">Thư mục chưa có từ vựng. Bấm “Thêm từ mới” để bắt đầu.</p>}
      <ul className="vd-folder-word-list" aria-label="Từ vựng trong thư mục">
        {words.map((item) => (
          <li key={item.id} className="vd-folder-word-row">
            <div className="vd-folder-word-heading">
              {selecting && <input type="checkbox" aria-label={`Chọn ${item.word}`} checked={selectedIds.includes(item.id)} onChange={(event) => setSelected((previous) => event.target.checked ? [...previous, item.id] : previous.filter((id) => id !== item.id))} />}
              <h2>{item.word}</h2>
              <PartOfSpeechBadge type={item.type} />
            </div>
            <div className="vd-folder-word-meaning"><p>{item.meaning}</p>{item.example && <blockquote>“{item.example}”</blockquote>}</div>
            <div className="vd-folder-word-actions">
              <button type="button" onClick={() => setAction({ mode: "edit", word: item })} aria-label={`Chỉnh sửa ${item.word}`} title="Chỉnh sửa"><Pencil size={18} /></button>
              <button type="button" onClick={() => setAction({ mode: "move", word: item })} aria-label={`Chuyển ${item.word} sang thư mục khác`} title="Chuyển thư mục"><FolderInput size={18} /></button>
              <button type="button" onClick={() => removeWords([item.id])} aria-label={`Xóa ${item.word}`} title="Xóa từ"><X size={19} /></button>
            </div>
          </li>
        ))}
      </ul>
      {action && <WordActionDialog mode={action.mode} word={action.word} folderId={folder.id} onClose={() => setAction(null)} onSuccess={setMessage} />}
      {adding && <AddWordsDialog folderName={folder.name} onClose={() => setAdding(false)} onSave={(selections) => {
        const result = onAddWords(selections);
        if (!result.error) setMessage(`Đã thêm ${result.addedCount} từ vào thư mục.${result.duplicateCount ? ` Bỏ qua ${result.duplicateCount} nghĩa đã có.` : ""}`);
        return result;
      }} />}
    </section>
  );
}
