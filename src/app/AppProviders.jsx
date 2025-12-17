import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider.jsx";

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}
