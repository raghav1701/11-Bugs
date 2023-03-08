import { createContext, useState } from "react";

export const ThemeChangeContext = createContext();

const getTheme = () => {
  return localStorage.getItem("mode") || "light";
};

// Theme Change
export const ThemeChangeProvider = ({ children }) => {
  const [mode, setMode] = useState(getTheme());

  const changeMode = () => {
    setMode((prev) => {
      let nMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("mode", nMode);
      return nMode;
    });
  };

  return (
    <ThemeChangeContext.Provider value={[mode, changeMode]}>
      {children}
    </ThemeChangeContext.Provider>
  );
};
