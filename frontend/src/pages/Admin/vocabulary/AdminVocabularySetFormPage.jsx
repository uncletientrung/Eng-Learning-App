import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, LoaderCircle, Save, Trash2, Upload } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { createAdminVocabularySet, createAdminVocabularySetWithImage, getAdminVocabularySet, updateAdminVocabularySet, updateAdminVocabularySetWithImage } from "../../../services/adminApi";
import { getAdminImageSrc } from "../../../components/admin/adminUtils";
import { useAdminVocabularyData, vocabularyReturnTo } from "./useAdminVocabulary";
import { VocabularyLoadState, VocabularyNotice, VocabularyPageHeader } from "./AdminVocabularyUi";

function SetForm({ initial, id, listUrl, returnTo }) {
  const navigate = useNavigate();
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [imageURL, setImageURL] = useState(initial?.imageURL || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [previewFailed, setPreviewFailed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const imageInput = useRef(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const title = id ? "Chỉnh sửa bộ từ vựng" : "Thêm bộ từ vựng";
  const previewSrc = imagePreview || getAdminImageSrc(imageURL);
  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);
  const selectImage = (file) => {
    if (!file || saving) return;
    if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
      setImageError("Chỉ chấp nhận ảnh JPG, PNG, GIF hoặc WebP."); return;
    }
    if (file.size === 0 || file.size > 5 * 1024 * 1024) {
      setImageError("Ảnh phải có dung lượng lớn hơn 0 và không quá 5 MB."); return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageError("");
    setPreviewFailed(false);
  };
  const removeImage = () => {
    setImageURL("");
    setImageFile(null);
    setImagePreview("");
    setImageError("");
    setPreviewFailed(false);
    if (imageInput.current) imageInput.current.value = "";
  };
  const save = async (event) => {
    event.preventDefault();
    if (!name.trim()) { setError("Vui lòng nhập tên bộ từ."); return; }
    if (imageError) { imageInput.current?.focus(); return; }
    setSaving(true);
    setError("");
    try {
      const values = { name: name.trim(), description: description.trim() || null, imageURL: imageURL || null };
      let result;
      if (imageFile) {
        const data = new FormData();
        data.append("name", values.name);
        data.append("description", values.description || "");
        data.append("image", imageFile);
        result = id ? await updateAdminVocabularySetWithImage(id, data) : await createAdminVocabularySetWithImage(data);
      } else {
        result = id ? await updateAdminVocabularySet(id, values) : await createAdminVocabularySet(values);
      }
      const destination = id && returnTo.startsWith(`/admin/vocabulary/${id}?`) ? returnTo : `/admin/vocabulary/${result.id}`;
      navigate(destination, { state: { listUrl, notice: id ? "Đã cập nhật bộ từ vựng." : "Đã tạo bộ từ vựng. Bạn có thể thêm từ ngay bên dưới." }, replace: true });
    } catch (failure) { setError(failure.message); setSaving(false); }
  };
  return <>
    <VocabularyPageHeader title={title} links={[{ label: "Vocabulary", to: listUrl }, ...(id ? [{ label: initial.name, to: returnTo, state: { listUrl } }] : []), { label: id ? "Chỉnh sửa" : "Thêm mới" }]}>
      <button type="button" className="av-button" disabled={saving} onClick={() => navigate(returnTo, { state: { listUrl } })}><ArrowLeft size={16} />Hủy</button>
      <button type="submit" form="av-set-form" className="av-button av-primary" disabled={saving}>{saving ? <LoaderCircle size={16} className="av-spin" /> : <Save size={16} />}{saving ? "Đang lưu..." : "Lưu thay đổi"}</button>
    </VocabularyPageHeader>
    <VocabularyNotice message={error} error />
    <form id="av-set-form" className="av-card av-form-card" onSubmit={save}>
      <fieldset disabled={saving}>
        <div className="av-field"><label htmlFor="av-set-name">Tên bộ từ <span className="av-required">*</span></label>
          <input id="av-set-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nhập tên bộ từ vựng" required maxLength={255} autoFocus />
          <small>{name.length}/255 ký tự</small></div>
        <div className="av-field"><label htmlFor="av-set-description">Mô tả</label>
          <textarea id="av-set-description" rows={5} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Giới thiệu nội dung hoặc chủ đề của bộ từ" maxLength={10000} /></div>
        <div className="av-field">
          <label htmlFor="av-set-image" id="av-set-image-label">Hình ảnh</label>
          <input
            id="av-set-image"
            className="av-image-input"
            ref={imageInput}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            aria-labelledby="av-set-image-label"
            aria-describedby={`av-set-image-help${imageError ? " av-set-image-error" : ""}`}
            aria-invalid={!!imageError}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              selectImage(file);
            }}
          />
          <label
            htmlFor="av-set-image"
            className={`av-image-dropzone${dragging ? " is-dragging" : ""}`}
            onDragOver={(event) => { event.preventDefault(); if (!saving) { event.dataTransfer.dropEffect = "copy"; setDragging(true); } }}
            onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false); }}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              if (!saving) selectImage(event.dataTransfer.files?.[0]);
            }}
          >
            <span className="av-image-instruction">Kéo thả ảnh vào đây hoặc <span>bấm để {previewSrc ? "đổi" : "chọn"} ảnh</span></span>
            {previewSrc && !previewFailed ? <img className="av-image-preview" src={previewSrc} alt="Xem trước ảnh bộ từ" onError={() => setPreviewFailed(true)} /> : <span className="av-image-upload-icon"><Upload size={28} strokeWidth={1.7} aria-hidden="true" /></span>}
            {previewFailed && <span className="av-image-error">Không tải được ảnh xem trước. Bạn có thể chọn ảnh khác.</span>}
            <span id="av-set-image-help" className="av-image-help">JPG, PNG, GIF, WebP · Tối đa 5 MB</span>
          </label>
          {imageError && <p className="av-image-error" id="av-set-image-error" role="alert">{imageError}</p>}
          {(previewSrc || imageError) && <div className="av-image-footer">
            <span className="av-muted">{imageFile?.name || (previewSrc ? "Ảnh hiện tại" : "Chưa chọn ảnh")}</span>
            <button type="button" className="av-button" onClick={removeImage}><Trash2 size={15} />{previewSrc ? "Xóa ảnh" : "Bỏ chọn ảnh"}</button>
          </div>}
        </div>
      </fieldset>
    </form>
  </>;
}

export default function AdminVocabularySetFormPage() {
  const { id } = useParams();
  const location = useLocation();
  const listUrl = vocabularyReturnTo(location.state?.listUrl);
  const returnTo = vocabularyReturnTo(location.state?.returnTo, id ? `/admin/vocabulary/${id}` : listUrl);
  const load = useCallback(() => id ? getAdminVocabularySet(id) : Promise.resolve({}), [id]);
  const { data, loading, error, reload } = useAdminVocabularyData(load, id || "create");
  return <section className="av-page">
    {loading || error ? <>
      <VocabularyPageHeader title={id ? "Chỉnh sửa bộ từ vựng" : "Thêm bộ từ vựng"} links={[{ label: "Vocabulary", to: listUrl }, { label: id ? "Chỉnh sửa" : "Thêm mới" }]}><Link to={returnTo} state={{ listUrl }} className="av-button"><ArrowLeft size={16} />Quay lại</Link></VocabularyPageHeader>
      <div className="av-card"><VocabularyLoadState loading={loading} error={error} onRetry={reload} /></div>
    </> : <SetForm key={id || "create"} initial={data} id={id} listUrl={listUrl} returnTo={returnTo} />}
  </section>;
}
