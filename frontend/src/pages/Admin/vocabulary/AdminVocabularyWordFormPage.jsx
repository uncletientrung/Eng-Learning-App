import { useCallback, useState } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { createAdminVocabularyWord, getAdminVocabularySet, getAdminVocabularyWord, updateAdminVocabularyWord } from "../../../services/adminApi";
import { useAdminVocabularyData, vocabularyReturnTo } from "./useAdminVocabulary";
import { VocabularyLoadState, VocabularyNotice, VocabularyPageHeader } from "./AdminVocabularyUi";

const partsOfSpeech = ["n", "v", "adj", "adv", "pron", "prep", "conj", "det", "interj", "n/v", "n/adj", "adj/n", "v/n", "adj/adv/n"];

function WordForm({ set, initial, id, wordId, listUrl, returnTo }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(() => ({ word: initial?.word || "", meaning: initial?.meaning || "", phonetic: initial?.phonetic || "", partOfSpeech: initial?.partOfSpeech || "", example: initial?.example || "" }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const update = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };
  const save = async (event) => {
    event.preventDefault();
    if (![values.word, values.meaning, values.partOfSpeech].every((value) => value.trim())) {
      setError("Vui lòng nhập đầy đủ từ vựng, nghĩa và từ loại."); return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
      if (wordId) await updateAdminVocabularyWord(id, wordId, payload);
      else await createAdminVocabularyWord(id, payload);
      navigate(returnTo, { state: { listUrl, notice: wordId ? "Đã cập nhật từ vựng." : "Đã thêm từ vựng vào bộ từ." }, replace: true });
    } catch (failure) { setError(failure.message); setSaving(false); }
  };
  return <>
    <VocabularyPageHeader title={wordId ? "Chỉnh sửa từ vựng" : "Thêm từ vựng"} links={[{ label: "Vocabulary", to: listUrl }, { label: set.name, to: returnTo, state: { listUrl } }, { label: wordId ? "Chỉnh sửa từ" : "Thêm từ" }]}>
      <button type="button" className="av-button" disabled={saving} onClick={() => navigate(returnTo, { state: { listUrl } })}><ArrowLeft size={16} />Hủy</button>
      <button type="submit" form="av-word-form" className="av-button av-primary" disabled={saving}>{saving ? <LoaderCircle size={16} className="av-spin" /> : <Save size={16} />}{saving ? "Đang lưu..." : "Lưu thay đổi"}</button>
    </VocabularyPageHeader>
    <VocabularyNotice message={error} error />
    <form id="av-word-form" className="av-card av-form-card" onSubmit={save}>
      <div className="av-form-heading"><h3>Thông tin từ vựng</h3><p>Bộ từ: <strong>{set.name}</strong></p></div>
      <fieldset disabled={saving}>
        <div className="av-form-grid">
          <div className="av-field"><label htmlFor="av-word">Từ vựng <span className="av-required">*</span></label><input id="av-word" name="word" value={values.word} onChange={update} required maxLength={255} placeholder="Ví dụ: environment" autoFocus /></div>
          <div className="av-field"><label htmlFor="av-phonetic">Phiên âm</label><input id="av-phonetic" name="phonetic" value={values.phonetic} onChange={update} maxLength={255} placeholder="Ví dụ: /ɪnˈvaɪrənmənt/" /></div>
          <div className="av-field"><label htmlFor="av-part-of-speech">Từ loại <span className="av-required">*</span></label><input id="av-part-of-speech" name="partOfSpeech" value={values.partOfSpeech} onChange={update} list="av-pos-options" required maxLength={255} placeholder="Chọn hoặc nhập từ loại" />
            <datalist id="av-pos-options">{partsOfSpeech.map((part) => <option value={part} key={part} />)}</datalist><small>n: danh từ · v: động từ · adj: tính từ · adv: trạng từ</small></div>
        </div>
        <div className="av-field"><label htmlFor="av-meaning">Nghĩa <span className="av-required">*</span></label><textarea id="av-meaning" name="meaning" rows={3} value={values.meaning} onChange={update} required maxLength={10000} placeholder="Nhập nghĩa tiếng Việt của từ" /></div>
        <div className="av-field"><label htmlFor="av-example">Ví dụ</label><textarea id="av-example" name="example" rows={4} value={values.example} onChange={update} maxLength={10000} placeholder="Nhập câu ví dụ có sử dụng từ vựng" /></div>
      </fieldset>
    </form>
  </>;
}

export default function AdminVocabularyWordFormPage() {
  const { id, wordId } = useParams();
  const location = useLocation();
  const listUrl = vocabularyReturnTo(location.state?.listUrl);
  const returnTo = vocabularyReturnTo(location.state?.returnTo, `/admin/vocabulary/${id}`);
  const load = useCallback(async () => {
    const [set, word] = await Promise.all([getAdminVocabularySet(id), wordId ? getAdminVocabularyWord(id, wordId) : Promise.resolve(null)]);
    return { set, word };
  }, [id, wordId]);
  const { data, loading, error, reload } = useAdminVocabularyData(load, `${id}:${wordId || "create"}`);
  return <section className="av-page">
    {loading || error ? <>
      <VocabularyPageHeader title={wordId ? "Chỉnh sửa từ vựng" : "Thêm từ vựng"} links={[{ label: "Vocabulary", to: listUrl }, { label: wordId ? "Chỉnh sửa từ" : "Thêm từ" }]}><Link to={returnTo} state={{ listUrl }} className="av-button"><ArrowLeft size={16} />Quay lại</Link></VocabularyPageHeader>
      <div className="av-card"><VocabularyLoadState loading={loading} error={error} onRetry={reload} /></div>
    </> : <WordForm key={`${id}:${wordId || "create"}`} set={data.set} initial={data.word} id={id} wordId={wordId} listUrl={listUrl} returnTo={returnTo} />}
  </section>;
}
