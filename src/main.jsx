import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import { AppProviders } from "./app/AppProviders.jsx";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
