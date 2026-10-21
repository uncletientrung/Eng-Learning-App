import API_URL from '../constant/apiConfig';

export async function getWritingExercises() {
  const response = await fetch(
    `${API_URL}/writing-exercises`
  );

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getWritingExerciseById(id) {
  const response = await fetch(
    `${API_URL}/writing-exercises/${id}`
  );

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}

