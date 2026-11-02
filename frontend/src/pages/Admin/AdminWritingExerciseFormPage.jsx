import { useEffect, useState } from "react";
import { ArrowLeft, Eye, RefreshCw, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { chartFilters } from "../../constant/writingConstant";
import { getAdminImageSrc } from "../../components/admin/adminUtils";
import { createAdminWritingExercise, getAdminWritingExercise, updateAdminWritingExercise } from "../../services/adminApi";
import { getTopicByModule } from "../../services/topicAPI";

const emptyForm = {
  topicId: "",
  title: "",
  imageUrl: "",
  writingType: "",
  questionText: "",
  instruction: "",
  referenceAnswer: "",
  status: "DRAFT",
};

export default function AdminWritingExerciseFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [topicData, exercise] = await Promise.all([
          getTopicByModule("WRITING"),
          editing ? getAdminWritingExercise(id) : Promise.resolve(null),
        ]);
        if (!active) return;
        setTopics(Array.isArray(topicData) ? topicData : []);
        if (exercise) {
          setForm({
            topicId: String(exercise.topicId),
            title: exercise.title || "",
            imageUrl: exercise.imageUrl || "",
            writingType: exercise.writingType || "",
            questionText: exercise.questionText || "",
            instruction: exercise.instruction || "",
            referenceAnswer: exercise.referenceAnswer || "",
            status: exercise.status || "DRAFT",
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
  }, [editing, id, refreshVersion]);

  function retryLoad() {
    setLoading(true);
    setError("");
    setRefreshVersion((version) => version + 1);
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!form.topicId || !form.title.trim() || !form.questionText.trim()) {
      setError("Vui lòng chọn chủ đề và nhập tiêu đề cùng nội dung đề bài.");
      return;
    }
    if (form.title.trim().length > 255 || form.imageUrl.trim().length > 255) {
      setError("Tiêu đề và đường dẫn hình ảnh không được vượt quá 255 ký tự.");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      topicId: Number(form.topicId),
      title: form.title.trim(),
      imageUrl: form.imageUrl.trim() || null,
      writingType: form.writingType || null,
      questionText: form.questionText.trim(),
      instruction: form.instruction.trim() || null,
      referenceAnswer: form.referenceAnswer.trim() || null,
    };
    try {
      const saved = editing
        ? await updateAdminWritingExercise(id, payload)
        : await createAdminWritingExercise(payload);
      navigate(`/admin/writing/${saved.id}`, {
        replace: true,
        state: { notice: editing ? "Đã cập nhật đề Writing." : "Đã tạo đề Writing." },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="mx-auto w-full max-w-[1440px]"><div className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]" role="status">Đang tải dữ liệu đề...</div></div>;
  if (editing && error) {
    return (
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert">
          <p>Không thể tải đề Writing để chỉnh sửa. {error}</p>
          <div className="flex flex-wrap gap-[5px]">
            <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={retryLoad}><RefreshCw size={14} /> Thử lại</button>
            <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" to="/admin/writing">Quay lại danh sách</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="mb-[22px] flex items-start justify-between gap-4 [&_h2]:m-0 [&_h2]:text-[clamp(20px,2vw,25px)] [&_h2]:font-black [&_h2]:tracking-[-.025em] [&_p]:mt-[5px] [&_p]:mb-0 [&_p]:text-[13px] [&_p]:text-[#6b7080] max-[760px]:mb-4 max-[760px]:items-stretch max-[760px]:flex-col">
        <div><h2>{editing ? "Chỉnh sửa đề Writing" : "Tạo đề Writing"}</h2><p>Thông tin được kiểm tra trước khi lưu vào hệ thống.</p></div>
        <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" to="/admin/writing"><ArrowLeft size={15} /> Danh sách đề</Link>
      </div>
      {error && (
        <div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert">
          <p>{error}</p>
          {!editing && (
            <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={retryLoad}>
              <RefreshCw size={14} /> Tải lại dữ liệu
            </button>
          )}
        </div>
      )}
      <form className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]" onSubmit={submit}>
        <div className="grid grid-cols-2 gap-[14px] p-[18px] max-[760px]:grid-cols-1">
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080] col-span-full max-[760px]:col-auto">Tiêu đề đề bài
            <input className="min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="title" value={form.title} onChange={updateField} maxLength={255} required />
          </label>
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080]">Chủ đề
            <select className="min-h-10 w-auto min-w-[125px] rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="topicId" value={form.topicId} onChange={updateField} required>
              <option value="">Chọn chủ đề Writing</option>
              {topics.map((topic) => <option value={topic.id} key={topic.id}>{topic.name}</option>)}
            </select>
          </label>
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080]">Loại bài
            <select className="min-h-10 w-auto min-w-[125px] rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="writingType" value={form.writingType} onChange={updateField}>
              <option value="">Không xác định</option>
              {chartFilters.map((type) => <option value={type.id} key={type.id}>{type.label}</option>)}
            </select>
            <span>Giữ nguyên mã loại hiện có để tương thích chức năng chấm Writing.</span>
          </label>
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080]">Trạng thái
            <select className="min-h-10 w-auto min-w-[125px] rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="status" value={form.status} onChange={updateField}>
              <option value="DRAFT">Bản nháp</option><option value="PUBLISHED">Công khai</option><option value="HIDDEN">Ẩn</option>
            </select>
          </label>
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080]">Đường dẫn hình ảnh
            <input className="min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="imageUrl" value={form.imageUrl} onChange={updateField} maxLength={255} placeholder="writing_1.jpg hoặc https://..." />
          </label>
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080] col-span-full max-[760px]:col-auto">Nội dung đề bài
            <textarea className="min-h-28 w-full resize-y rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="questionText" value={form.questionText} onChange={updateField} required />
          </label>
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080] col-span-full max-[760px]:col-auto">Hướng dẫn (không bắt buộc)
            <textarea className="min-h-28 w-full resize-y rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="instruction" value={form.instruction} onChange={updateField} />
          </label>
          <label className="grid content-start gap-[6px] text-[11px] font-extrabold text-[#1b1d22] [&_select]:w-full [&_span]:text-[10px] [&_span]:font-bold [&_span]:text-[#6b7080] col-span-full max-[760px]:col-auto">Bài tham khảo (không bắt buộc)
            <textarea className="min-h-28 w-full resize-y rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" name="referenceAnswer" value={form.referenceAnswer} onChange={updateField} />
          </label>
        </div>
        <div className="flex flex-wrap justify-end gap-2 px-[18px] pb-[18px]">
          <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={() => setPreviewOpen(true)}><Eye size={15} /> Xem trước</button>
          <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={() => navigate("/admin/writing")}>Hủy</button>
          <button type="submit" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 !border-[#4f7cf7] !bg-[#4f7cf7] !text-white hover:!border-[#3d68d8] hover:!bg-[#3d68d8]" disabled={saving}><Save size={15} /> {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo đề"}</button>
        </div>
      </form>

      {previewOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#10172580] p-[18px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewOpen(false); }}>
          <section className="max-h-[90dvh] w-full max-w-[680px] overflow-auto rounded-[17px] border border-[#e4e7ed] bg-white p-5 shadow-[0_22px_65px_#10172540] [&_h3]:mb-3 [&_h3]:mt-0" role="dialog" aria-modal="true" aria-labelledby="admin-preview-title">
            <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 min-h-[30px] px-2 py-[5px] text-[10px] float-right" onClick={() => setPreviewOpen(false)}>Đóng</button>
            <h3 id="admin-preview-title">{form.title || "Chưa có tiêu đề"}</h3>
            {form.imageUrl && <img className="my-[10px] block max-h-[280px] max-w-full rounded-xl border border-[#e4e7ed] object-contain" src={getAdminImageSrc(form.imageUrl)} alt="Ảnh minh họa đề Writing" />}
            <p className="whitespace-pre-wrap break-words text-xs leading-[1.75] text-[#1b1d22]">{form.questionText || "Nội dung đề bài sẽ hiển thị tại đây."}</p>
            {form.instruction && <div className="mt-[9px] text-[11px] leading-[1.6] [&_strong]:mb-0.5 [&_strong]:block [&_p]:m-0 [&_p]:whitespace-pre-wrap [&_p]:text-[#6b7080]"><strong>Hướng dẫn</strong><p>{form.instruction}</p></div>}
          </section>
        </div>
      )}
    </div>
  );
}
