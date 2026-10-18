import FolderBookIcon from "./FolderBookIcon";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "Asia/Bangkok",
});

export default function NotebookFolderCard({ folder, onOpen }) {
  return (
    <article className="vd-notebook-folder-card" aria-label={`Thư mục ${folder.name}`}>
      <button type="button" className="vd-notebook-folder-open" aria-label={`Mở thư mục ${folder.name}`} onClick={() => onOpen(folder.id)} />
      <span className="vd-notebook-folder-word-count" aria-label={`${folder.wordCount} từ`}><strong>{folder.wordCount}</strong><span>từ</span></span>
      <FolderBookIcon />
      <h2 title={folder.name}>{folder.name}</h2>
      <p>Đã thêm <time dateTime={folder.createdAt}>{dateFormatter.format(new Date(folder.createdAt))}</time></p>
    </article>
  );
}
