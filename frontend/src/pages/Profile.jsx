import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import { Profilecard } from "../components/ProfileCard";
import { Profileupdate } from "../components/ProfileUpdate";

export function Profile() {
  const authLoadable = useAuth();
  if (authLoadable.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-[100dvh] flex-1 bg-neutral-100">
          <Appbar />
          <div className="grid-cols-5 gap-3 p-2 sm:grid">
            <div className="col-span-2">
              <Profilecard />
            </div>
            <Profileupdate />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
