const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function apiClient(
  endpoint,
  { method = "GET", body, token, user } = {}
) {
  const headers = {
    "Content-Type": "application/json",
  };

  // JWT (auth)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // User identity (for membership & visibility)
  if (user) {
    headers["x-user-id"] = user.id;
    headers["x-user-role"] = user.role;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = "API Error";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // ignore JSON parse failure
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
