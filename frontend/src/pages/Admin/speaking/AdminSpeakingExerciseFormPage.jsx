import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createAdminSpeakingExercise, getAdminSpeakingExercise, updateAdminSpeakingExercise } from "../../../services/adminApi";
import { getTopicByModule } from "../../../services/topicAPI";

const emptyQuestion = (questionNumber = 1) => ({
  questionNumber,
  questionText: "",
  cuesText: "",
  closing: "",
  preparationTime: "",
  responseTime: "",
});
const typeNames = {
  INTRODUCTION_INTERVIEW: "Part 1 — Introduction & Interview",
  TOPIC: "Part 2 — Cue card",
  TOPIC_DISCUSS: "Part 3 — Topic Discussion",
};
const inputClass = "min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-sm text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:bg-slate-100";

export default function AdminSpeakingExerciseFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [topics, setTopics] = useState([]);
  const [exercise, setExercise] = useState(null);
  const [form, setForm] = useState({ topicId: "", title: "", speakingType: "INTRODUCTION_INTERVIEW", questions: [emptyQuestion()] });
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [topicData, current] = await Promise.all([
          getTopicByModule("SPEAKING"),
          editing ? getAdminSpeakingExercise(id) : Promise.resolve(null),
        ]);
        if (!active) return;
        setTopics(Array.isArray(topicData) ? topicData : []);
        setExercise(current);
        if (current) {
          setForm({
            topicId: String(current.topicId),
            title: current.title,
            speakingType: current.speakingType,
            questions: current.questions.map((question) => ({
              questionNumber: question.questionNumber,
              questionText: question.questionText,
              cuesText: (question.cues || []).join("\n"),
              closing: question.closing || "",
              preparationTime: question.preparationTime ?? "",
              responseTime: question.responseTime ?? "",
            })),
          });
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [editing, id, refresh]);

  const locked = Boolean(exercise?.submissionCount);
  function updateQuestion(index, field, value) {
    setForm((current) => ({
      ...current,
      questions: current.questions.map((question, itemIndex) =>
        itemIndex === index ? { ...question, [field]: value } : question),
    }));
  }
  function moveQuestion(index, offset) {
    const target = index + offset;
    if (target < 0 || target >= form.questions.length) return;
    setForm((current) => {
      const questions = [...current.questions];
      [questions[index], questions[target]] = [questions[target], questions[index]];
      return { ...current, questions: questions.map((question, itemIndex) => ({ ...question, questionNumber: itemIndex + 1 })) };
    });
  }
  function addQuestion() {
    setForm((current) => ({ ...current, questions: [...current.questions, emptyQuestion(current.questions.length + 1)] }));
  }
  function removeQuestion(index) {
    setForm((current) => ({ ...current, questions: current.questions.filter((_, itemIndex) => itemIndex !== index).map((question, itemIndex) => ({ ...question, questionNumber: itemIndex + 1 })) }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (locked) return;
    if (!form.topicId || !form.title.trim() || !form.questions.length || form.questions.some((question) => !question.questionText.trim())) {
      setError("Hãy chọn chủ đề, nhập tiêu đề và nội dung cho tất cả câu hỏi.");
      return;
    }
    if (form.speakingType === "TOPIC" && form.questions.length !== 1) {
      setError("Đề Part 2 chỉ có một cue card.");
      return;
    }
    const payload = {
      topicId: Number(form.topicId),
      title: form.title.trim(),
      speakingType: form.speakingType,
      questions: form.questions.map((question, index) => ({
        questionNumber: index + 1,
        questionText: question.questionText.trim(),
        cues: question.cuesText.split("\n").map((cue) => cue.trim()).filter(Boolean),
        closing: question.closing.trim() || null,
        preparationTime: question.preparationTime === "" ? null : Number(question.preparationTime),
        responseTime: question.responseTime === "" ? null : Number(question.responseTime),
      })),
    };
    setSaving(true);
    try {
      const saved = editing
        ? await updateAdminSpeakingExercise(id, payload)
        : await createAdminSpeakingExercise(payload);
      navigate(`/admin/speaking/${saved.id}`, { replace: true, state: { notice: editing ? "Đã cập nhật đề Speaking." : "Đã tạo đề Speaking." } });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="rounded-xl bg-white p-8 text-center text-sm text-slate-600" role="status">Đang tải đề Speaking...</p>;
  if (editing && error && !exercise) return <section className="rounded-xl border border-rose-200 bg-white p-5 text-sm text-rose-700" role="alert"><p>{error}</p><button type="button" className="rounded-lg border px-3 py-2" onClick={() => setRefresh((value) => value + 1)}><RefreshCw size={14} /> Thử lại</button></section>;
  const disabled = locked || saving;

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h2 className="m-0 text-2xl font-black">{editing ? "Chỉnh sửa đề Speaking" : "Tạo đề Speaking"}</h2><p className="mb-0 mt-1 text-sm text-slate-500">Thiết lập đề và từng câu hỏi theo cấu trúc Speaking.</p></div><Link className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold text-slate-700 no-underline" to="/admin/speaking"><ArrowLeft size={15} />Danh sách đề</Link></header>
      {locked && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="status">Đề này đã có {exercise.submissionCount} lượt làm. Nội dung bị khóa để bảo toàn lịch sử học viên; chỉ có thể đổi trạng thái hoạt động ở danh sách đề.</div>}
      {error && <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700" role="alert">{error}</p>}
      <form className="grid gap-4" onSubmit={submit}>
        <section className="grid gap-4 rounded-2xl border border-[#e4e7ed] bg-white p-5 sm:grid-cols-2">
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">Chủ đề<select className={inputClass} disabled={disabled} value={form.topicId} onChange={(event) => setForm((current) => ({ ...current, topicId: event.target.value }))}><option value="">Chọn chủ đề Speaking</option>{topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.name}</option>)}</select></label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">Part<select className={inputClass} disabled={disabled} value={form.speakingType} onChange={(event) => setForm((current) => ({ ...current, speakingType: event.target.value, questions: event.target.value === "TOPIC" ? current.questions.slice(0, 1) : current.questions }))}>{Object.entries(typeNames).map(([value, name]) => <option value={value} key={value}>{name}</option>)}</select></label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700 sm:col-span-2">Tiêu đề<input className={inputClass} disabled={disabled} maxLength={255} value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} /></label>
        </section>
        {form.questions.map((question, index) => (
          <section className="grid gap-4 rounded-2xl border border-[#e4e7ed] bg-white p-5" key={index}>
            <header className="flex items-center justify-between gap-2"><h3 className="m-0 text-base font-black">Câu hỏi {index + 1}</h3><div className="flex gap-1"><button type="button" aria-label="Chuyển câu hỏi lên" disabled={disabled || index === 0} className="rounded-lg border p-2 disabled:opacity-40" onClick={() => moveQuestion(index, -1)}><ArrowUp size={15} /></button><button type="button" aria-label="Chuyển câu hỏi xuống" disabled={disabled || index === form.questions.length - 1} className="rounded-lg border p-2 disabled:opacity-40" onClick={() => moveQuestion(index, 1)}><ArrowDown size={15} /></button>{form.speakingType !== "TOPIC" && form.questions.length > 1 && <button type="button" aria-label="Xóa câu hỏi" disabled={disabled} className="rounded-lg border border-rose-200 p-2 text-rose-600" onClick={() => removeQuestion(index)}><Trash2 size={15} /></button>}</div></header>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">Nội dung câu hỏi<textarea className={`${inputClass} min-h-24`} disabled={disabled} value={question.questionText} onChange={(event) => updateQuestion(index, "questionText", event.target.value)} /></label>
            {form.speakingType === "TOPIC" && <>
              <label className="grid gap-1.5 text-xs font-bold text-slate-700">Cue points — mỗi ý một dòng<textarea className={`${inputClass} min-h-28`} disabled={disabled} value={question.cuesText} onChange={(event) => updateQuestion(index, "cuesText", event.target.value)} /></label>
              <label className="grid gap-1.5 text-xs font-bold text-slate-700">Closing (không bắt buộc)<input className={inputClass} disabled={disabled} value={question.closing} onChange={(event) => updateQuestion(index, "closing", event.target.value)} /></label>
            </>}
            <div className="grid gap-3 sm:grid-cols-2"><label className="grid gap-1.5 text-xs font-bold text-slate-700">Thời gian chuẩn bị (giây)<input className={inputClass} type="number" min="0" disabled={disabled || form.speakingType !== "TOPIC"} value={question.preparationTime} onChange={(event) => updateQuestion(index, "preparationTime", event.target.value)} /></label><label className="grid gap-1.5 text-xs font-bold text-slate-700">Thời gian trả lời (giây)<input className={inputClass} type="number" min="0" disabled={disabled} value={question.responseTime} onChange={(event) => updateQuestion(index, "responseTime", event.target.value)} /></label></div>
          </section>
        ))}
        <div className="flex flex-wrap justify-between gap-2">{form.speakingType !== "TOPIC" && <button type="button" disabled={disabled} className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold disabled:opacity-50" onClick={addQuestion}><Plus size={15} />Thêm câu hỏi</button>}<button type="submit" disabled={disabled} className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#4f7cf7] px-4 py-2.5 text-xs font-extrabold text-white disabled:opacity-50"><Save size={15} />{saving ? "Đang lưu..." : "Lưu đề Speaking"}</button></div>
      </form>
    </div>
  );
}
