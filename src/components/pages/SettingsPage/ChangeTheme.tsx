import { useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";

const ChangeTheme = () => {
  const { selectedTheme, checkSavedTheme, changeTheme } = useTheme();

  useEffect(() => {
    checkSavedTheme();
  }, []);

  return (
    <div className="theme-select">
      <label htmlFor="select-theme" hidden>
        CAMBIAR
      </label>
      <select
        id="select-theme"
        name="select-app-theme"
        className="standard-select"
        value={selectedTheme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        <option value="dark">Oscuro</option>
        <option value="light">Claro</option>
      </select>
    </div>
  );
};

export default ChangeTheme;
