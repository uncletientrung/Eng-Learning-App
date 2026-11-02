import { useEffect, useState } from "react";
import { ArrowLeft, Pencil, RefreshCw, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteAdminWritingExercise, getAdminWritingExercise, updateAdminWritingStatus } from "../../services/adminApi";
import { getAdminImageSrc } from "../../components/admin/adminUtils";

const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" });
const statusNames = { DRAFT: "Bản nháp", PUBLISHED: "Công khai", HIDDEN: "Đã ẩn" };

export default function AdminWritingExerciseDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [savingStatus, setSavingStatus] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    getAdminWritingExercise(id)
      .then((data) => { if (active) setExercise(data); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, refreshVersion]);

  function retryLoad() {
    setLoading(true);
    setError("");
    setRefreshVersion((version) => version + 1);
  }

  async function changeStatus(event) {
    const status = event.target.value;
    setSavingStatus(true);
    setError("");
    try {
      await updateAdminWritingStatus(id, status);
      setExercise((current) => ({ ...current, status, updatedAt: new Date().toISOString() }));
      setNotice(`Đã cập nhật trạng thái: ${statusNames[status]}.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingStatus(false);
    }
  }

  async function removeExercise() {
    if (!window.confirm(`Xóa đề "${exercise.title}"? Đề đã có bài nộp sẽ không thể xóa.`)) return;
    setError("");
    try {
      await deleteAdminWritingExercise(id);
      navigate("/admin/writing", { replace: true, state: { notice: "Đã xóa đề Writing." } });
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (loading) return <div className="mx-auto w-full max-w-[1440px]"><div className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]" role="status">Đang tải chi tiết đề...</div></div>;
  if (error && !exercise) {
    return <div className="mx-auto w-full max-w-[1440px]"><div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert"><p>{error}</p><button className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" type="button" onClick={retryLoad}><RefreshCw size={14} /> Thử lại</button></div></div>;
  }
  if (!exercise) return <div className="mx-auto w-full max-w-[1440px]"><div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]">Không tìm thấy đề Writing.</div></div>;

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="mb-[22px] flex items-start justify-between gap-4 [&_h2]:m-0 [&_h2]:text-[clamp(20px,2vw,25px)] [&_h2]:font-black [&_h2]:tracking-[-.025em] [&_p]:mt-[5px] [&_p]:mb-0 [&_p]:text-[13px] [&_p]:text-[#6b7080] max-[760px]:mb-4 max-[760px]:items-stretch max-[760px]:flex-col">
        <div><h2>{exercise.title}</h2><p>Đề Writing #{exercise.id} · {exercise.submissionCount} bài nộp</p></div>
        <div className="flex flex-wrap gap-[5px]">
          <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" to="/admin/writing"><ArrowLeft size={15} /> Danh sách</Link>
          <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 !border-[#4f7cf7] !bg-[#4f7cf7] !text-white hover:!border-[#3d68d8] hover:!bg-[#3d68d8]" to={`/admin/writing/edit/${exercise.id}`}><Pencil size={15} /> Chỉnh sửa</Link>
          <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 text-[#d94355]" onClick={removeExercise}><Trash2 size={15} /> Xóa</button>
        </div>
      </div>
      {notice && <div className="mb-[13px] rounded-xl border border-[#b9e8cc] bg-[#effaf3] px-[15px] py-[13px] text-xs text-[#187347]" role="status">{notice}</div>}
      {error && <div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert">{error}</div>}
      <div className="mb-[14px] grid grid-cols-2 gap-[14px] max-[760px]:grid-cols-1">
        <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] p-4 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-sm">
          <h3>Thông tin đề</h3>
          <dl className="m-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-[14px] gap-y-2 text-[11px] max-[760px]:grid-cols-1 max-[760px]:gap-y-[3px] [&_dt]:text-[#6b7080] [&_dd]:m-0 [&_dd]:min-w-0 [&_dd]:[overflow-wrap:anywhere] [&_dd]:font-extrabold">
            <dt>Chủ đề</dt><dd>{exercise.topicName}</dd>
            <dt>Loại bài</dt><dd>{exercise.writingType || "Chưa xác định"}</dd>
            <dt>Trạng thái</dt><dd><span className={`inline-flex min-h-[23px] items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[9px] font-black ${exercise.status === "PUBLISHED" ? "bg-[#e7f7ee] text-[#188452]" : exercise.status === "DRAFT" ? "bg-[#fff3d8] text-[#a76a00]" : "bg-[#fce9eb] text-[#b63a48]"}`}>{statusNames[exercise.status] || exercise.status}</span></dd>
            <dt>Ngày tạo</dt><dd>{dateFormat.format(new Date(exercise.createdAt))}</dd>
            <dt>Cập nhật</dt><dd>{exercise.updatedAt ? dateFormat.format(new Date(exercise.updatedAt)) : "Chưa cập nhật"}</dd>
            <dt>Số lượt làm</dt><dd>{exercise.submissionCount}</dd>
            <dt>Trạng thái hiển thị</dt>
            <dd>
              <select className="min-h-10 w-auto min-w-[125px] rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" value={exercise.status} disabled={savingStatus} onChange={changeStatus} aria-label="Thay đổi trạng thái đề">
                <option value="DRAFT">Bản nháp</option><option value="PUBLISHED">Công khai</option><option value="HIDDEN">Ẩn</option>
              </select>
            </dd>
          </dl>
        </section>
        <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] p-4 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-sm">
          <h3>Nội dung đề</h3>
          {exercise.imageUrl && <img className="my-[10px] block max-h-[280px] max-w-full rounded-xl border border-[#e4e7ed] object-contain" src={getAdminImageSrc(exercise.imageUrl)} alt={`Hình minh họa ${exercise.title}`} />}
          <div className="whitespace-pre-wrap break-words text-xs leading-[1.75] text-[#1b1d22]">{exercise.questionText}</div>
          {exercise.instruction && <div className="mt-[9px] text-[11px] leading-[1.6] [&_strong]:mb-0.5 [&_strong]:block [&_p]:m-0 [&_p]:whitespace-pre-wrap [&_p]:text-[#6b7080]"><strong>Hướng dẫn</strong><p>{exercise.instruction}</p></div>}
        </section>
      </div>
      {exercise.referenceAnswer && (
        <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] p-4 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-sm">
          <h3>Bài tham khảo</h3><div className="whitespace-pre-wrap break-words text-xs leading-[1.75] text-[#1b1d22]">{exercise.referenceAnswer}</div>
        </section>
      )}
      <div className="mt-[14px]">
        <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" to={`/admin/writing/submissions?exerciseId=${exercise.id}`}>Xem bài nộp liên quan</Link>
      </div>
    </div>
  );
}
