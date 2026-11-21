import API_URL from "../constant/apiConfig";
import { getAccessToken, logout } from "./authApi";

async function request(path, options = {}) {
  const token = getAccessToken();
  const response = await fetch(`${API_URL}/admin${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    const validation = data?.errors ? Object.values(data.errors).flat().join(" ") : "";
    const error = new Error(data?.message || validation || `Yêu cầu thất bại (HTTP ${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return data;
}

function queryString(params) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) search.set(key, value);
  });
  const serialized = search.toString();
  return serialized ? `?${serialized}` : "";
}

export const getAdminDashboard = () => request("/dashboard");
export const getAdminUsers = (params) => request(`/users${queryString(params)}`);
export const getAdminUser = (id) => request(`/users/${id}`);
export const createAdminUser = (data) =>
  request("/users", { method: "POST", body: JSON.stringify(data) });
export const updateAdminUserProfile = (id, data) =>
  request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const updateAdminUserStatus = (id, isActive) =>
  request(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });
export const getAdminTopics = (params) => request(`/topics${queryString(params)}`);
export const getAdminTopic = (id) => request(`/topics/${id}`);
export const createAdminTopic = (data) =>
  request("/topics", { method: "POST", body: JSON.stringify(data) });
export const updateAdminTopic = (id, data) =>
  request(`/topics/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const updateAdminTopicStatus = (id, isActive) =>
  request(`/topics/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });
export const deleteAdminTopic = (id) => request(`/topics/${id}`, { method: "DELETE" });
export const getAdminVocabularySets = (params) => request(`/vocabulary/sets${queryString(params)}`);
export const getAdminVocabularySet = (id) => request(`/vocabulary/sets/${id}`);
export const createAdminVocabularySet = (data) =>
  request("/vocabulary/sets", { method: "POST", body: JSON.stringify(data) });
export const updateAdminVocabularySet = (id, data) =>
  request(`/vocabulary/sets/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAdminVocabularySet = (id) => request(`/vocabulary/sets/${id}`, { method: "DELETE" });
export const getAdminVocabularyWords = (id, params) => request(`/vocabulary/sets/${id}/words${queryString(params)}`);
export const getAdminVocabularyWord = (id, wordId) => request(`/vocabulary/sets/${id}/words/${wordId}`);
export const createAdminVocabularyWord = (id, data) =>
  request(`/vocabulary/sets/${id}/words`, { method: "POST", body: JSON.stringify(data) });
export const updateAdminVocabularyWord = (id, wordId, data) =>
  request(`/vocabulary/sets/${id}/words/${wordId}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAdminVocabularyWord = (id, wordId) =>
  request(`/vocabulary/sets/${id}/words/${wordId}`, { method: "DELETE" });
export const getAdminWritingExercises = (params) =>
  request(`/writing${queryString(params)}`);
export const getAdminWritingExercise = (id) => request(`/writing/${id}`);
export const createAdminWritingExercise = (data) =>
  request("/writing", { method: "POST", body: JSON.stringify(data) });
export const updateAdminWritingExercise = (id, data) =>
  request(`/writing/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const updateAdminWritingStatus = (id, status) =>
  request(`/writing/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
export const deleteAdminWritingExercise = (id) =>
  request(`/writing/${id}`, { method: "DELETE" });
export const getAdminWritingSubmissions = (params) =>
  request(`/writing/submissions${queryString(params)}`);
export const getAdminWritingSubmission = (id) =>
  request(`/writing/submissions/${id}`);
export const updateAdminWritingSubmission = (id, data) =>
  request(`/writing/submissions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteAdminWritingSubmission = (id) =>
  request(`/writing/submissions/${id}`, { method: "DELETE" });

export const getAdminSpeakingExercises = (params) =>
  request(`/speaking/exercises${queryString(params)}`);
export const getAdminSpeakingExercise = (id) =>
  request(`/speaking/exercises/${id}`);
export const createAdminSpeakingExercise = (data) =>
  request("/speaking/exercises", { method: "POST", body: JSON.stringify(data) });
export const updateAdminSpeakingExercise = (id, data) =>
  request(`/speaking/exercises/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const updateAdminSpeakingExerciseStatus = (id, isActive) =>
  request(`/speaking/exercises/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });
export const deleteAdminSpeakingExercise = (id) =>
  request(`/speaking/exercises/${id}`, { method: "DELETE" });
export const getAdminSpeakingSubmissions = (params) =>
  request(`/speaking/submissions${queryString(params)}`);
export const getAdminSpeakingSubmission = (id) =>
  request(`/speaking/submissions/${id}`);
export const updateAdminSpeakingSubmission = (id, data) =>
  request(`/speaking/submissions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteAdminSpeakingSubmission = (id) =>
  request(`/speaking/submissions/${id}`, { method: "DELETE" });
export const retryAdminSpeakingGrading = (id) =>
  request(`/speaking/submissions/${id}/retry-grading`, { method: "POST" });

export async function getAdminSpeakingAudio(answerId) {
  const response = await fetch(
    `${API_URL}/admin/speaking/answers/${answerId}/audio`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } },
  );
  if (!response.ok) {
    if (response.status === 401) logout();
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || `Không thể tải audio (HTTP ${response.status}).`);
  }
  return response.blob();
}
