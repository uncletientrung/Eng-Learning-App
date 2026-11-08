import { useEffect, useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getAdminSpeakingExercise } from "../../../services/adminApi";

const typeNames = { INTRODUCTION_INTERVIEW: "Part 1", TOPIC: "Part 2", TOPIC_DISCUSS: "Part 3" };

export default function AdminSpeakingExerciseDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    getAdminSpeakingExercise(id)
      .then((data) => { if (active) setExercise(data); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <p className="rounded-xl bg-white p-8 text-center text-sm" role="status">Đang tải chi tiết đề...</p>;
  if (error || !exercise) return <p className="rounded-xl border border-rose-200 bg-white p-4 text-sm text-rose-700" role="alert">{error || "Không tìm thấy đề Speaking."}</p>;
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {location.state?.notice && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{location.state.notice}</p>}
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><div className="mb-2 flex gap-2 text-xs text-slate-500"><span>{exercise.topicName}</span><span>·</span><span>{typeNames[exercise.speakingType]}</span></div><h2 className="m-0 text-2xl font-black">{exercise.title}</h2><p className="text-sm text-slate-500">{exercise.questionCount} câu hỏi · {exercise.submissionCount} lượt làm · {exercise.isActive ? "Đang hoạt động" : "Đã ẩn"}</p></div><div className="flex gap-2"><Link className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold text-slate-700 no-underline" to="/admin/speaking"><ArrowLeft size={15} />Danh sách</Link>{!exercise.submissionCount && <Link className="inline-flex items-center gap-2 rounded-lg bg-[#4f7cf7] px-3 py-2 text-xs font-bold text-white no-underline" to={`/admin/speaking/edit/${exercise.id}`}><Pencil size={14} />Sửa đề</Link>}<Link className="rounded-lg border px-3 py-2 text-xs font-bold text-slate-700 no-underline" to={`/admin/speaking/submissions?exerciseId=${exercise.id}`}>Xem bài nộp</Link></div></header>
      {exercise.submissionCount > 0 && <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Nội dung đề đã khóa vì có học viên làm bài, nhằm giữ nguyên ngữ cảnh chấm lịch sử.</p>}
      <div className="grid gap-4">{exercise.questions.map((question) => <article key={question.id} className="rounded-2xl border border-[#e4e7ed] bg-white p-5"><h3 className="mb-3 mt-0 text-base font-black">Câu {question.questionNumber}</h3><p className="whitespace-pre-wrap text-sm leading-6">{question.questionText}</p>{question.cues?.length > 0 && <><p className="mb-1 font-bold">You should say:</p><ul className="list-disc space-y-1 pl-5 text-sm">{question.cues.map((cue) => <li key={cue}>{cue}</li>)}</ul></>}{question.closing && <p>{question.closing}</p>}<p className="mb-0 mt-4 text-xs text-slate-500">Chuẩn bị: {question.preparationTime ?? "—"} giây · Trả lời: {question.responseTime ?? "—"} giây</p></article>)}</div>
    </div>
  );
}
