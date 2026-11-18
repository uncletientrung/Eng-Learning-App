import API_URL from "../constant/apiConfig";
import { getAccessToken, logout } from "./authApi";

export async function getTranslationParents(signal) {
  let response;
  try {
    response = await fetch(`${API_URL}/translation-exercises/parents`, { signal });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("Không thể kết nối máy chủ. Vui lòng thử lại.", { cause: error });
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Không tải được danh sách bài tập dịch.");
  }
  return data;
}

async function getTranslationData(path, signal, fallbackMessage) {
  const token = getAccessToken();
  let response;
  try {
    response = await fetch(`${API_URL}/translation-exercises/${path}`, {
      signal,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("Không thể kết nối máy chủ. Vui lòng thử lại.", { cause: error });
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || fallbackMessage);
  return data;
}

export function getTranslationExercises(parentId, signal) {
  return getTranslationData(`parents/${encodeURIComponent(parentId)}/exercises`, signal, "Không tải được danh sách bài tập.");
}

export function getTranslationExerciseContent(exerciseId, signal) {
  return getTranslationData(`${encodeURIComponent(exerciseId)}/content`, signal, "Không tải được nội dung bài tập.");
}

export async function submitTranslationAnswer(exerciseId, contentId, userResponse) {
  const token = getAccessToken();
  if (!token) throw new Error("Vui lòng đăng nhập để lưu tiến độ bài dịch.");

  let response;
  try {
    response = await fetch(`${API_URL}/translation-exercises/${encodeURIComponent(exerciseId)}/content/${encodeURIComponent(contentId)}/attempts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userResponse }),
    });
  } catch (error) {
    throw new Error("Không thể kết nối máy chủ. Vui lòng thử lại.", { cause: error });
  }

  const data = await response.json().catch(() => null);
  if (response.status === 401) {
    logout();
    throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  }
  if (!response.ok) throw new Error(data?.message || "Không thể nộp bản dịch.");
  return data;
}
