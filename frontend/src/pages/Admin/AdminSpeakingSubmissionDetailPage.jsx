import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Headphones,
  Pencil,
  RefreshCw,
  Save,
  Trash2,
  X,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  deleteAdminSpeakingSubmission,
  getAdminSpeakingAudio,
  getAdminSpeakingSubmission,
  retryAdminSpeakingGrading,
  updateAdminSpeakingSubmission,
} from "../../services/adminApi";

const statusNames = {
  IN_PROGRESS: "Đang làm",
  SUBMITTED: "Đã nộp",
  GRADING: "Đang chấm",
  GRADING_FAILED: "Chấm lỗi",
  GRADED: "Đã chấm",
  ABANDONED: "Đã bỏ",
};
const criterionNames = {
  FLUENCY_COHERENCE: "Fluency & Coherence",
  LEXICAL_RESOURCE: "Lexical Resource",
  GRAMMAR_ACCURACY: "Grammar Accuracy",
  PRONUNCIATION: "Pronunciation",
};
const criterionCodes = Object.keys(criterionNames);
const criterionFields = [
  { key: "feedback", label: "Nhận xét" },
  { key: "strengths", label: "Điểm mạnh" },
  { key: "weaknesses", label: "Cần cải thiện" },
  { key: "suggestions", label: "Gợi ý" },
];
const controlClass =
  "mt-1 min-h-10 w-full rounded-lg border border-[#e4e7ed] bg-white px-3 py-2 text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]";

