import { ChevronLeft, CircleCheck, Folder, FolderInput, Layers, Pencil, Plus, Volume2, X } from "lucide-react";
import "./NotebookFolderDetail.css";

export default function NotebookFolderDetail({ folder, onBack }) {
  const words = folder.words ?? [];
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
          <button type="button" disabled className="vd-folder-add-word"><Plus size={20} />Thêm từ mới</button>
          <button type="button" disabled className="vd-folder-select-words"><CircleCheck size={20} />Chọn để xoá</button>
          <button type="button" disabled className="vd-folder-practice"><Layers size={21} />Luyện Flashcard</button>
        </div>
      </header>
      <ul className="vd-folder-word-list" aria-label="Từ vựng trong thư mục">
        {words.map((item) => (
          <li key={item.id} className="vd-folder-word-row">
            <div className="vd-folder-word-heading">
              <h2>{item.word}</h2>
              <button type="button" disabled aria-label={`Nghe phát âm ${item.word}`} className="vd-folder-audio"><Volume2 size={19} /></button>
              <span className="vd-folder-word-type">{item.type}</span>
            </div>
            <div className="vd-folder-word-meaning"><p>{item.meaning}</p><blockquote>“{item.example}”</blockquote></div>
            <div className="vd-folder-word-actions">
              <button type="button" disabled aria-label={`Chỉnh sửa ${item.word}`}><Pencil size={18} /></button>
              <button type="button" disabled aria-label={`Chuyển ${item.word} sang thư mục khác`}><FolderInput size={18} /></button>
              <button type="button" disabled aria-label={`Xóa ${item.word}`}><X size={19} /></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
