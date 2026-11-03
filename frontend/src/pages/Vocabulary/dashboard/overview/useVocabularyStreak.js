import { useEffect, useState, useSyncExternalStore } from "react";
import { getAuthenticatedToken, subscribeAuth } from "../../../../services/authApi";
import { vocabularyRequest } from "../../../../services/vocabularyApi";

export function isStreakDay(streak, date) {
  return Boolean(streak?.streakStartDate && date >= streak.streakStartDate &&
    date <= streak.lastStudyDate && date <= streak.today);
}

export default function useVocabularyStreak(today) {
  const token = useSyncExternalStore(subscribeAuth, getAuthenticatedToken, () => null);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ token: null, data: null, error: "" });

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    let revision = 0;
    const refresh = async () => {
      const version = ++revision;
      try {
        const data = await vocabularyRequest("/streak", { signal: controller.signal });
        if (!controller.signal.aborted && version === revision) setState({ token, data, error: "" });
      } catch (error) {
        if (!controller.signal.aborted && version === revision) {
          setState((previous) => ({ token, data: previous.token === token ? previous.data : null, error: error.message }));
        }
      }
    };
    void refresh();
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [token, today, attempt]);

  const data = state.token === token && (!today || state.data?.today === today) ? state.data : null;
  const error = state.token === token ? state.error : "";
  return { streak: data, error, loading: Boolean(token) && !data && !error, retry: () => setAttempt((value) => value + 1) };
}
