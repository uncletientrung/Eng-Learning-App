import { useEffect, useState } from "react";
import { ArrowUpRight, Pencil, RefreshCw, Search, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  deleteAdminSpeakingSubmission,
  getAdminSpeakingSubmissions,
} from "../../services/adminApi";
import { getTopicByModule } from "../../services/topicAPI";

const typeNames = { INTRODUCTION_INTERVIEW: "Part 1", TOPIC: "Part 2", TOPIC_DISCUSS: "Part 3" };
const statusNames = { IN_PROGRESS: "Đang làm", SUBMITTED: "Đã nộp", GRADING: "Đang chấm", GRADING_FAILED: "Chấm lỗi", GRADED: "Đã chấm", ABANDONED: "Đã bỏ" };

function StatusBadge({ status }) {
  const colors = status === "GRADED" ? "bg-emerald-50 text-emerald-700" : status === "GRADING_FAILED" ? "bg-rose-50 text-rose-700" : status === "GRADING" || status === "SUBMITTED" ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-600";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${colors}`}>{statusNames[status] || status}</span>;
}

export default function AdminSpeakingSubmissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    exerciseId: searchParams.get("exerciseId") || "",
    topicId: "",
    speakingType: "",
    minimumScore: "",
    maximumScore: "",
    from: "",
    to: "",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let active = true;
    getTopicByModule("SPEAKING")
      .then((result) => { if (active) setTopics(Array.isArray(result) ? result : []); })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    getAdminSpeakingSubmissions({ ...filters, page, pageSize: 10 })
      .then((result) => { if (active) setData(result); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [filters, page, refresh]);

  function changeFilter(field, value) {
    setLoading(true);
    setError("");
    setPage(1);
    setFilters((current) => ({ ...current, [field]: value }));
    if (field === "exerciseId") {
      const next = new URLSearchParams(searchParams);
      if (value) next.set("exerciseId", value);
      else next.delete("exerciseId");
      setSearchParams(next, { replace: true });
    }
  }
  async function deleteSubmission(item) {
    if (!window.confirm(
      `Xóa bài nộp #${item.attemptId} của ${item.userName}? Thao tác này sẽ xóa cả kết quả chấm và file ghi âm, không thể hoàn tác.`,
    )) return;

    setDeletingId(item.attemptId);
    setError("");
    try {
      await deleteAdminSpeakingSubmission(item.attemptId);
      setLoading(true);
      if (data?.items.length === 1 && page > 1)
        setPage((currentPage) => currentPage - 1);
      setRefresh((value) => value + 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId(null);
    }
  }
  const controlClass = "min-h-10 rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]";
  const pageCount = Math.max(1, Math.ceil((data?.totalCount || 0) / (data?.pageSize || 10)));

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <header className="mb-5"><h2 className="m-0 text-2xl font-black">Bài nộp Speaking</h2><p className="mb-0 mt-1 text-sm text-slate-500">Tra cứu lượt làm, trạng thái chấm và điểm của học viên.</p></header>
      {error && <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800" role="alert"><p>{error}</p><button className="rounded-lg border bg-white px-3 py-2 text-xs font-bold" type="button" onClick={() => setRefresh((value) => value + 1)}><RefreshCw size={14} /> Thử lại</button></div>}
      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative sm:col-span-2"><Search className="absolute left-3 top-3 text-slate-400" size={15} /><input className={`${controlClass} w-full pl-9`} aria-label="Tìm học viên hoặc đề" placeholder="Tên, email học viên hoặc tên đề..." value={filters.search} onChange={(event) => changeFilter("search", event.target.value)} /></label>
        <input className={controlClass} aria-label="Lọc ID đề" type="number" min="1" placeholder="ID đề" value={filters.exerciseId} onChange={(event) => changeFilter("exerciseId", event.target.value)} />
        <select className={controlClass} aria-label="Lọc chủ đề" value={filters.topicId} onChange={(event) => changeFilter("topicId", event.target.value)}><option value="">Tất cả chủ đề</option>{topics.map((topic) => <option value={topic.id} key={topic.id}>{topic.name}</option>)}</select>
        <select className={controlClass} aria-label="Lọc trạng thái" value={filters.status} onChange={(event) => changeFilter("status", event.target.value)}><option value="">Mọi trạng thái</option>{Object.entries(statusNames).map(([value, name]) => <option value={value} key={value}>{name}</option>)}</select>
        <select className={controlClass} aria-label="Lọc Part" value={filters.speakingType} onChange={(event) => changeFilter("speakingType", event.target.value)}><option value="">Tất cả Part</option>{Object.entries(typeNames).map(([value, name]) => <option value={value} key={value}>{name}</option>)}</select>
        <input className={controlClass} aria-label="Điểm tối thiểu" type="number" min="0" max="9" step="0.5" placeholder="Điểm từ" value={filters.minimumScore} onChange={(event) => changeFilter("minimumScore", event.target.value)} />
        <input className={controlClass} aria-label="Điểm tối đa" type="number" min="0" max="9" step="0.5" placeholder="Điểm đến" value={filters.maximumScore} onChange={(event) => changeFilter("maximumScore", event.target.value)} />
        <label className="grid gap-1 text-[10px] font-bold text-slate-500">Từ ngày<input className={controlClass} type="date" value={filters.from} onChange={(event) => changeFilter("from", event.target.value)} /></label>
        <label className="grid gap-1 text-[10px] font-bold text-slate-500">Đến ngày<input className={controlClass} type="date" value={filters.to} onChange={(event) => changeFilter("to", event.target.value)} /></label>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[#e4e7ed] bg-white">
        <table className="w-full min-w-[1120px] border-collapse text-left text-xs">
          <thead className="bg-[#f7f8fa] text-[10px] uppercase tracking-wide text-[#6b7080]"><tr>{["Học viên", "Đề Speaking", "Trạng thái", "Điểm", "Thời gian", ""].map((item, index) => <th className="px-4 py-3" key={`${item}-${index}`}>{item}</th>)}</tr></thead>
          <tbody className="divide-y divide-[#edf0f4]">
            {loading ? <tr><td className="px-4 py-10 text-center text-slate-500" colSpan="6">Đang tải bài nộp...</td></tr>
              : data?.items?.length ? data.items.map((item) => <tr key={item.attemptId}>
                <td className="px-4 py-3"><strong className="block">{item.userName}</strong><span className="text-[11px] text-slate-500">{item.userEmail}</span></td>
                <td className="px-4 py-3"><strong className="block">{item.exerciseTitle}</strong><span className="text-[11px] text-slate-500">{item.topicName} · {typeNames[item.speakingType]} · #{item.exerciseId}</span></td>
                <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-3 font-bold">{item.overallScore ?? "—"}</td>
                <td className="px-4 py-3">{new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.completedAt || item.startedAt))}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-1">
                  <Link className="inline-flex min-h-[30px] shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border border-[#4f7cf7] bg-[#4f7cf7] px-2 py-1.5 text-[10px] font-extrabold text-white no-underline hover:bg-[#3d68d8]" to={`/admin/speaking/submissions/${item.attemptId}`}><ArrowUpRight size={13} />Xem chi tiết</Link>
                  {item.status === "GRADED" && <Link className="inline-flex min-h-[30px] shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border border-[#d8e2ff] bg-[#f3f6ff] px-2 py-1.5 text-[10px] font-extrabold text-[#315fc5] no-underline hover:bg-[#e8eeff]" to={`/admin/speaking/submissions/${item.attemptId}?edit=true`} aria-label={`Sửa kết quả bài nộp ${item.attemptId}`}><Pencil size={13} />Sửa</Link>}
                  <button type="button" className="inline-flex min-h-[30px] shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border border-[#f1c1c5] bg-white px-2 py-1.5 text-[10px] font-extrabold text-[#a63240] hover:bg-[#fff4f5] disabled:cursor-not-allowed disabled:opacity-55" onClick={() => deleteSubmission(item)} disabled={deletingId === item.attemptId} aria-label={`Xóa bài nộp ${item.attemptId}`}><Trash2 size={13} />{deletingId === item.attemptId ? "Đang xóa..." : "Xóa"}</button>
                </div></td>
              </tr>) : <tr><td className="px-4 py-10 text-center text-slate-500" colSpan="6">Chưa có bài nộp phù hợp bộ lọc.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>{data?.totalCount || 0} lượt làm</span><div className="flex items-center gap-2"><button type="button" className="rounded-lg border bg-white px-3 py-2 disabled:opacity-40" disabled={page <= 1 || loading} onClick={() => { setLoading(true); setPage((value) => value - 1); }}>Trước</button><span>Trang {page} / {pageCount}</span><button type="button" className="rounded-lg border bg-white px-3 py-2 disabled:opacity-40" disabled={page >= pageCount || loading} onClick={() => { setLoading(true); setPage((value) => value + 1); }}>Sau</button></div></div>
    </div>
  );
}
