import { useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export function useAdminVocabularyData(load, key) {
  const [result, setResult] = useState(null);
  const [revision, setRevision] = useState(0);
  const requestKey = `${key}:${revision}`;
  useEffect(() => {
    let active = true;
    Promise.resolve().then(load).then(
      (data) => { if (active) setResult({ key: requestKey, data }); },
      (error) => { if (active) setResult({ key: requestKey, error }); },
    );
    return () => { active = false; };
  }, [load, requestKey]);
  const current = result?.key === requestKey ? result : null;
  const reload = useCallback(() => setRevision((value) => value + 1), []);
  return { data: current?.data, error: current?.error, loading: !current, reload };
}

export function useAdminVocabularyQuery() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const number = Number(params.get("page"));
  const page = Number.isSafeInteger(number) && number > 0 && number <= 2147483647 ? number : 1;
  const size = Number(params.get("pageSize"));
  const pageSize = [10, 20, 50].includes(size) ? size : 10;
  const search = (params.get("search") || "").slice(0, 255);
  const partOfSpeech = (params.get("partOfSpeech") || "").slice(0, 255);
  const update = (changes) => setParams((previous) => {
    const next = new URLSearchParams(previous);
    Object.entries(changes).forEach(([name, value]) => {
      if (value === "" || value === null) next.delete(name);
      else next.set(name, String(value));
    });
    return next;
  }, { state: location.state });
  return { page, pageSize, search, partOfSpeech, update };
}

export function vocabularyReturnTo(value, fallback = "/admin/vocabulary") {
  return typeof value === "string" && /^\/admin\/vocabulary(?:\/|\?|$)/.test(value) ? value : fallback;
}
