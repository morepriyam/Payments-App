import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { useRecoilValueLoadable } from "recoil";
import { friends } from "../recoil/Friend";

export function Friends() {
  const authLoadable = useAuth();
  const friend = useRecoilValueLoadable(friends);
  if (authLoadable.state === "loading" || friend.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <div className="grid p-2 sm:grid-cols-3">Friends</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