function makeDraftCriteria(submission) {
  const savedCriteria = new Map(
    (submission.criteria || []).map((criterion) => [
      criterion.criterionCode,
      criterion,
    ]),
  );
  return criterionCodes.map((criterionCode) => {
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

function formatDate(value) {
  return value
    ? new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "—";
}

function AudioAnswer({ answer }) {
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  async function loadAudio() {
    setLoading(true);
    setError("");
    try {
      const blob = await getAdminSpeakingAudio(answer.id);
      setAudioUrl(URL.createObjectURL(blob));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 rounded-xl bg-slate-50 p-3">
      {audioUrl ? (
        <audio
          className="w-full"
          controls
          preload="metadata"
          src={audioUrl}
        >
          Trình duyệt không hỗ trợ phát audio.
        </audio>
      ) : (
        <button
          type="button"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold disabled:opacity-50"
          onClick={loadAudio}
        >
          <Headphones size={15} />
          {loading ? "Đang tải audio..." : "Tải bản ghi nghe"}
        </button>
      )}
      {error && (
        <p className="mb-0 text-xs text-rose-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function AdminSpeakingSubmissionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editRequested = searchParams.get("edit") === "true";
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftCriteria, setDraftCriteria] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    getAdminSpeakingSubmission(id)
      .then((data) => {
        if (!active) return;
        setSubmission(data);
        if (editRequested && data.status === "GRADED") {
          setDraftCriteria(makeDraftCriteria(data));
          setEditing(true);
        } else if (editRequested) {
          setError("Chỉ có thể sửa kết quả khi lượt Speaking đã được chấm xong.");
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [editRequested, id, refresh]);

  const draftOverallScore =
    Math.round(
      (draftCriteria.reduce(
        (total, criterion) => total + Number(criterion.score || 0),
        0,
      ) /
        Math.max(draftCriteria.length, 1)) *
        2,
    ) / 2;

  function startEditing() {
    setDraftCriteria(makeDraftCriteria(submission));
    setError("");
    setEditing(true);
  }

  function updateDraftCriterion(criterionCode, field, value) {
    setDraftCriteria((criteria) =>
      criteria.map((criterion) =>
        criterion.criterionCode === criterionCode
          ? { ...criterion, [field]: value }
          : criterion,
      ),
    );
  }

  function cancelEditing() {
    setEditing(false);
    setSearchParams({}, { replace: true });
  }

  async function saveGrading(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const updated = await updateAdminSpeakingSubmission(id, {
        criteria: draftCriteria.map((criterion) => ({
          ...criterion,
          score: Number(criterion.score),
        })),
      });
      setSubmission(updated);
      setEditing(false);
      setSearchParams({}, { replace: true });
      setNotice("Đã lưu kết quả chấm Speaking.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteSubmission() {
    if (
      !window.confirm(
        `Xóa bài nộp #${submission.attemptId} của ${submission.userName}? Thao tác này sẽ xóa kết quả chấm và file ghi âm, không thể hoàn tác.`,
      )
    ) {
      return;
    }

    setDeleting(true);
    setError("");
    try {
      await deleteAdminSpeakingSubmission(submission.attemptId);
      navigate("/admin/speaking/submissions");
    } catch (requestError) {
      setError(requestError.message);
      setDeleting(false);
    }
  }

  async function retry() {
    if (!window.confirm("Gửi lượt làm này vào hàng chờ chấm lại?")) return;
    setBusy(true);
    setLoading(true);
    setError("");
    setNotice("");
    try {
      await retryAdminSpeakingGrading(id);
      setNotice("Đã gửi yêu cầu chấm lại. Trạng thái sẽ cập nhật khi worker xử lý.");
      setRefresh((value) => value + 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm" role="status">
        Đang tải bài nộp Speaking...
      </p>
    );
  }
  if (error && !submission) {
    return (
      <div
        className="rounded-xl border border-rose-200 bg-white p-4 text-sm text-rose-700"
        role="alert"
      >
        <p>{error}</p>
        <button
          type="button"
          className="rounded-lg border px-3 py-2"
          onClick={() => {
            setLoading(true);
            setError("");
            setRefresh((value) => value + 1);
          }}
        >
          <RefreshCw size={14} /> Thử lại
        </button>
      </div>
    );
  }
  if (!submission) return null;

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs text-slate-500">
            {submission.userEmail} · {submission.topicName} ·{" "}
            {submission.speakingType}
          </p>
          <h2 className="m-0 text-2xl font-black">{submission.userName}</h2>
          <p className="mb-0 mt-1 text-sm text-slate-600">
            {submission.exerciseTitle} · Lượt #{submission.attemptId}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {submission.status === "GRADED" && !editing && (
            <button
              type="button"
              onClick={startEditing}
              className="inline-flex items-center gap-2 rounded-lg bg-[#4f7cf7] px-3 py-2 text-xs font-bold text-white"
            >
              <Pencil size={14} /> Sửa kết quả
            </button>
          )}
          {editing && (
            <button
              type="button"
              disabled={saving}
              onClick={cancelEditing}
              className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold disabled:opacity-50"
            >
              <X size={14} /> Hủy sửa
            </button>
          )}
          {submission.status === "GRADING_FAILED" && (
            <button
              type="button"
              disabled={busy || deleting}
              onClick={retry}
              className="inline-flex items-center gap-2 rounded-lg bg-[#4f7cf7] px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              <RefreshCw size={14} />
              {busy ? "Đang gửi..." : "Chấm lại"}
            </button>
          )}
          <button
            type="button"
            disabled={deleting || saving || busy}
            onClick={deleteSubmission}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-700 disabled:opacity-50"
          >
            <Trash2 size={14} />
            {deleting ? "Đang xóa..." : "Xóa bài nộp"}
          </button>
          <Link
            className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold text-slate-700 no-underline"
            to="/admin/speaking/submissions"
          >
            <ArrowLeft size={15} />
            Danh sách bài nộp
          </Link>
        </div>
      </header>
      {notice && (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
          role="status"
        >
          {notice}
        </p>
      )}
      {error && (
        <p
          className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"
          role="alert"
        >
          {error}
        </p>
      )}
      <section className="mb-4 grid gap-3 rounded-2xl border border-[#e4e7ed] bg-white p-5 sm:grid-cols-4">
        <div>
          <p className="m-0 text-[10px] font-bold uppercase text-slate-500">
            Trạng thái
          </p>
          <p className="mb-0 mt-1 font-black">
            {statusNames[submission.status] || submission.status}
          </p>
        </div>
        <div>
          <p className="m-0 text-[10px] font-bold uppercase text-slate-500">
            Điểm tổng
          </p>
          <p className="mb-0 mt-1 text-xl font-black">
            {submission.overallScore ?? "—"}
            <span className="text-sm text-slate-500"> / 9</span>
          </p>
        </div>
        <div>
          <p className="m-0 text-[10px] font-bold uppercase text-slate-500">
            Bắt đầu
          </p>
          <p className="mb-0 mt-1 text-sm">{formatDate(submission.startedAt)}</p>
        </div>
        <div>
          <p className="m-0 text-[10px] font-bold uppercase text-slate-500">
            Hoàn thành
          </p>
          <p className="mb-0 mt-1 text-sm">{formatDate(submission.completedAt)}</p>
        </div>
      </section>
      {submission.overallFeedback && (
        <section className="mb-4 rounded-2xl border border-[#e4e7ed] bg-white p-5">
          <h3 className="mt-0 font-black">Nhận xét tổng quan</h3>
          <p className="mb-0 whitespace-pre-wrap text-sm leading-6">
            {submission.overallFeedback}
          </p>
        </section>
      )}
      <h3 className="mb-3 text-lg font-black">Câu trả lời</h3>
      <div className="grid gap-3">
        {submission.answers.map((answer) => (
          <article
            key={answer.id}
            className="rounded-2xl border border-[#e4e7ed] bg-white p-5"
          >
            <h4 className="m-0 text-sm font-black">
              Câu {answer.questionNumber}
            </h4>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
              {answer.questionText}
            </p>
            <div className="rounded-xl bg-[#f7f8fa] p-3">
              <p className="mb-1 mt-0 text-[10px] font-bold uppercase text-slate-500">
                Transcript
              </p>
              <p className="mb-0 whitespace-pre-wrap text-sm">
                {answer.transcript || "Không có transcript."}
              </p>
            </div>
            {answer.answerFeedback && (
              <p className="mb-0 mt-3 text-sm">
                <strong>Nhận xét câu trả lời:</strong> {answer.answerFeedback}
              </p>
            )}
            <AudioAnswer answer={answer} />
          </article>
        ))}
      </div>
      <h3 className="mb-3 mt-6 text-lg font-black">Điểm theo tiêu chí</h3>
      {editing ? (
        <form onSubmit={saveGrading}>
          <div className="grid gap-3 md:grid-cols-2">
            {draftCriteria.map((criterion) => (
              <article
                className="rounded-2xl border border-[#e4e7ed] bg-white p-5"
                key={criterion.criterionCode}
              >
                <header className="mb-3 flex items-start justify-between gap-3">
                  <h4 className="m-0 text-sm font-black">
                    {criterionNames[criterion.criterionCode]}
                  </h4>
                  <label className="w-24 text-[10px] font-bold text-slate-500">
                    Điểm / 9
                    <input
                      className={controlClass}
                      type="number"
                      min="0"
                      max="9"
                      step="0.5"
                      required
                      value={criterion.score}
                      onChange={(event) =>
                        updateDraftCriterion(
                          criterion.criterionCode,
                          "score",
                          event.target.value,
                        )
                      }
                    />
                  </label>
                </header>
                {criterionFields.map((field) => (
                  <label
                    className="mb-3 block text-[10px] font-bold text-slate-500"
                    key={field.key}
                  >
                    {field.label}
                    <textarea
                      className={controlClass}
                      rows="3"
                      value={criterion[field.key]}
                      onChange={(event) =>
                        updateDraftCriterion(
                          criterion.criterionCode,
                          field.key,
                          event.target.value,
                        )
                      }
                    />
                  </label>
                ))}
                {criterion.issues?.length > 0 && (
                  <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
                    {criterion.issues.map((issue, index) => (
                      <li key={`${issue.originalText}-${index}`}>
                        <strong>{issue.originalText}</strong>
                        {issue.correction && <> → {issue.correction}</>}
                        {issue.explanation && <> — {issue.explanation}</>}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4">
            <p className="m-0 text-sm font-bold">
              Điểm tổng sau khi lưu:{" "}
              <span className="text-[#4f7cf7]">
                {draftOverallScore.toFixed(1)} / 9
              </span>{" "}
              <span className="font-normal text-slate-500">
                (tự tính từ bốn tiêu chí)
              </span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={cancelEditing}
                className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving || draftCriteria.some(
                  (criterion) =>
                    criterion.score === "" ||
                    Number(criterion.score) < 0 ||
                    Number(criterion.score) > 9 ||
                    Number(criterion.score) * 2 % 1 !== 0,
                )}
                className="inline-flex items-center gap-2 rounded-lg bg-[#4f7cf7] px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? "Đang lưu..." : "Lưu kết quả"}
              </button>
            </div>
          </div>
        </form>
      ) : submission.criteria.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {submission.criteria.map((criterion) => (
            <article
              className="rounded-2xl border border-[#e4e7ed] bg-white p-5"
              key={criterion.criterionCode}
            >
              <header className="mb-3 flex items-start justify-between gap-3">
                <h4 className="m-0 text-sm font-black">
                  {criterionNames[criterion.criterionCode] ||
                    criterion.criterionCode}
                </h4>
                <span className="text-lg font-black">
                  {criterion.score}
                  <span className="text-xs text-slate-500"> / 9</span>
                </span>
              </header>
              {criterion.feedback && (
                <p className="text-sm leading-6">{criterion.feedback}</p>
              )}
              {criterion.strengths && (
                <p className="text-sm">
                  <strong>Điểm mạnh:</strong> {criterion.strengths}
                </p>
              )}
              {criterion.weaknesses && (
                <p className="text-sm">
                  <strong>Cần cải thiện:</strong> {criterion.weaknesses}
                </p>
              )}
              {criterion.suggestions && (
                <p className="text-sm">
                  <strong>Gợi ý:</strong> {criterion.suggestions}
                </p>
              )}
              {criterion.issues?.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
                  {criterion.issues.map((issue, index) => (
                    <li key={`${issue.originalText}-${index}`}>
                      <strong>{issue.originalText}</strong>
                      {issue.correction && <> → {issue.correction}</>}
                      {issue.explanation && <> — {issue.explanation}</>}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed bg-white p-5 text-sm text-slate-500">
          Chưa có kết quả theo tiêu chí.
        </p>
      )}
    </div>
  );
}
