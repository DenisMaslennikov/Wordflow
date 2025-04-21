import { useContext } from "react";

import { AuthContext } from "../context/Auth/AuthContext.ts";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
