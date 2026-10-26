import API_URL from "../constant/apiConfig";

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
    throw new Error(
      data?.message || `Lỗi HTTP: ${response.status}`
    );
  }

  return data;
}