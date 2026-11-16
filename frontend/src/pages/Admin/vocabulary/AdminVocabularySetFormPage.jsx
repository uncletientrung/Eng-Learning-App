import { useCallback, useState } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { createAdminVocabularySet, getAdminVocabularySet, updateAdminVocabularySet } from "../../../services/adminApi";
import { useAdminVocabularyData, vocabularyReturnTo } from "./useAdminVocabulary";
import { VocabularyLoadState, VocabularyNotice, VocabularyPageHeader } from "./AdminVocabularyUi";

function SetForm({ initial, id, listUrl, returnTo }) {
  const navigate = useNavigate();
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const title = id ? "Chỉnh sửa bộ từ vựng" : "Thêm bộ từ vựng";
  const save = async (event) => {
    event.preventDefault();
    if (!name.trim()) { setError("Vui lòng nhập tên bộ từ."); return; }
    setSaving(true);
    setError("");
    try {
      const values = { name: name.trim(), description: description.trim() || null };
      const result = id ? await updateAdminVocabularySet(id, values) : await createAdminVocabularySet(values);
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
      <div className="av-form-heading"><h3>Thông tin bộ từ</h3><p>Bộ từ hệ thống sẽ hiển thị trong thư viện Vocabulary của người học.</p></div>
      <fieldset disabled={saving}>
        <div className="av-field"><label htmlFor="av-set-name">Tên bộ từ <span className="av-required">*</span></label>
          <input id="av-set-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nhập tên bộ từ vựng" required maxLength={255} autoFocus />
          <small>{name.length}/255 ký tự</small></div>
        <div className="av-field"><label htmlFor="av-set-description">Mô tả</label>
          <textarea id="av-set-description" rows={5} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Giới thiệu nội dung hoặc chủ đề của bộ từ" maxLength={10000} /></div>
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
