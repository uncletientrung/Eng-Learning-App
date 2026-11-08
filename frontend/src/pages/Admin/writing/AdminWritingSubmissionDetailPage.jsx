import { useEffect, useState } from "react";
import { ArrowLeft, Pencil, RefreshCw, Save, Trash2, X } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  deleteAdminWritingSubmission,
  getAdminWritingSubmission,
  updateAdminWritingSubmission,
} from "../../../services/adminApi";
import { getAdminImageSrc } from "../../../components/admin/adminUtils";

const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" });
const criterionNames = {
  TASK_RESPONSE: "Task Response",
  COHERENCE_COHESION: "Coherence and Cohesion",
  LEXICAL_RESOURCE: "Lexical Resource",
  GRAMMAR: "Grammatical Range and Accuracy",
};
const criterionFields = [
  { key: "feedback", label: "Feedback" },
  { key: "strengths", label: "Điểm mạnh" },
  { key: "weaknesses", label: "Điểm cần cải thiện" },
  { key: "suggestions", label: "Gợi ý" },
];

function displayDate(value) {
  return value ? dateFormat.format(new Date(value)) : "Chưa hoàn thành";
}

function makeDraftCriteria(submission) {
  const savedCriteria = new Map(
    (submission.criteria || []).map((criterion) => [criterion.criterionCode, criterion]),
  );
  return Object.keys(criterionNames).map((criterionCode) => {
    const saved = savedCriteria.get(criterionCode);
    return {
      criterionCode,
      score: String(saved?.score ?? 0),
      feedback: saved?.feedback || "",
      strengths: saved?.strengths || "",
      weaknesses: saved?.weaknesses || "",
      suggestions: saved?.suggestions || "",
    };
  });
}

