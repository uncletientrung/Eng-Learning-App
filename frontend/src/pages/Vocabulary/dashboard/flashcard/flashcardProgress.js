import { useEffect, useSyncExternalStore } from "react";
import { getAccessToken, getTokenExpiresAt, subscribeAuth } from "../../../../services/authApi";
import { vocabularyRequest } from "../../../../services/vocabularyApi";

const emptyState = { progress: {}, loading: true, loaded: false, error: "" };
let state = emptyState;
let ownerToken = null;
let pending = null;
let revision = 0;
const listeners = new Set();
const emit = () => listeners.forEach((listener) => listener());
const normalize = (entry) => ({ ...entry, word: { ...entry.word,
  id: String(entry.word.id), topicId: String(entry.word.topicId), type: entry.word.partOfSpeech } });

subscribeAuth(() => {
  if (ownerToken === getAccessToken()) return;
  ownerToken = null;
  pending = null;
  state = emptyState;
  revision++;
  emit();
});

function snapshot() { return ownerToken === getAccessToken() ? state : emptyState; }
function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }

export async function loadProgress(force = false) {
  const token = getAccessToken();
  if (!token || getTokenExpiresAt(token) <= Date.now()) return;
  if (ownerToken !== token) { ownerToken = token; state = emptyState; pending = null; revision++; }
  if (pending) return pending;
  if (state.loaded && !force) return;
  const version = revision;
  state = { ...state, loading: true, error: "" };
  emit();
  const request = vocabularyRequest("/progress").then((entries) => {
    if (getAccessToken() === token && revision === version) {
      const progress = Object.fromEntries(entries.map(normalize).map((entry) => [entry.word.id, entry]));
      state = { progress, loading: false, loaded: true, error: "" };
    }
  }).catch((error) => {
    if (getAccessToken() === token && revision === version) state = { ...state, loading: false, error: error.message };
  }).finally(() => {
    if (pending === request) { pending = null; emit(); }
  });
  pending = request;
  return request;
}

export async function saveWordProgress(setId, wordId, status) {
  const token = getAccessToken();
  const entry = normalize(await vocabularyRequest(`/${encodeURIComponent(setId)}/words/${encodeURIComponent(wordId)}/progress`, {
    method: "PUT", body: { status },
  }));
  if (token !== getAccessToken()) throw new Error("Phiên đăng nhập đã thay đổi. Vui lòng mở lại bộ từ.");
  revision++;
  state = { progress: { ...state.progress, [entry.word.id]: entry }, loading: false, loaded: true, error: "" };
  emit();
  return entry;
}

export function useVocabularyProgress() {
  const token = useSyncExternalStore(subscribeAuth, getAccessToken, () => null);
  const current = useSyncExternalStore(subscribe, snapshot, () => emptyState);
  useEffect(() => {
    void loadProgress();
    const refresh = () => { void loadProgress(true); };
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, [token]);
  return current;
}

export function reviewDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type) => parts.find((item) => item.type === type).value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function isReviewDue(progress, now = new Date()) {
  return Boolean(progress?.nextReviewAt && progress.nextReviewAt <= reviewDate(now));
}

export function groupFlashcardWords(words, progress, now = new Date()) {
  const groups = { remembered: [], unremembered: [], due: [] };
  for (const word of words) {
    const entry = progress[word.id];
    const category = isReviewDue(entry, now) ? "due" : entry?.status === 3 ? "remembered" : "unremembered";
    groups[category].push(word);
  }
  return groups;
}

export function reviewDelayLabel(status, progress) {
  const days = status === 1 ? 0 : status === 2 ? 1 : progress?.rememberedDelayDays ?? 3;
  if (days === 0) return "Hôm nay";
  if (days >= 365) return `${Math.floor(days / 365)} năm`;
  if (days >= 30) return `${Math.floor(days / 30)} tháng`;
  return `${days} ngày`;
}
