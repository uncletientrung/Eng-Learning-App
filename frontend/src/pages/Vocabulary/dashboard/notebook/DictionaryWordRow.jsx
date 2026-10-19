import { useEffect, useId, useRef, useState } from "react";
import { LoaderCircle, RotateCcw, Search, X } from "lucide-react";
import { DICTIONARY_DEBOUNCE_MS, getCachedDictionaryWord, lookupDictionaryWord } from "./dictionaryApi";
import DefinitionCombobox from "./DefinitionCombobox";

function useDictionaryLookup(query) {
  const [result, setResult] = useState({ query: "", options: [], status: "idle", error: "" });
  const [attempt, setAttempt] = useState(0);
  const retryRequested = useRef(false);
  const word = query.trim().toLowerCase();
  const cached = getCachedDictionaryWord(word);
  useEffect(() => {
    if (!word || cached) return;
    const controller = new AbortController();
    let active = true;
    const retry = retryRequested.current;
    retryRequested.current = false;
    const debounce = setTimeout(async () => {
      setResult({ query: word, options: [], status: "loading", error: "" });
      try {
        const options = await lookupDictionaryWord(word, controller.signal, { retry });
        if (active) setResult({ query: word, options, status: "ready", error: "" });
      } catch (error) {
        if (!active) return;
        if (error.name !== "AbortError") setResult({ query: word, options: [], status: "error", error: error.message });
      }
    }, retry ? 0 : DICTIONARY_DEBOUNCE_MS);
    return () => { active = false; clearTimeout(debounce); controller.abort(); };
  }, [word, attempt, cached]);
  const current = !word ? { options: [], status: "idle", error: "" } : cached ? { options: cached, status: "ready", error: "" } : result.query !== word || result.status === "ready" ? { options: [], status: "loading", error: "" } : result;
  return {
    ...current, retry: () => {
      retryRequested.current = true;
      setResult({ query: word, options: [], status: "loading", error: "" });
      setAttempt((value) => value + 1);
    }
  };
}

export default function DictionaryWordRow({ draft, index, onChange, onRemove }) {
  const id = useId();
  const lookup = useDictionaryLookup(draft.query);
  return (
    <fieldset className="vd-word-draft">
      <legend>Từ {String(index + 1).padStart(2, "0")}</legend>
      <button type="button" className="vd-word-draft-remove" onClick={onRemove} aria-label={`Bỏ dòng từ ${index + 1}`}><X size={18} /></button>
      <label className="vd-word-field-label" htmlFor={`${id}-word`}>Từ tiếng Anh</label>
      <div className="vd-word-input-wrap"><Search size={18} aria-hidden="true" /><input id={`${id}-word`} type="text" placeholder="Ví dụ: glacier, team, achieve..." value={draft.query} maxLength={100} autoComplete="off" spellCheck={false} autoCapitalize="none" onChange={(event) => onChange({ query: event.target.value, selection: null })} />{lookup.status === "loading" && <LoaderCircle className="vd-word-loading" size={18} aria-hidden="true" />}</div>
      <span className="vd-word-field-label" id={`${id}-meaning-label`}>Loại từ & định nghĩa</span>
      <DefinitionCombobox key={draft.query.trim().toLowerCase()} labelId={`${id}-meaning-label`} options={lookup.options} value={draft.selection} onChange={(selection) => onChange({ selection })} disabled={lookup.status !== "ready"} placeholder={lookup.status === "loading" ? "Đang tra từ..." : lookup.status === "idle" ? "Nhập từ tiếng Anh ở trên để tra nghĩa" : lookup.status === "error" ? "Chưa có định nghĩa để chọn" : `Chọn trong ${lookup.options.length} định nghĩa`} />
      <div className="vd-word-lookup-status" aria-live="polite">
        {lookup.status === "error" && <p className="vd-word-error">{lookup.error} <button type="button" onClick={lookup.retry}><RotateCcw size={13} />Thử lại</button></p>}
        {lookup.status === "loading" && <p>Đang tìm loại từ và định nghĩa...</p>}
        {lookup.status === "ready" && !draft.selection && <p>Chọn nghĩa bạn muốn lưu vào thư mục.</p>}
        {draft.selection?.example && <p className="vd-word-example">“{draft.selection.example}”</p>}
      </div>
    </fieldset>
  );
}
