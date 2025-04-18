import { SetStateAction, Dispatch, useState, useEffect } from "react";

function useLocalStorageState<T>(
  initialState: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    const storedString = localStorage.getItem(key);
    return storedString ? JSON.parse(storedString) : initialState;
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(state)),
    [state, key],
  );

  return [state, setState];
}

export default useLocalStorageState;
