import API_URL from '../constant/apiConfig';

export async function getSpeakingExercises() {
  const response = await fetch(
    `${API_URL}/speaking-exercises`
  );

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getSpeakingExerciseById(id) {
  const response = await fetch(
    `${API_URL}/speaking-exercises/${id}`
  );

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}

