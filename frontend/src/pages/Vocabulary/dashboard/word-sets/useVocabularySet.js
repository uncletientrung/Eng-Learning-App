import { useEffect, useState } from "react";
import { getVocabularySet } from "../../../../services/vocabularyApi";

export default function useVocabularySet(id) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ id: null, set: null, error: "", loading: true });
  useEffect(() => {
    const controller = new AbortController();
    getVocabularySet(id, controller.signal).then((set) => {
      if (!controller.signal.aborted) setState({ id, set, error: "", loading: false });
    }).catch((error) => {
      if (!controller.signal.aborted) setState({ id, set: null, error: error.message, loading: false });
    });
    return () => controller.abort();
  }, [id, attempt]);
  const retry = () => {
    setState({ id, set: null, error: "", loading: true });
    setAttempt((value) => value + 1);
  };
  return { ...(state.id === id ? state : { set: null, error: "", loading: true }), retry };
}
