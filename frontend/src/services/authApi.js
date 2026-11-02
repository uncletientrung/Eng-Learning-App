import API_URL from "../constant/apiConfig";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "authUser";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || `Lỗi HTTP: ${response.status}`);
  }

  if (!data?.accessToken) {
    throw new Error("Phản hồi đăng nhập không có access token.");
  }

  sessionStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
  sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
  window.dispatchEvent(new Event("auth-changed"));
  return data;
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function logout() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("auth-changed"));
}

export function getCurrentUser() {
  try { return JSON.parse(sessionStorage.getItem(USER_KEY) || "null"); }
  catch { return null; }
}

export function getTokenExpiresAt(token = getAccessToken()) {
  try {
    const encoded = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")));
    return typeof exp === "number" ? exp * 1000 : 0;
  } catch { return 0; }
}

export function getAuthenticatedToken() {
  const token = getAccessToken();
  return getTokenExpiresAt(token) > Date.now() ? token : null;
}

export function subscribeAuth(callback) {
  window.addEventListener("auth-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("auth-changed", callback);
    window.removeEventListener("storage", callback);
  };
}
