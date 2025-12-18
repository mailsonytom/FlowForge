import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider.jsx";
import { Provider } from "react-redux";
import { store } from "../store";

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}
