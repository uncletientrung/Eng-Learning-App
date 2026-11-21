import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Lock, RefreshCw, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createAdminTopic, createAdminTopicWithImage, getAdminTopic, updateAdminTopic, updateAdminTopicWithImage } from "../../../services/adminApi";
import { getAdminImageSrc } from "../../../components/admin/adminUtils";
import AdminPageTitle from "../../../components/admin/AdminPageTitle";
import AdminImageUpload from "../../../components/admin/AdminImageUpload";
import { TOPIC_MODULES, getUsageParts, getUsageTotal, moduleLabel, topicButtonClass, topicFieldClass } from "./adminTopicUtils";

const emptyForm = { name: "", description: "", imageURL: "", moduleType: "WRITING" };
const labelClass = "flex flex-wrap items-center gap-1.5 text-[11px] font-extrabold text-[#424b5a]";

export default function AdminTopicFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewFailed, setPreviewFailed] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const imageInput = useRef(null);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;
    getAdminTopic(id)
      .then((data) => {
        if (!active) return;
        setTopic(data);
        setForm({
          name: data.name || "",
          description: data.description || "",
          imageURL: data.imageURL || "",
          moduleType: data.moduleType || "",
        });
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, isEdit]);

  const usageTotal = getUsageTotal(topic?.usage);
  const moduleLocked = isEdit && usageTotal > 0;
  const moduleOptions = TOPIC_MODULES.some((module) => module.value === form.moduleType)
    ? TOPIC_MODULES
    : [...TOPIC_MODULES, { value: form.moduleType, label: moduleLabel(form.moduleType) }];
  const previewSrc = imagePreview || getAdminImageSrc(form.imageURL.trim());

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function selectImage(event) {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : "");
    setPreviewFailed(false);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");
    setPreviewFailed(false);
    setForm((current) => ({ ...current, imageURL: "" }));
    if (imageInput.current) imageInput.current.value = "";
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        imageURL: form.imageURL.trim() || null,
        moduleType: form.moduleType,
      };
      let saved;
      if (imageFile) {
        const data = new FormData();
        data.append("name", payload.name);
        data.append("description", payload.description || "");
        data.append("moduleType", payload.moduleType);
        data.append("image", imageFile);
        saved = isEdit ? await updateAdminTopicWithImage(id, data) : await createAdminTopicWithImage(data);
      } else {
        saved = isEdit ? await updateAdminTopic(id, payload) : await createAdminTopic(payload);
      }
      navigate(`/admin/topics/${saved.id}`, {
        replace: true,
        state: { notice: isEdit ? "Đã cập nhật topic." : "Đã tạo topic mới." },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        className="
          mx-auto max-w-225 rounded-2xl border border-[#e4e7ed] bg-white
          px-4 py-10 text-center text-xs text-[#6b7080]
        "
        role="status"
      >
        Đang tải topic...
      </div>
    );
  }

  const missing = isEdit && !topic;

  return (
    <div className="mx-auto w-full max-w-225">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <AdminPageTitle title={isEdit ? "Chỉnh sửa Topic" : "Thêm Topic"} />
          <p className="mb-0 mt-1.25 text-[13px] text-[#6b7080]">
            {isEdit ? (topic ? `Cập nhật topic #${topic.id}.` : "Không tìm thấy topic.") : "Tạo topic mới cho một module học."}
          </p>
        </div>
        <Link className={topicButtonClass.outline} to={isEdit && topic ? `/admin/topics/${topic.id}` : "/admin/topics"}>
          <ArrowLeft size={15} />
          Quay lại
        </Link>
      </div>

      {error && (
        <div
          className="
            mb-3.25 rounded-xl border border-[#f1c1c5] bg-[#fff4f5]
            px-3.75 py-3.25 text-xs text-[#a63240]
          "
          role="alert"
        >
          <p className="mb-0 mt-0">{error}</p>
          {missing && (
            <button type="button" className={`${topicButtonClass.outline} mt-2`} onClick={() => window.location.reload()}>
              <RefreshCw size={14} />
              Tải lại
            </button>
          )}
        </div>
      )}

      {missing ? (
        !error && (
          <div className="rounded-2xl border border-[#e4e7ed] bg-white px-4 py-10 text-center text-xs text-[#6b7080]">
            Không tìm thấy topic.
          </div>
        )
      ) : (
        <form
          className="
            rounded-2xl border border-[#e4e7ed] bg-white p-5
            shadow-[0_7px_22px_#17203308] sm:p-7
          "
          onSubmit={submit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Tên topic
              <input
                className={topicFieldClass}
                name="name"
                value={form.name}
                onChange={updateField}
                maxLength={255}
                required
              />
            </label>

            <label className={labelClass}>
              Module
              <select
                className={topicFieldClass}
                name="moduleType"
                value={form.moduleType}
                onChange={updateField}
                disabled={moduleLocked}
                required
              >
                {moduleOptions.map((module) => (
                  <option value={module.value} key={module.value}>{module.label}</option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              Ảnh topic
              <AdminImageUpload imageFile={imageFile} imageInput={imageInput} onChange={selectImage} />
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Mô tả
              <textarea
                className={`${topicFieldClass} min-h-28 resize-y`}
                name="description"
                value={form.description}
                onChange={updateField}
                rows={4}
              />
            </label>
          </div>

          {moduleLocked && (
            <div
              className="
                mt-4 flex items-start gap-2 rounded-xl border border-[#e4e7ed]
                bg-[#f7f8fb] px-4 py-3 text-xs text-[#6b7080]
              "
            >
              <Lock size={14} className="mt-0.5 shrink-0" />
              <span>
                Không thể đổi module vì topic đang được dùng bởi{" "}
                {getUsageParts(topic.usage).map((part) => `${part.count} ${part.label.toLowerCase()}`).join(", ")}.
              </span>
            </div>
          )}

          {previewSrc && (
            <div className="mt-4">
              <span className="mb-1.5 block text-[11px] font-extrabold text-[#424b5a]">Xem trước ảnh</span>
              {previewFailed ? (
                <div className="rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-3 py-2 text-xs text-[#a63240]">
                  Không tải được ảnh xem trước.
                </div>
              ) : (
                <img
                  className="h-32 w-56 rounded-xl border border-[#e4e7ed] object-cover"
                  src={previewSrc}
                  alt="Xem trước ảnh topic"
                  onError={() => setPreviewFailed(true)}
                />
              )}
              <button type="button" className={`${topicButtonClass.outline} mt-2`} onClick={removeImage}>
                Xóa ảnh
              </button>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button type="submit" className={topicButtonClass.primary} disabled={saving}>
              <Save size={15} />
              {saving ? "Đang lưu..." : isEdit ? "Lưu thay đổi" : "Tạo topic"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
