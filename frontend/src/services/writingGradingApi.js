import API_URL from "../constant/apiConfig";
import { logout } from "./authApi";

async function authorizedRequest(url, options, fallbackMessage) {
  const response = await fetch(url, options);
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

    throw new Error(data?.message || `${fallbackMessage} (HTTP ${response.status})`);
  }

  return data;
}

export async function gradeWriting(exerciseId, userResponse, token) {
  return authorizedRequest(`${API_URL}/writing-grading`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ["Bearer", token].join(" "),
    },
    body: JSON.stringify({
      exerciseId,
      userResponse,
    }),
  }, "Không thể chấm bài");
}

export async function getWritingHistory(token) {
  return authorizedRequest(`${API_URL}/writing-grading/history`, {
    headers: {
      Authorization: ["Bearer", token].join(" "),
    },
  }, "Không thể tải lịch sử Writing");
}

export async function getUnattemptedWritingExerciseIds(token) {
  return authorizedRequest(
    `${API_URL}/writing-grading/unattempted-exercise-ids`,
    {
      headers: {
        Authorization: ["Bearer", token].join(" "),
      },
    },
    "Không thể tải danh sách bài chưa làm"
  );
}

export async function getWritingHistoryAttempt(attemptId, token) {
  return authorizedRequest(
    `${API_URL}/writing-grading/history/${attemptId}`,
    {
      headers: {
        Authorization: ["Bearer", token].join(" "),
      },
    },
    "Không thể tải lượt làm Writing"
  );
}

export async function deleteWritingHistoryAttempt(attemptId, token) {
  return authorizedRequest(
    `${API_URL}/writing-grading/history/${attemptId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: ["Bearer", token].join(" "),
      },
    },
    "Không thể xóa lượt làm Writing"
  );
}