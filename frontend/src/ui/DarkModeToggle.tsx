import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon.tsx";
import useDarkMode from "../hooks/useDarkMode.ts";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon
      onClick={toggleDarkMode}
      $width={"2.2rem"}
      $height={"2.2rem"}
      $padding={"0.5rem"}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
