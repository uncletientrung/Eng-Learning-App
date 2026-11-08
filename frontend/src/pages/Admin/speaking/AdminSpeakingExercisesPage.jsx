import { useEffect, useState } from "react";
import { Eye, Mic, Plus, RefreshCw, Search, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteAdminSpeakingExercise, getAdminSpeakingExercises, updateAdminSpeakingExerciseStatus } from "../../../services/adminApi";
import { getTopicByModule } from "../../../services/topicAPI";

const typeNames = {
  INTRODUCTION_INTERVIEW: "Part 1",
  TOPIC: "Part 2",
  TOPIC_DISCUSS: "Part 3",
};

export default function AdminSpeakingExercisesPage() {
  const [data, setData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [topicId, setTopicId] = useState("");
  const [speakingType, setSpeakingType] = useState("");
  const [isActive, setIsActive] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    getAdminSpeakingExercises({
      page,
      pageSize: 10,
      search,
      topicId,
      speakingType,
      isActive,
    })
      .then((result) => { if (active) setData(result); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, search, topicId, speakingType, isActive, refreshVersion]);

  useEffect(() => {
    let active = true;
    getTopicByModule("SPEAKING")
      .then((result) => { if (active) setTopics(Array.isArray(result) ? result : []); })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, []);

  async function toggleActive(exercise) {
    setBusyId(exercise.id);
    setLoading(true);
    setError("");
    setNotice("");
    try {
      await updateAdminSpeakingExerciseStatus(exercise.id, !exercise.isActive);
      setNotice(`Đã ${exercise.isActive ? "ngừng hoạt động" : "kích hoạt"} đề Speaking.`);
      setRefreshVersion((version) => version + 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId(null);
      setLoading(false);
    }
  }

  async function removeExercise(exercise) {
    if (!window.confirm(`Xóa đề "${exercise.title}"? Đề đã có bài làm sẽ không thể xóa.`)) return;
    setBusyId(exercise.id);
    setLoading(true);
    setError("");
    setNotice("");
    try {
      await deleteAdminSpeakingExercise(exercise.id);
      setNotice("Đã xóa đề Speaking.");
      if (page > 1 && data?.items.length === 1) {
        setPage((current) => current - 1);
      } else {
        setRefreshVersion((version) => version + 1);
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId(null);
      setLoading(false);
    }
  }

  const pageSize = data?.pageSize || 10;
  const pageCount = Math.max(1, Math.ceil((data?.totalCount || 0) / pageSize));
  const controlClass = "min-h-10 rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]";

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div><h2 className="m-0 text-2xl font-black">Quản lý đề Speaking</h2><p className="mb-0 mt-1 text-[13px] text-[#6b7080]">Tạo đề, quản lý câu hỏi và trạng thái hoạt động.</p></div>
        <Link to="/admin/speaking/create" className="inline-flex min-h-10 items-center gap-2 rounded-[10px] bg-[#4f7cf7] px-4 text-xs font-extrabold text-white no-underline hover:bg-[#3d68d8]"><Plus size={16} />Thêm đề Speaking</Link>
      </header>
      {notice && <p className="rounded-xl border border-[#b9e8cc] bg-[#effaf3] px-4 py-3 text-xs text-[#187347]" role="status">{notice}</p>}
      {error && <div className="mb-3 rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-4 py-3 text-xs text-[#a63240]" role="alert"><p className="mt-0">{error}</p><button type="button" className="inline-flex items-center gap-2 rounded-lg border border-[#e4e7ed] bg-white px-3 py-2 font-bold" onClick={() => setRefreshVersion((version) => version + 1)}><RefreshCw size={14} />Thử lại</button></div>}
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="relative min-w-[220px] flex-1"><Search className="absolute left-3 top-3 text-[#6b7080]" size={15} /><input className={`${controlClass} w-full pl-9`} aria-label="Tìm đề hoặc chủ đề" placeholder="Tìm đề hoặc chủ đề..." value={search} onChange={(event) => { setLoading(true); setError(""); setPage(1); setSearch(event.target.value); }} /></label>
        <select className={controlClass} aria-label="Lọc chủ đề" value={topicId} onChange={(event) => { setLoading(true); setError(""); setPage(1); setTopicId(event.target.value); }}><option value="">Tất cả chủ đề</option>{topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.name}</option>)}</select>
        <select className={controlClass} aria-label="Lọc Part" value={speakingType} onChange={(event) => { setLoading(true); setError(""); setPage(1); setSpeakingType(event.target.value); }}><option value="">Tất cả Part</option>{Object.entries(typeNames).map(([value, name]) => <option key={value} value={value}>{name}</option>)}</select>
        <select className={controlClass} aria-label="Lọc trạng thái" value={isActive} onChange={(event) => { setLoading(true); setError(""); setPage(1); setIsActive(event.target.value); }}><option value="">Mọi trạng thái</option><option value="true">Đang hoạt động</option><option value="false">Đã ẩn</option></select>
      </div>
      <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]">
        {loading ? (
          <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080]" role="status">Đang tải đề Speaking...</div>
        ) : data?.items?.length ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-xs [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-[#e4e7ed] [&_th]:bg-[#f1f3f7] [&_th]:px-[14px] [&_th]:py-[11px] [&_th]:text-[10px] [&_th]:font-black [&_th]:tracking-[.04em] [&_th]:text-[#6b7080] [&_th:first-child]:rounded-tl-[10px] [&_th:last-child]:rounded-tr-[10px] [&_td]:border-b [&_td]:border-[#e4e7ed] [&_td]:px-[14px] [&_td]:py-3 [&_td]:align-middle [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:hover]:bg-[#f7f8fb]">
                <thead><tr><th>STT</th><th>ID</th><th>Tiêu đề</th><th>Chủ đề</th><th>Part</th><th>Câu hỏi</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                <tbody>
                  {data.items.map((exercise, index) => (
                  <tr key={exercise.id}>
                    <td>{(page - 1) * pageSize + index + 1}</td>
                    <td>#{exercise.id}</td>
                    <td><Link className="block max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-extrabold text-[#355fc8] no-underline hover:underline" to={`/admin/speaking/${exercise.id}`}>{exercise.title}</Link><span className="mt-0.5 block text-[10px] text-[#6b7080]">{exercise.submissionCount} bài nộp</span></td>
                    <td>{exercise.topicName}</td>
                    <td>{typeNames[exercise.speakingType] || exercise.speakingType}</td>
                    <td>{exercise.questionCount}</td>
                    <td><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${exercise.isActive ? "bg-[#e7f7ee] text-[#188452]" : "bg-[#fce9eb] text-[#b63a48]"}`}>{exercise.isActive ? "Hoạt động" : "Đã ẩn"}</span></td>
                    <td>
                    <div className="flex items-center gap-1">
                      <Link className="inline-flex min-h-[30px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[8px] border border-[#4f7cf7] bg-[#4f7cf7] px-2 py-[5px] text-[10px] font-extrabold text-white no-underline hover:border-[#3d68d8] hover:bg-[#3d68d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" to={`/admin/speaking/${exercise.id}`}><Eye size={13} />Chi tiết</Link>
                      <Link className={`inline-flex min-h-[30px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[8px] border border-[#d8e2ff] bg-[#f3f6ff] px-2 py-[5px] text-[10px] font-extrabold text-[#315fc5] no-underline hover:bg-[#e8eeff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] ${exercise.submissionCount ? "pointer-events-none opacity-55" : ""}`} aria-disabled={exercise.submissionCount > 0} title={exercise.submissionCount ? "Đề có bài làm nên không thể sửa để bảo toàn lịch sử." : "Chỉnh sửa đề"} to={`/admin/speaking/edit/${exercise.id}`}><Mic size={13} />Sửa</Link>
                      <button type="button" disabled={busyId === exercise.id} onClick={() => toggleActive(exercise)} className="inline-flex min-h-[30px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[8px] border border-[#e4e7ed] bg-white px-2 py-[5px] text-[10px] font-extrabold text-[#1b1d22] hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55">{exercise.isActive ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}{exercise.isActive ? "Ẩn" : "Hiện"}</button>
                      <button type="button" className="inline-flex min-h-[30px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[8px] border border-[#f1c1c5] bg-white px-2 py-[5px] text-[10px] font-extrabold text-[#a63240] hover:bg-[#fff4f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" disabled={busyId === exercise.id || exercise.submissionCount > 0} title={exercise.submissionCount ? "Không thể xóa đề đã có bài làm" : undefined} onClick={() => removeExercise(exercise)}><Trash2 size={13} /> Xóa</button>
                    </div></td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-table-pagination flex items-center justify-between gap-3 rounded-b-2xl px-4 py-3 text-xs text-[#6b7080]">
              <span>{data.totalCount} đề</span>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-lg border border-[#e4e7ed] bg-white px-3 py-2 disabled:opacity-40" disabled={page <= 1} onClick={() => { setLoading(true); setPage((value) => value - 1); }}>Trước</button>
                <span>Trang {page} / {pageCount}</span>
                <button type="button" className="rounded-lg border border-[#e4e7ed] bg-white px-3 py-2 disabled:opacity-40" disabled={page >= pageCount} onClick={() => { setLoading(true); setPage((value) => value + 1); }}>Sau</button>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080]"><strong className="mb-1 block text-[#1b1d22]">Không tìm thấy đề Speaking</strong>Thử đổi bộ lọc hoặc tạo đề mới.</div>
        )}
      </section>
    </div>
  );
}