export default function AdminWritingSubmissionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editRequested = searchParams.get("edit") === "true";
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draftCriteria, setDraftCriteria] = useState([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    getAdminWritingSubmission(id)
      .then((data) => {
        if (active) {
          setSubmission(data);
          if (editRequested) {
            setDraftCriteria(makeDraftCriteria(data));
            setEditing(true);
          }
        }
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [editRequested, id, refreshVersion]);

  function retryLoad() {
    setLoading(true);
    setError("");
    setRefreshVersion((version) => version + 1);
  }

  function startEditing() {
    setDraftCriteria(makeDraftCriteria(submission));
    setError("");
    setEditing(true);
  }

  function updateDraftCriterion(criterionCode, field, value) {
    setDraftCriteria((criteria) => criteria.map((criterion) =>
      criterion.criterionCode === criterionCode
        ? { ...criterion, [field]: value }
        : criterion,
    ));
  }

  const draftOverallScore = Math.round(
    (draftCriteria.reduce((total, criterion) => total + Number(criterion.score || 0), 0) /
      Math.max(draftCriteria.length, 1)) * 2,
  ) / 2;

  async function saveGrading(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const updated = await updateAdminWritingSubmission(id, {
        criteria: draftCriteria.map((criterion) => ({
          ...criterion,
          score: Number(criterion.score),
        })),
      });
      setSubmission(updated);
      setEditing(false);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteSubmission() {
    if (!window.confirm(`Xóa bài nộp #${submission.attemptId}? Thao tác này sẽ xóa cả kết quả chấm và không thể hoàn tác.`))
      return;

    setDeleting(true);
    setError("");
    try {
      await deleteAdminWritingSubmission(submission.attemptId);
      navigate("/admin/writing/submissions");
    } catch (requestError) {
      setError(requestError.message);
      setDeleting(false);
    }
  }

  if (loading) return <div className="mx-auto w-full max-w-[1440px]"><div className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]" role="status">Đang tải bài làm...</div></div>;
  if (error && !submission) return <div className="mx-auto w-full max-w-[1440px]"><div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert"><p>{error}</p><button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={retryLoad}><RefreshCw size={14} /> Thử lại</button></div></div>;
  if (!submission) return <div className="mx-auto w-full max-w-[1440px]"><div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]">Không tìm thấy bài nộp.</div></div>;

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="mb-[22px] flex items-start justify-between gap-4 [&_h2]:m-0 [&_h2]:text-[clamp(20px,2vw,25px)] [&_h2]:font-black [&_h2]:tracking-[-.025em] [&_p]:mt-[5px] [&_p]:mb-0 [&_p]:text-[13px] [&_p]:text-[#6b7080] max-[760px]:mb-4 max-[760px]:items-stretch max-[760px]:flex-col">
        <div><h2>Chi tiết bài nộp #{submission.attemptId}</h2><p>{submission.exerciseTitle} · {submission.topicName}</p></div>
        <div className="flex flex-wrap gap-[5px]">
          {!editing && <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7] px-3 py-2 text-[11px] font-extrabold text-white hover:border-[#3d68d8] hover:bg-[#3d68d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={startEditing}><Pencil size={14} /> Sửa kết quả</button>}
          {editing && <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={() => setEditing(false)} disabled={saving}><X size={14} /> Hủy sửa</button>}
          <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#f1c1c5] bg-white px-3 py-2 text-[11px] font-extrabold text-[#a63240] hover:bg-[#fff4f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={deleteSubmission} disabled={deleting || saving}><Trash2 size={14} /> {deleting ? "Đang xóa..." : "Xóa bài nộp"}</button>
          <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" to={`/admin/writing/submissions?userId=${submission.userId}`} >Xem lịch sử học viên</Link>
          <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" to="/admin/writing/submissions"><ArrowLeft size={15} /> Danh sách bài nộp</Link>
        </div>
      </div>
      {error && <div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert">{error}</div>}
      <div className="mb-[14px] grid grid-cols-2 gap-[14px] max-[760px]:grid-cols-1">
        <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] p-4 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-sm">
          <h3>Thông tin học viên</h3>
          <dl className="m-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-[14px] gap-y-2 text-[11px] max-[760px]:grid-cols-1 max-[760px]:gap-y-[3px] [&_dt]:text-[#6b7080] [&_dd]:m-0 [&_dd]:min-w-0 [&_dd]:[overflow-wrap:anywhere] [&_dd]:font-extrabold">
            <dt>Họ tên</dt><dd>{submission.fullName}</dd>
            <dt>Username</dt><dd>{submission.username}</dd>
            <dt>Email</dt><dd>{submission.email}</dd>
            <dt>Trạng thái</dt><dd>{submission.status === "COMPLETED" ? "Đã hoàn thành" : "Đang xử lý"}</dd>
          </dl>
        </section>
        <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] p-4 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-sm">
          <h3>Thông tin bài làm</h3>
          <dl className="m-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-[14px] gap-y-2 text-[11px] max-[760px]:grid-cols-1 max-[760px]:gap-y-[3px] [&_dt]:text-[#6b7080] [&_dd]:m-0 [&_dd]:min-w-0 [&_dd]:[overflow-wrap:anywhere] [&_dd]:font-extrabold">
            <dt>Đề bài</dt><dd>{submission.exerciseTitle}</dd>
            <dt>Chủ đề</dt><dd>{submission.topicName}</dd>
            <dt>Bắt đầu</dt><dd>{displayDate(submission.startedAt)}</dd>
            <dt>Hoàn thành</dt><dd>{displayDate(submission.completedAt)}</dd>
            <dt>Điểm tổng</dt><dd>{Number(submission.overallScore).toFixed(1)} / 9</dd>
          </dl>
        </section>
      </div>
      <section className={`${"min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] p-4 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-sm"} mb-[14px]`}>
        <h3>Đề bài</h3>
        {submission.imageUrl && <img className="my-[10px] block max-h-[280px] max-w-full rounded-xl border border-[#e4e7ed] object-contain" src={getAdminImageSrc(submission.imageUrl)} alt={`Hình minh họa ${submission.exerciseTitle}`} />}
        <div className="whitespace-pre-wrap break-words text-xs leading-[1.75] text-[#1b1d22]">{submission.questionText}</div>
        {submission.instruction && <div className="mt-[9px] text-[11px] leading-[1.6] [&_strong]:mb-0.5 [&_strong]:block [&_p]:m-0 [&_p]:whitespace-pre-wrap [&_p]:text-[#6b7080]"><strong>Hướng dẫn</strong><p>{submission.instruction}</p></div>}
      </section>
      <section className={`${"min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] p-4 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-sm"} mb-[14px]`}>
        <h3>Câu trả lời của học viên</h3>
        <div className="whitespace-pre-wrap break-words text-xs leading-[1.75] text-[#1b1d22]">{submission.userResponse || "Bài làm trống."}</div>
      </section>
      <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]">
        <div className="flex items-start justify-between gap-3 p-[17px_18px] [&_h3]:m-0 [&_h3]:text-[15px] [&_h3]:font-black [&_p]:mt-[3px] [&_p]:mb-0 [&_p]:text-[11px] [&_p]:text-[#6b7080]">
          <div><h3>Kết quả theo tiêu chí</h3><p>{editing ? "Nội dung bài viết và các lỗi gốc của AI được giữ nguyên." : "Điểm tổng được tính lại từ bốn tiêu chí."}</p></div>
        </div>
        {editing ? (
          <form onSubmit={saveGrading}>
            <div className="mx-4 mb-3 rounded-xl bg-[#f1f3f7] px-3 py-2 text-xs font-extrabold text-[#1b1d22]">Điểm tổng sau khi lưu: <span className="text-[#4f7cf7]">{draftOverallScore.toFixed(1)} / 9</span> <span className="font-normal text-[#6b7080]">(tự tính từ bốn tiêu chí)</span></div>
            <div className="grid grid-cols-2 gap-3 px-4 pb-4 max-[760px]:grid-cols-1">
              {draftCriteria.map((criterion) => (
                <article className="rounded-xl border border-[#e4e7ed] p-[14px] [&_h4]:m-0 [&_h4]:text-xs" key={criterion.criterionCode}>
                  <h4>{criterionNames[criterion.criterionCode]}</h4>
                  <label className="mt-3 block text-[11px] font-bold text-[#6b7080]">Điểm (0–9, bước 0,5)
                    <input className="mt-1 min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" type="number" min="0" max="9" step="0.5" required value={criterion.score} onChange={(event) => updateDraftCriterion(criterion.criterionCode, "score", event.target.value)} />
                  </label>
                  {criterionFields.map((field) => (
                    <label className="mt-3 block text-[11px] font-bold text-[#6b7080]" key={field.key}>{field.label}
                      <textarea className="mt-1 min-h-[78px] w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs font-normal leading-[1.6] text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" value={criterion[field.key]} onChange={(event) => updateDraftCriterion(criterion.criterionCode, field.key, event.target.value)} />
                    </label>
                  ))}
                </article>
              ))}
            </div>
            <div className="flex justify-end gap-2 border-t border-[#e4e7ed] px-4 py-3">
              <button type="button" className="inline-flex min-h-[39px] cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={() => setEditing(false)} disabled={saving}>Hủy</button>
              <button type="submit" className="inline-flex min-h-[39px] cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7] px-3 py-2 text-[11px] font-extrabold text-white hover:border-[#3d68d8] hover:bg-[#3d68d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" disabled={saving}><Save size={14} /> {saving ? "Đang lưu..." : "Lưu kết quả"}</button>
            </div>
          </form>
        ) : submission.criteria?.length ? (
          <div className="grid grid-cols-2 gap-3 px-4 pb-4 max-[760px]:grid-cols-1">
            {submission.criteria.map((criterion) => (
              <article className="rounded-xl border border-[#e4e7ed] p-[14px] [&_h4]:m-0 [&_h4]:text-xs" key={criterion.criterionCode}>
                <h4>{criterionNames[criterion.criterionCode] || criterion.criterionCode}</h4>
                <span className="my-[9px] inline-block text-xl font-black text-[#4f7cf7]">{Number(criterion.score).toFixed(1)} / 9</span>
                {criterionFields.map((field) => <div className="mt-[9px] text-[11px] leading-[1.6] [&_strong]:mb-0.5 [&_strong]:block [&_p]:m-0 [&_p]:whitespace-pre-wrap [&_p]:text-[#6b7080]" key={field.key}><strong>{field.label}</strong><p>{criterion[field.key] || "—"}</p></div>)}
                <div className="mt-[9px] text-[11px] leading-[1.6] [&_strong]:mb-0.5 [&_strong]:block [&_p]:m-0 [&_p]:whitespace-pre-wrap [&_p]:text-[#6b7080]">
                  <strong>Issues ({criterion.issues?.length || 0})</strong>
                  {criterion.issues?.length ? criterion.issues.map((issue, index) => (
                    <p key={`${issue.originalText}-${index}`}><b>{issue.category || "Issue"}:</b> “{issue.originalText}” → “{issue.correction}” — {issue.explanation}</p>
                  )) : <p>Không có issue được lưu.</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]"><strong>Chưa có điểm theo tiêu chí</strong>Bài nộp chưa có dữ liệu chấm được lưu.</div>
        )}
      </section>
    </div>
  );
}
