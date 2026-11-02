import { useEffect, useSyncExternalStore } from "react";
import { getAccessToken, getTokenExpiresAt, subscribeAuth } from "../../../../services/authApi";
import { getPersonalVocabularySets, vocabularyRequest } from "../../../../services/vocabularyApi";

const emptyState = { folders: [], loading: true, error: "", loaded: false };
let state = emptyState;
let ownerToken = null;
let pending = null;
const listeners = new Set();
const emit = () => listeners.forEach((listener) => listener());

subscribeAuth(() => {
  if (ownerToken === getAccessToken()) return;
  ownerToken = null;
  pending = null;
  state = emptyState;
  emit();
});

function snapshot() { return ownerToken === getAccessToken() ? state : emptyState; }
function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }

export async function loadNotebookFolders(force = false) {
  const token = getAccessToken();
  if (!token || getTokenExpiresAt(token) <= Date.now()) return;
  if (ownerToken !== token) { ownerToken = token; state = emptyState; pending = null; }
  if (pending) return pending;
  if (state.loaded && !force) return;
  state = { ...state, loading: true, error: "" };
  emit();
  const request = getPersonalVocabularySets().then((folders) => {
    if (getAccessToken() === token) state = { folders, loading: false, error: "", loaded: true };
  }).catch((error) => {
    if (getAccessToken() === token) state = { ...state, loading: false, error: error.message, loaded: true };
  }).finally(() => {
    if (pending === request) { pending = null; emit(); }
  });
  pending = request;
  return request;
}

export function useNotebookState() {
  const token = useSyncExternalStore(subscribeAuth, getAccessToken, () => null);
  const current = useSyncExternalStore(subscribe, snapshot, () => emptyState);
  useEffect(() => { void loadNotebookFolders(); }, [token]);
  return current;
}

export function useNotebookFolders() { return useNotebookState().folders; }

async function mutate(path, method, body, result = {}) {
  const token = getAccessToken();
  try {
    const data = await vocabularyRequest(path, { method, body });
    if (token === getAccessToken()) {
      if (pending) await pending;
      await loadNotebookFolders(true);
    }
    return data || result;
  } catch (error) { return { error: error.message }; }
}

export function createNotebookFolder(name) {
  return mutate("", "POST", { name: name.trim() });
}

export function renameNotebookFolder(id, name) {
  return mutate(`/${id}`, "PUT", { name: name.trim() }, { name: name.trim() });
}

export function deleteNotebookFolder(id) {
  return mutate(`/${id}`, "DELETE", undefined, { deleted: true });
}

const wordBody = (word) => ({ word: word.word.trim(), partOfSpeech: word.type.trim(),
  meaning: word.meaning.trim(), phonetic: word.phonetic || "", example: word.example?.trim() || "" });

export function updateNotebookWord(folderId, wordId, changes) {
  return mutate(`/${folderId}/words/${wordId}`, "PUT", wordBody(changes), { updated: true });
}

export function moveNotebookWord(folderId, targetId, wordId) {
  return mutate(`/${folderId}/words/${wordId}/move`, "POST", { targetSetId: Number(targetId) });
}

export function deleteNotebookWords(folderId, wordIds) {
  return mutate(`/${folderId}/words/delete`, "POST", { wordIds: wordIds.map(Number) });
}

export async function addNotebookWords(folderId, selections) {
  const result = await mutate(`/${folderId}/words`, "POST", { words: selections.map(wordBody) });
  return !result.error && !result.addedCount ? { error: "Các từ và nghĩa đã chọn đều có trong bộ từ này." } : result;
}
