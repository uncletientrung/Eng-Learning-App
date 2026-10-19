// temp file, localstorage

import { useSyncExternalStore } from "react";
import { getFolderColor } from "./folderColors";

const storageKey = "vocabulary-notebook-folders";
const changeEvent = "vocabulary-notebook-updated";
const emptyFolders = [];
let cachedRaw;
let cachedFolders = emptyFolders;

function parseFolders(raw) {
  try {
    const data = JSON.parse(raw || "[]");
    if (!Array.isArray(data)) return [];
    return data.filter((folder) => folder && typeof folder.id === "string" && typeof folder.name === "string" && folder.name.trim() && typeof folder.createdAt === "string" && !Number.isNaN(Date.parse(folder.createdAt))).map((folder) => {
      const words = (Array.isArray(folder.words) ? folder.words : []).filter((item) => item && typeof item.word === "string" && item.word.trim() && typeof item.type === "string" && typeof item.meaning === "string" && item.meaning.trim()).map((item, index) => ({ ...item, id: typeof item.id === "string" ? item.id : `${folder.id}-word-${index}`, example: typeof item.example === "string" ? item.example : "" }));
      return { ...folder, color: getFolderColor(folder), words, wordCount: words.length };
    });
  } catch { return []; }
}

export function getNotebookFolders() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedFolders = parseFolders(raw);
    }
  } catch { /* Keep the current snapshot if browser storage cannot be read. */ }
  return cachedFolders;
}

export function saveNotebookFolders(folders) {
  const next = folders.map((folder) => ({ ...folder, words: folder.words ?? [], wordCount: (folder.words ?? []).length }));
  localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(callback) {
  const onStorage = (event) => { if (event.key === storageKey || event.key === null) callback(); };
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function useNotebookFolders() {
  return useSyncExternalStore(subscribe, getNotebookFolders, () => emptyFolders);
}

export function getWordIdentity(item) {
  return JSON.stringify([item.word, item.type, item.meaning].map((value) => value.trim().replace(/\s+/g, " ").toLowerCase()));
}

function commitWordChanges(folders, result) {
  try { saveNotebookFolders(folders); return result; }
  catch { return { error: "Chưa lưu được thay đổi. Vui lòng kiểm tra dung lượng hoặc quyền lưu rồi thử lại." }; }
}

export function renameNotebookFolder(folderId, name) {
  const folders = getNotebookFolders();
  if (!folders.some((folder) => folder.id === folderId)) return { error: "Thư mục không còn tồn tại." };
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 80) return { error: "Vui lòng nhập tên thư mục từ 1 đến 80 ký tự." };
  return commitWordChanges(folders.map((folder) => folder.id === folderId ? { ...folder, name: trimmed } : folder), { name: trimmed });
}

export function deleteNotebookFolder(folderId) {
  const folders = getNotebookFolders();
  if (!folders.some((folder) => folder.id === folderId)) return { error: "Thư mục không còn tồn tại." };
  return commitWordChanges(folders.filter((folder) => folder.id !== folderId), { deleted: true });
}

export function updateNotebookWord(folderId, wordId, changes) {
  const folders = getNotebookFolders();
  const folder = folders.find((item) => item.id === folderId);
  const word = folder?.words.find((item) => item.id === wordId);
  if (!word) return { error: "Từ vựng không còn trong thư mục này." };
  const next = { ...word, word: changes.word.trim(), type: changes.type.trim(), meaning: changes.meaning.trim(), example: changes.example.trim() };
  if (!next.word || !next.type || !next.meaning) return { error: "Vui lòng nhập từ, loại từ và định nghĩa." };
  if (folder.words.some((item) => item.id !== wordId && getWordIdentity(item) === getWordIdentity(next))) return { error: "Từ và nghĩa này đã có trong thư mục." };
  return commitWordChanges(folders.map((item) => item.id === folderId ? { ...item, words: item.words.map((entry) => entry.id === wordId ? next : entry) } : item), { updated: true });
}

export function moveNotebookWord(folderId, targetId, wordId) {
  const folders = getNotebookFolders();
  const source = folders.find((item) => item.id === folderId);
  const target = folders.find((item) => item.id === targetId);
  const word = source?.words.find((item) => item.id === wordId);
  if (!word || !target || folderId === targetId) return { error: "Vui lòng chọn một thư mục khác còn tồn tại." };
  if (target.words.some((item) => item.id === wordId || getWordIdentity(item) === getWordIdentity(word))) return { error: "Thư mục đích đã có từ và nghĩa này. Từ vẫn được giữ ở thư mục hiện tại." };
  return commitWordChanges(folders.map((item) => item.id === folderId ? { ...item, words: item.words.filter((entry) => entry.id !== wordId) } : item.id === targetId ? { ...item, words: [...item.words, word] } : item), { targetName: target.name });
}

export function deleteNotebookWords(folderId, wordIds) {
  const folders = getNotebookFolders();
  const folder = folders.find((item) => item.id === folderId);
  if (!folder) return { error: "Thư mục không còn tồn tại." };
  const ids = new Set(wordIds);
  const words = folder.words.filter((item) => !ids.has(item.id));
  const deletedCount = folder.words.length - words.length;
  if (!deletedCount) return { error: "Các từ đã chọn không còn trong thư mục." };
  return commitWordChanges(folders.map((item) => item.id === folderId ? { ...item, words } : item), { deletedCount });
}

export function addNotebookWords(folderId, selections) {
  const folders = getNotebookFolders();
  const folder = folders.find((item) => item.id === folderId);
  if (!folder) return { error: "Thư mục không còn tồn tại. Vui lòng quay lại danh sách thư mục." };
  const known = new Set(folder.words.map(getWordIdentity));
  const additions = [];
  let duplicateCount = 0;
  for (const selection of selections) {
    const identity = getWordIdentity(selection);
    if (known.has(identity)) { duplicateCount++; continue; }
    known.add(identity);
    additions.push({ ...selection, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  }
  if (!additions.length) return { error: "Các từ và nghĩa đã chọn đều có trong thư mục này." };
  const words = [...folder.words, ...additions];
  try {
    saveNotebookFolders(folders.map((item) => item.id === folderId ? { ...item, words, wordCount: words.length } : item));
  } catch { return { error: "Trình duyệt chưa lưu được từ vựng. Vui lòng kiểm tra dung lượng hoặc quyền lưu rồi thử lại." }; }
  return { addedCount: additions.length, duplicateCount };
}
