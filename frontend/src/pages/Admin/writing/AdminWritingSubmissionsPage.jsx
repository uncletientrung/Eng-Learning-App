import { useEffect, useState } from "react";
import { ArrowUpRight, Pencil, RefreshCw, Search, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  deleteAdminWritingSubmission,
  getAdminWritingSubmissions,
} from "../../../services/adminApi";

const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" });

function StatusBadge({ status }) {
  return <span className={`inline-flex min-h-[23px] items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[9px] font-black ${status === "COMPLETED" ? "bg-[#e7f7ee] text-[#188452]" : "bg-[#fff3d8] text-[#a76a00]"}`}>{status === "COMPLETED" ? "Đã hoàn thành" : "Đang xử lý"}</span>;
}

export default function AdminWritingSubmissionsPage() {
  const [searchParams] = useSearchParams();
  const exerciseId = searchParams.get("exerciseId") || "";
  const userId = searchParams.get("userId") || "";
  const [pageData, setPageData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [minimumScore, setMinimumScore] = useState("");
  const [maximumScore, setMaximumScore] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearchTerm(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;
    getAdminWritingSubmissions({
        page,
        pageSize: 10,
        search: searchTerm,
        status,
        minimumScore,
        maximumScore,
        from,
        to,
        exerciseId,
        userId,
      })
      .then((data) => { if (active) setPageData(data); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, searchTerm, status, minimumScore, maximumScore, from, to, exerciseId, userId, refreshVersion]);

  const changeFilter = (setter, value) => {
    setLoading(true);
    setError("");
    setter(value);
    setPage(1);
  };
  const refresh = () => {
    setLoading(true);
    setError("");
    setRefreshVersion((version) => version + 1);
  };
  const deleteSubmission = async (item) => {
    if (!window.confirm(`Xóa bài nộp #${item.attemptId} của ${item.fullName}? Thao tác này sẽ xóa cả kết quả chấm và không thể hoàn tác.`))
      return;

    setDeletingId(item.attemptId);
    setError("");
    try {
      await deleteAdminWritingSubmission(item.attemptId);
      setLoading(true);
      if (pageData?.items.length === 1 && page > 1)
        setPage((currentPage) => currentPage - 1);
      setRefreshVersion((version) => version + 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId(null);
    }
  };
  const pageCount = Math.max(1, Math.ceil((pageData?.totalCount || 0) / (pageData?.pageSize || 10)));

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="mb-[22px] flex items-start justify-between gap-4 [&_h2]:m-0 [&_h2]:text-[clamp(20px,2vw,25px)] [&_h2]:font-black [&_h2]:tracking-[-.025em] [&_p]:mt-[5px] [&_p]:mb-0 [&_p]:text-[13px] [&_p]:text-[#6b7080] max-[760px]:mb-4 max-[760px]:items-stretch max-[760px]:flex-col">
        <div><h2>Bài làm của học viên</h2><p>Theo dõi nội dung bài viết và kết quả chấm theo tiêu chí.</p></div>
        <div className="flex flex-wrap gap-[5px]">
          {exerciseId && <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" to={`/admin/writing/${exerciseId}`}>Quay lại đề #{exerciseId}</Link>}
          {userId && <span className="inline-flex min-h-[23px] items-center whitespace-nowrap rounded-full bg-[#edf0f5] px-2 py-[3px] text-[9px] font-black text-[#5b6270]">Lịch sử học viên #{userId}</span>}
        </div>
      </div>
      {error && <div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert"><p>{error}</p><button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={refresh}><RefreshCw size={14} /> Thử lại</button></div>}
      <div className="mb-[14px] grid grid-cols-[minmax(170px,1.8fr)_minmax(125px,1.2fr)_minmax(82px,.7fr)_minmax(82px,.7fr)_minmax(125px,1fr)_minmax(125px,1fr)_auto] items-center gap-2 max-[1100px]:grid-cols-4 max-[760px]:grid-cols-2">
        <label className="relative min-w-0 [&_svg]:absolute [&_svg]:left-3 [&_svg]:top-1/2 [&_svg]:-translate-y-1/2 [&_svg]:text-[#6b7080] [&_input]:pl-[37px] max-[1100px]:col-span-2 max-[760px]:col-span-2"><Search size={16} /><input className="min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" value={search} onChange={(event) => changeFilter(setSearch, event.target.value)} placeholder="Tên học viên hoặc đề bài..." aria-label="Tìm học viên hoặc đề bài" /></label>
        <select className="min-h-10 min-w-0 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" value={status} onChange={(event) => changeFilter(setStatus, event.target.value)} aria-label="Lọc trạng thái">
          <option value="">Mọi trạng thái</option><option value="COMPLETED">Đã hoàn thành</option><option value="PENDING">Đang xử lý</option>
        </select>
        <input className="min-h-10 min-w-0 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" type="number" min="0" max="9" step="0.5" value={minimumScore} onChange={(event) => changeFilter(setMinimumScore, event.target.value)} placeholder="Điểm từ" aria-label="Điểm từ" />
        <input className="min-h-10 min-w-0 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" type="number" min="0" max="9" step="0.5" value={maximumScore} onChange={(event) => changeFilter(setMaximumScore, event.target.value)} placeholder="Điểm đến" aria-label="Điểm đến" />
        <input className="min-h-10 min-w-0 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" type="date" value={from} onChange={(event) => changeFilter(setFrom, event.target.value)} aria-label="Từ ngày" />
        <input className="min-h-10 min-w-0 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" type="date" value={to} onChange={(event) => changeFilter(setTo, event.target.value)} aria-label="Đến ngày" />
        <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 max-[760px]:col-span-2 max-[760px]:w-full" onClick={refresh}><RefreshCw size={14} /> Làm mới</button>
      </div>
      <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]">
        {loading ? <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]" role="status">Đang tải bài nộp...</div> : pageData?.items?.length ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-[#e4e7ed] [&_th]:bg-[#f1f3f7] [&_th]:px-[14px] [&_th]:py-[11px] [&_th]:text-[10px] [&_th]:font-black [&_th]:tracking-[.04em] [&_th]:text-[#6b7080] [&_th:first-child]:rounded-tl-[10px] [&_th:last-child]:rounded-tr-[10px] [&_td]:border-b [&_td]:border-[#e4e7ed] [&_td]:px-[14px] [&_td]:py-3 [&_td]:align-middle [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:hover]:bg-[#f7f8fb]">
                <thead><tr><th>STT</th><th>Học viên</th><th>Đề bài</th><th>Điểm</th><th>Trạng thái</th><th>Thời gian nộp</th><th>Thao tác</th></tr></thead>
                <tbody>
                  {pageData.items.map((item, index) => (
                    <tr key={item.attemptId}>
                      <td>{(page - 1) * 10 + index + 1}</td>
                      <td><span className="block max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap font-extrabold text-[#1b1d22]">{item.fullName}</span><span className="mt-0.5 block text-[10px] text-[#6b7080]">{item.username} · {item.email}</span></td>
                      <td><span className="block max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap font-extrabold text-[#1b1d22]">{item.exerciseTitle}</span><span className="mt-0.5 block text-[10px] text-[#6b7080]">{item.topicName}</span></td>
                      <td><strong>{Number(item.overallScore).toFixed(1)}</strong></td>
                      <td><StatusBadge status={item.status} /></td>
                      <td>{dateFormat.format(new Date(item.completedAt || item.startedAt))}</td>
                      <td><div className="flex items-center gap-1">
                        <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 !border-[#4f7cf7] !bg-[#4f7cf7] !text-white hover:!border-[#3d68d8] hover:!bg-[#3d68d8] min-h-[30px] px-2 py-[5px] text-[10px] min-w-[104px] whitespace-nowrap shadow-[0_3px_8px_#315fc52e] hover:translate-y-[-1px] hover:shadow-[0_5px_12px_#315fc545]" to={`/admin/writing/submissions/${item.attemptId}`}>Xem chi tiết <ArrowUpRight size={14} /></Link>
                        <Link className="inline-flex min-h-[30px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[8px] border border-[#d8e2ff] bg-[#f3f6ff] px-2 py-[5px] text-[10px] font-extrabold text-[#315fc5] no-underline hover:bg-[#e8eeff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" to={`/admin/writing/submissions/${item.attemptId}?edit=true`} aria-label={`Sửa kết quả bài nộp ${item.attemptId}`}><Pencil size={13} /> Sửa</Link>
                        <button type="button" className="inline-flex min-h-[30px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[8px] border border-[#f1c1c5] bg-white px-2 py-[5px] text-[10px] font-extrabold text-[#a63240] hover:bg-[#fff4f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={() => deleteSubmission(item)} disabled={deletingId === item.attemptId} aria-label={`Xóa bài nộp ${item.attemptId}`}><Trash2 size={13} />{deletingId === item.attemptId ? "Đang xóa..." : "Xóa"}</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-table-pagination flex items-center justify-between gap-3 rounded-b-2xl px-4 py-3 text-xs text-[#6b7080] max-[500px]:items-start max-[500px]:flex-col">
              <span>{pageData.totalCount} bài nộp</span>
              <div className="flex items-center gap-[6px]">
                <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 min-h-[30px] px-2 py-[5px] text-[10px]" disabled={page <= 1 || loading} onClick={() => { setLoading(true); setPage((value) => value - 1); }}>Trước</button>
                <span>Trang {page} / {pageCount}</span>
                <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 min-h-[30px] px-2 py-[5px] text-[10px]" disabled={page >= pageCount || loading} onClick={() => { setLoading(true); setPage((value) => value + 1); }}>Sau</button>
              </div>
            </div>
          </>
        ) : <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]"><strong>Chưa có bài nộp phù hợp</strong>Hãy thử thay đổi điều kiện tìm kiếm hoặc bộ lọc.</div>}
      </section>
    </div>
  );
}
