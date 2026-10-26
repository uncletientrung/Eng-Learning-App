const API_URL = "http://localhost:5167/api/writing-grading";

export async function gradeWriting(exerciseId, userResponse, token) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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