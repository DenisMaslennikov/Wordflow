import { useContext } from "react";

import { AuthContext } from "../context/Auth/AuthContext.ts";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthuseAuthContext must be used within AuthProvider");
  return context;
}

export default useAuth;
