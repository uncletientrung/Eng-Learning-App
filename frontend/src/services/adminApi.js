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
    const error = new Error(data?.message || `Yêu cầu thất bại (HTTP ${response.status}).`);
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
