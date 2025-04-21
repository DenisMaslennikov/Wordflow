import DarkModeContext from "../context/DarkMode/DarkModeContext.ts";
import { useContext } from "react";

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within DarkModeContext");
  return context;
}

export default useDarkMode;
