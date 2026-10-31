import API_URL from "../constant/apiConfig";
import { logout } from "./authApi";

export async function gradeWriting(exerciseId, userResponse, token) {
  const response = await fetch(`${API_URL}/writing-grading`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ["Bearer", token].join(" "),
    },
    body: JSON.stringify({
      exerciseId,
      userResponse,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      const error = new Error(
        "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại."
      );
      error.status = response.status;
      throw error;
    }

    throw new Error(data?.message || `Lỗi HTTP: ${response.status}`);
  }

  return {
    ...data,
    processingTimeMs: Number(
      response.headers.get("X-Writing-Grading-Duration-Ms")
    ) || null,
  };
}