import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { isAuthenticatedState } from "../recoil/Auth";

export function useAuth() {
  const navigate = useNavigate();
  const authLoadable = useRecoilValueLoadable(isAuthenticatedState);

  useEffect(() => {
    if (authLoadable.state === "hasValue" && !authLoadable.contents) {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  }, [authLoadable, navigate]);

  return authLoadable;
}
