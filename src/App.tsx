import "./styles/App.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/AppHeader";
import { useTheme } from "./hooks/useTheme";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { checkSavedTheme } = useTheme();
  const { checkForSavedToken } = useAuth();

  useEffect(() => {
    checkSavedTheme();
    checkForSavedToken();
  }, []);

  return (
    <div className="app-container">
      <AppHeader />
      <div className="h-full w-full main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
