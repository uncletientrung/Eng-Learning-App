import API_URL from '../constant/apiConfig';
import { getAccessToken, logout } from './authApi';

async function authorizedRequest(path, options = {}) {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Vui lòng đăng nhập để lưu và chấm bài Speaking.');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    if (response.status === 401) {
      logout();
      const error = new Error(
        'Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.'
      );
      error.status = response.status;
      throw error;
    }

    throw new Error(data?.message || `Lỗi HTTP: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

export async function getSpeakingExercises() {
  const response = await fetch(
    `${API_URL}/speaking-exercises`
  );

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getSpeakingExercisesWithQuestions() {
  const response = await fetch(
    `${API_URL}/speaking-exercises/with-questions`
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

export function createSpeakingAttempt(exerciseId, startNewAttempt = false) {
  return authorizedRequest('/speaking-attempts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      exerciseId: Number(exerciseId),
      startNewAttempt,
    }),
  });
}

export function saveSpeakingAnswer(attemptId, questionId, transcript, audio) {
  const formData = new FormData();
  formData.append('transcript', transcript);
  formData.append('audio', audio, `answer-${questionId}.wav`);

  return authorizedRequest(
    `/speaking-attempts/${attemptId}/answers/${questionId}`,
    {
      method: 'PUT',
      body: formData,
    }
  );
}

export function submitSpeakingAttempt(attemptId) {
  return authorizedRequest(`/speaking-attempts/${attemptId}/submit`, {
    method: 'POST',
  });
}

export function getSpeakingAttempt(attemptId) {
  return authorizedRequest(`/speaking-attempts/${attemptId}`);
}

export function retrySpeakingGrading(attemptId) {
  return authorizedRequest(
    `/speaking-attempts/${attemptId}/retry-grading`,
    { method: 'POST' }
  );
}
