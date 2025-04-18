import DarkModeContext from "../context/DarkMode/DarkModeContext.ts";
import { useContext } from "react";

function useDarkMode() {
  return useContext(DarkModeContext);
}

export default useDarkMode;
