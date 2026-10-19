import FolderBookIcon from "./FolderBookIcon";
import { Pencil, Trash2 } from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "Asia/Bangkok",
});

export default function NotebookFolderCard({ folder, onOpen, onAction }) {
  return (
    <article className="vd-notebook-folder-card" aria-label={`Thư mục ${folder.name}`}>
      <button type="button" className="vd-notebook-folder-open" aria-label={`Mở thư mục ${folder.name}`} onClick={() => onOpen(folder.id)} />
      <div className="vd-notebook-folder-tools">
        <button type="button" aria-label={`Đổi tên thư mục ${folder.name}`} title="Đổi tên thư mục" onClick={() => onAction("rename", folder)}><Pencil size={17} /></button>
        <button type="button" aria-label={`Xóa thư mục ${folder.name}`} title="Xóa thư mục" onClick={() => onAction("delete", folder)}><Trash2 size={17} /></button>
      </div>
      <span className="vd-notebook-folder-word-count" aria-label={`${folder.wordCount} từ`}><strong>{folder.wordCount}</strong><span>từ</span></span>
      <FolderBookIcon />
      <h2 title={folder.name}>{folder.name}</h2>
      <p>Đã thêm <time dateTime={folder.createdAt}>{dateFormatter.format(new Date(folder.createdAt))}</time></p>
    </article>
  );
}
