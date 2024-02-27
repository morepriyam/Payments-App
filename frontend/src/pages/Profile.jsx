import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { useRecoilValueLoadable } from "recoil";
import { user } from "../recoil/User";

export function Profile() {
  const profile = useRecoilValueLoadable(user);
  const authLoadable = useAuth();
  if (authLoadable.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <div className="grid grid-cols-2 gap-3 p-2">
            <div className="flex flex-col rounded-lg bg-white text-gray-700 shadow-md">
              <div className="flex flex-col items-center text-center">
                <img
                  src={profile.contents.imageURL}
                  className="h-20 rounded-full border-2 border-blue-500 bg-white p-1"
                  alt="profilePic"
                />
                <div className="flex items-center justify-center gap-x-10 px-10">
                  <b>@{profile.contents.username}</b>
                </div>
                <div className="px-10 text-sm font-light">
                  {profile.contents.firstName}
                  {profile.contents.lastName}
                </div>
                <div className="px-10 text-sm font-light">
                  {profile.contents.email}
                </div>
                <div className="px-10 text-sm font-light">
                  {profile.contents.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
