import { useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

const STORAGE_KEY = "flowforge_auth";

function getStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const storedAuth = getStoredAuth();
  const [user, setUser] = useState(storedAuth?.user || null);
  const [token, setToken] = useState(storedAuth?.token || null);

  const login = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token: jwt, user: userData })
    );
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
