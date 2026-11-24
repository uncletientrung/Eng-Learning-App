import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, BookOpen, ChevronLeft, ChevronRight, LoaderCircle, Search, TriangleAlert, X } from "lucide-react";
import { Link } from "react-router-dom";
import AdminPageTitle from "../../../components/admin/AdminPageTitle";
import "./AdminVocabulary.css";

export function VocabularyPageHeader({ title, highlight, titleActions, description, links = [], children }) {
  return (
    <div className="av-page-header">
      <div>
        <div className="av-page-heading">
          <AdminPageTitle title={title} highlight={highlight} />
          {titleActions}
        </div>
        <nav aria-label="Breadcrumb" className="av-breadcrumb">
          <Link to="/admin">Trang chủ</Link><span>/</span>
          {links.map((link, index) => <span className="av-breadcrumb-item" key={`${link.label}-${index}`}>
            {link.to ? <Link to={link.to} state={link.state}>{link.label}</Link> : <span aria-current="page">{link.label}</span>}
            {index < links.length - 1 && <span>/</span>}
          </span>)}
        </nav>
        {description && <p className="av-page-description">{description}</p>}
      </div>
      {children && <div className="av-actions">{children}</div>}
    </div>
  );
}

export function VocabularySearch({ value, onSearch, placeholder }) {
  const [draft, setDraft] = useState(value);
  return <form className="av-search" role="search" onSubmit={(event) => { event.preventDefault(); onSearch(draft.trim()); }}>
    <input aria-label={placeholder} placeholder={placeholder} maxLength={255} value={draft}
      onChange={(event) => { setDraft(event.target.value); if (!event.target.value) onSearch(""); }} />
    {draft && <button type="button" className="av-search-clear" aria-label="Xóa tìm kiếm" onClick={() => { setDraft(""); onSearch(""); }}><X size={14} /></button>}
    <button type="submit" className="av-search-submit" aria-label="Tìm kiếm"><Search size={17} /></button>
  </form>;
}

export function VocabularyPagination({ page, pageSize, totalCount, onChange, disabled = false }) {
  const count = Math.max(1, Math.ceil(totalCount / pageSize));
  const pages = [...new Set([1, ...Array.from({ length: 5 }, (_, i) => page - 2 + i), count])]
    .filter((value) => value >= 1 && value <= count).sort((a, b) => a - b);
  const start = totalCount ? (page - 1) * pageSize + 1 : 0;
  return <nav className="av-pagination" aria-label="Phân trang">
    <span className="av-total">{start}–{Math.min(page * pageSize, totalCount)} / {totalCount} bản ghi</span>
    <div className="av-pagination-controls">
      <button type="button" className="av-page-button" aria-label="Trang trước" disabled={disabled || page <= 1} onClick={() => onChange(page - 1, pageSize)}><ChevronLeft size={16} /></button>
      {pages.map((value, index) => <span className="av-page-item" key={value}>
        {index > 0 && value - pages[index - 1] > 1 && <span className="av-page-gap">…</span>}
        <button type="button" className={`av-page-button${page === value ? " is-active" : ""}`} aria-label={`Trang ${value}`} aria-current={page === value ? "page" : undefined} disabled={disabled} onClick={() => onChange(value, pageSize)}>{value}</button>
      </span>)}
      <button type="button" className="av-page-button" aria-label="Trang sau" disabled={disabled || page >= count} onClick={() => onChange(page + 1, pageSize)}><ChevronRight size={16} /></button>
      <select aria-label="Số bản ghi mỗi trang" value={pageSize} disabled={disabled} onChange={(event) => onChange(1, Number(event.target.value))}>
        {[10, 20, 50].map((size) => <option value={size} key={size}>{size} / trang</option>)}
      </select>
    </div>
  </nav>;
}

export function VocabularyLoadState({ loading, error, onRetry }) {
  if (error) return <div className="av-state av-error" role="alert"><AlertCircle size={28} /><p>{error.message}</p><button type="button" className="av-button" onClick={onRetry}>Thử lại</button></div>;
  return loading ? <div className="av-state" role="status"><LoaderCircle className="av-spin" size={25} /><p>Đang tải dữ liệu...</p></div> : null;
}

export function VocabularyEmpty({ filtered, children }) {
  return <div className="av-state"><BookOpen size={32} /><strong>{filtered ? "Không có kết quả phù hợp" : "Chưa có dữ liệu"}</strong><p>{filtered ? "Thử thay đổi từ khóa hoặc bộ lọc." : children}</p></div>;
}

export function VocabularyNotice({ message, error = false, onClose }) {
  if (!message) return null;
  return <div className={`av-notice${error ? " is-error" : ""}`} role={error ? "alert" : "status"}>
    <span>{message}</span>{onClose && <button type="button" aria-label="Đóng thông báo" onClick={onClose}><X size={16} /></button>}
  </div>;
}

export function VocabularyDeleteDialog({ item, onCancel, onDelete }) {
  const ref = useRef(null);
  const headingId = useId();
  const descriptionId = useId();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => { dialog.close(); if (previousFocus?.isConnected) previousFocus.focus(); };
  }, []);
  const confirm = async () => {
    setPending(true);
    setError("");
    try { await onDelete(); }
    catch (failure) { setError(failure.message); setPending(false); }
  };
  return <dialog ref={ref} className="av-delete-dialog" aria-labelledby={headingId} aria-describedby={descriptionId}
    onCancel={(event) => { event.preventDefault(); if (!pending) onCancel(); }}>
    <div className="av-delete-heading"><TriangleAlert size={24} /><h3 id={headingId}>Xóa {item.type}?</h3></div>
    <p id={descriptionId}>Bạn có chắc muốn xóa <strong>{item.name}</strong>? {item.description}</p>
    <VocabularyNotice message={error} error />
    <div className="av-actions"><button type="button" className="av-button" autoFocus disabled={pending} onClick={onCancel}>Hủy</button>
      <button type="button" className="av-button av-danger" disabled={pending} onClick={confirm}>{pending ? <LoaderCircle size={16} className="av-spin" /> : null} {pending ? "Đang xóa..." : "Xóa"}</button></div>
  </dialog>;
}
