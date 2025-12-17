import { useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);
    navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
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
