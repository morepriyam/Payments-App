import { Link } from "react-router-dom";
import { profileImage } from "../recoil/User";
import { useRecoilValueLoadable } from "recoil";

export function Appbar() {
  const profile = useRecoilValueLoadable(profileImage);
  if (profile.state === "loading") {
    return (
      <div className="flex items-center justify-between border-b  border-zinc-300 bg-white px-5 pb-2 pt-2">
        <div className="text-nowrap text-2xl font-bold tracking-wide text-blue-600 hover:text-blue-500">
          Payments-App
        </div>
        <div className="loader">
          <div className="h-10 w-10 rounded-full bg-gray-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-b  border-zinc-300 bg-white px-5 pb-2 pt-2">
      <div className="text-nowrap text-2xl font-bold tracking-wide text-blue-600 hover:text-blue-500">
        Payments-App
      </div>
      <Link
        to={"/profile"}
        aria-label="Profile Page"
        className="rounded-full bg-blue-500 p-[1px]"
      >
        <img
          alt="user image"
          className="text-md h-10 rounded-full bg-white p-[2px] font-medium tracking-widest text-white shadow-sm"
          src={profile.contents}
          style={{ width: "40px", height: "40px" }}
        />
      </Link>
    </div>
  );
}
