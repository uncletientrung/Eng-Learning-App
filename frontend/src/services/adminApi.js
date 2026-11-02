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
