import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useRecoilValueLoadable } from "recoil";
import { isAuthenticatedState } from "../recoil/Auth";
import { useNavigate } from "react-router-dom";
import { balance } from "../recoil/Balance";

export function Dashboard() {
  const navigate = useNavigate();
  const authLoadable = useRecoilValueLoadable(isAuthenticatedState);
  const money = useRecoilValueLoadable(balance);

  useEffect(() => {
    if (authLoadable.state === "hasValue" && !authLoadable.contents) {
      navigate("/signin");
    }
  }, [authLoadable, navigate]);

  if (authLoadable.state === "loading" || money.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <div className="px-5 pt-2 text-2xl ">Dashboard{money.contents}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
