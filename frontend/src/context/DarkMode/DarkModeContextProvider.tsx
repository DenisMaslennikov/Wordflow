import { ReactNode, useEffect } from "react";

import useLocalStorageState from "../../hooks/useLocalStorageState.ts";
import DarkModeContext from "./DarkModeContext.ts";

function DarkModeContextProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark-mode)").matches,
    "isDarkMode",
  );

  function toggleDarkMode() {
    setIsDarkMode((state) => !state);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContextProvider;
