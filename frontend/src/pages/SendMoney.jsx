import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useRecoilValueLoadable } from "recoil";
import { isAuthenticatedState } from "../recoil/Auth";
import { useNavigate } from "react-router-dom";

export function SendMoney() {
  const navigate = useNavigate();
  const authLoadable = useRecoilValueLoadable(isAuthenticatedState);

  useEffect(() => {
    if (authLoadable.state === "hasValue" && !authLoadable.contents) {
      navigate("/signin");
    }
  }, [authLoadable, navigate]);

  if (authLoadable.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <div className="grid p-2 sm:grid-cols-3">SendMoney</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
