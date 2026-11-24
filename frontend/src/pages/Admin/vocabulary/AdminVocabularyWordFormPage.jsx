import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, LoaderCircle, RotateCcw, Save } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { createAdminVocabularyWord, getAdminVocabularySet, getAdminVocabularyWord, updateAdminVocabularyWord } from "../../../services/adminApi";
import { useAdminVocabularyData, vocabularyReturnTo } from "./useAdminVocabulary";
import { VocabularyLoadState, VocabularyNotice, VocabularyPageHeader } from "./AdminVocabularyUi";
import { DICTIONARY_DEBOUNCE_MS, getCachedDictionaryWord, lookupDictionaryWord } from "../../Vocabulary/dashboard/notebook/dictionaryApi";
import DefinitionCombobox from "../../Vocabulary/dashboard/notebook/DefinitionCombobox";

const partsOfSpeech = [
  { value: "n", label: "Danh từ", aliases: ["noun", "danh từ"] },
  { value: "v", label: "Động từ", aliases: ["verb", "động từ"] },
  { value: "adj", label: "Tính từ", aliases: ["adjective", "a", "tính từ"] },
  { value: "adv", label: "Trạng từ", aliases: ["adverb", "trạng từ", "phó từ"] },
  { value: "pron", label: "Đại từ", aliases: ["pronoun", "đại từ"] },
  { value: "prep", label: "Giới từ", aliases: ["preposition", "giới từ"] },
  { value: "conj", label: "Liên từ", aliases: ["conjunction", "liên từ"] },
  { value: "det", label: "Từ hạn định", aliases: ["determiner", "từ hạn định"] },
  { value: "interj", label: "Thán từ", aliases: ["interjection", "exclamation", "thán từ", "cảm thán từ"] },
  { value: "art", label: "Mạo từ", aliases: ["article", "mạo từ"] },
  { value: "num", label: "Số từ", aliases: ["numeral", "number", "số từ"] },
  { value: "phr", label: "Cụm từ", aliases: ["phrase", "cụm từ"] },
  { value: "aux", label: "Trợ động từ", aliases: ["auxiliary", "auxiliary verb", "modal verb", "trợ động từ"] },
  { value: "abbr", label: "Từ viết tắt", aliases: ["abbreviation", "từ viết tắt"] },
];

const partOfSpeechOptions = partsOfSpeech.map((part) => ({ id: part.value, label: part.label }));
const renderPartOfSpeech = (option) => <span className="av-pos-label">{option.label}</span>;

const normalizeWord = (word) => word.trim().replace(/\s+/g, " ").toLowerCase();
const normalizePartOfSpeech = (value = "") => {
  const normalized = value.trim().toLowerCase().replace(/\.$/, "");
  return partsOfSpeech.find((part) => part.value === normalized || part.aliases.includes(normalized))?.value || "";
};

