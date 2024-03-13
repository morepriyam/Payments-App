import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import { Friendsection } from "../components/FriendSection";

export function Friends() {
  const authLoadable = useAuth();
  if (authLoadable.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <Friendsection />
        </div>
      </div>
      <Footer />
    </>
  );
}
