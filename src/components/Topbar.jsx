import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function TopBar({ title }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b bg-white">
      <h1 className="text-lg font-semibold">{title}</h1>

      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-gray-200 rounded text-sm cursor-pointer hover:bg-gray-300 transition"
      >
        Logout
      </button>
    </header>
  );
}