function useWordSuggestions(query) {
  const word = normalizeWord(query);
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const retryWord = useRef(null);
  const cached = getCachedDictionaryWord(word);
  const requestKey = `${word}:${attempt}`;
  useEffect(() => {
    if (!word || cached) return;
    let active = true;
    const controller = new AbortController();
    const retry = retryWord.current === word;
    retryWord.current = null;
    const timer = setTimeout(async () => {
      try {
        const options = await lookupDictionaryWord(word, controller.signal, { retry });
        if (active) setResult({ key: requestKey, options, status: "ready", error: "" });
      } catch (error) {
        if (active && error.name !== "AbortError") setResult({ key: requestKey, options: [], status: "error", error: error.message });
      }
    }, retry ? 0 : DICTIONARY_DEBOUNCE_MS);
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [word, cached, requestKey]);
  const current = !word ? { options: [], status: "idle", error: "" }
    : cached ? { options: cached, status: "ready", error: "" }
      : result?.key === requestKey ? result : { options: [], status: "loading", error: "" };
  return { ...current, retry: () => { retryWord.current = word; setAttempt((value) => value + 1); } };
}

function WordForm({ set, initial, id, wordId, listUrl, returnTo }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(() => ({ word: initial?.word || "", meaning: initial?.meaning || "", phonetic: initial?.phonetic || "", partOfSpeech: normalizePartOfSpeech(initial?.partOfSpeech), example: initial?.example || "" }));
  const [selection, setSelection] = useState(null);
  const [partOfSpeechInvalid, setPartOfSpeechInvalid] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const lookup = useWordSuggestions(values.word);
  const selectedMeaning = selection?.query === normalizeWord(values.word) ? lookup.options.find((option) => option.id === selection.id) : null;
  const updateValue = (name, value) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setSelection(null);
    if (name === "partOfSpeech") setPartOfSpeechInvalid(false);
  };
  const update = (event) => updateValue(event.target.name, event.target.value);
  const selectMeaning = (option) => {
    setValues((previous) => ({ ...previous, meaning: option.meaning, partOfSpeech: normalizePartOfSpeech(option.type), phonetic: option.phonetic || "", example: option.example || "" }));
    setSelection({ query: normalizeWord(values.word), id: option.id });
    setPartOfSpeechInvalid(false);
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
    <form id="av-word-form" className="av-card av-form-card av-word-form" onSubmit={save}>
      <fieldset disabled={saving}>
        <div className="av-field">
          <label htmlFor="av-word">Từ vựng <span className="av-required">*</span></label>
          <input id="av-word" name="word" value={values.word} onChange={update} required maxLength={255} placeholder="Ví dụ: environment" autoComplete="off" autoCapitalize="none" spellCheck={false} autoFocus />
        </div>
        <div className="av-field">
          <span className="av-field-label" id="av-dictionary-meaning-label">Loại từ & định nghĩa</span>
          <DefinitionCombobox key={normalizeWord(values.word)} labelId="av-dictionary-meaning-label" descriptionId="av-dictionary-status" options={lookup.options} value={selectedMeaning} onChange={selectMeaning} disabled={lookup.status !== "ready" || !lookup.options.length}
            placeholder={lookup.status === "loading" ? "Đang tra từ..." : lookup.status === "ready" ? `Chọn trong ${lookup.options.length} định nghĩa` : lookup.status === "idle" ? "Nhập từ tiếng Anh ở trên để tra nghĩa" : "Chưa có định nghĩa để chọn"} />
          <div className="av-dictionary-status" id="av-dictionary-status" role="status">
            {lookup.status === "loading" ? <span><LoaderCircle size={14} className="av-spin" aria-hidden="true" />Đang tìm nghĩa từ điển...</span>
              : lookup.status === "error" ? <><span>{lookup.error} Bạn vẫn có thể tự nhập bên dưới.</span><button type="button" className="av-reset" onClick={lookup.retry}><RotateCcw size={13} aria-hidden="true" />Thử lại</button></>
                : <span>Chọn nghĩa để điền nhanh. Bạn có thể sửa các thông tin bên dưới.</span>}
          </div>
        </div>
        <div className="av-form-grid">
          <div className="av-field"><label id="av-part-of-speech-label" htmlFor="av-part-of-speech">Từ loại <span className="av-required">*</span></label>
            <DefinitionCombobox className="av-pos-combo" buttonId="av-part-of-speech" labelId="av-part-of-speech-label" descriptionId={partOfSpeechInvalid ? "av-part-of-speech-error" : undefined} options={partOfSpeechOptions} value={partOfSpeechOptions.find((part) => part.id === values.partOfSpeech)} onChange={(part) => updateValue("partOfSpeech", part.id)} renderOption={renderPartOfSpeech} placeholder="Chọn một từ loại" disabled={saving} required invalid={partOfSpeechInvalid} />
            <select className="av-pos-native" name="partOfSpeech" value={values.partOfSpeech} onChange={update} required tabIndex={-1} aria-hidden="true" onInvalid={(event) => { event.preventDefault(); setPartOfSpeechInvalid(true); document.getElementById("av-part-of-speech")?.focus(); }}>
              <option value="">Chọn một từ loại</option>
              {partsOfSpeech.map((part) => <option value={part.value} key={part.value}>{part.label}</option>)}
            </select>
            {partOfSpeechInvalid && <small className="av-field-error" id="av-part-of-speech-error" role="alert">Vui lòng chọn một từ loại.</small>}
            {initial?.partOfSpeech && !normalizePartOfSpeech(initial.partOfSpeech) && !values.partOfSpeech && <small>Vui lòng chọn lại một từ loại phù hợp cho nghĩa đang lưu.</small>}
          </div>
          <div className="av-field"><label htmlFor="av-phonetic">Phiên âm</label><input id="av-phonetic" name="phonetic" value={values.phonetic} onChange={update} maxLength={255} placeholder="Ví dụ: /ɪnˈvaɪrənmənt/" /></div>
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
