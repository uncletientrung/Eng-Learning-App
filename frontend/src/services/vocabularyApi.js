import API_URL from "../constant/apiConfig";
import { getAccessToken, logout } from "./authApi";

export async function vocabularyRequest(path = "", { method = "GET", body, signal } = {}) {
  const token = getAccessToken();
  if (!token) throw new Error("Vui lòng đăng nhập để xem bộ từ.");
  let response;
  try {
    response = await fetch(`${API_URL}/vocabulary/sets${path}`, {
      method, signal,
      headers: { Authorization: `Bearer ${token}`, ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("Không kết nối được máy chủ. Vui lòng thử lại.", { cause: error });
  }
  if (response.status === 401 && getAccessToken() === token) logout();
  if (response.status === 204) return null;
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const validationError = Object.values(data?.errors || {}).flat()[0];
    throw new Error(data?.message || validationError || (response.status === 401
      ? "Phiên đăng nhập đã hết hạn."
      : response.status === 404 ? "Không tìm thấy bộ từ hoặc bạn không có quyền truy cập."
        : "Chưa tải được dữ liệu từ vựng. Vui lòng thử lại."));
  }
  return data;
}

export function normalizeVocabularySet(set) {
  return { ...set, id: String(set.id),
    words: (set.words || []).map((word) => ({ ...word, id: String(word.id), type: word.partOfSpeech })) };
}

export async function getVocabularySets(signal) {
  return (await vocabularyRequest("", { signal })).map(normalizeVocabularySet);
}

export async function getPersonalVocabularySets() {
  return (await vocabularyRequest("/mine")).map(normalizeVocabularySet);
}

export async function getVocabularySet(id, signal) {
  return normalizeVocabularySet(await vocabularyRequest(`/${encodeURIComponent(id)}`, { signal }));
}
