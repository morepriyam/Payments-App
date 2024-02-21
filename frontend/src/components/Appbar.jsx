import { useNavigate } from "react-router-dom";
import { profileImage } from "../recoil/User";
import { useRecoilValueLoadable } from "recoil";

export function Appbar() {
  const profile = useRecoilValueLoadable(profileImage);
  if (profile.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-between border-b  border-zinc-300 bg-white px-5 pb-2 pt-2">
      <div className="text-nowrap text-2xl font-bold tracking-wide text-blue-600 hover:text-blue-500">
        Payments-App
      </div>
      <img
        className="text-md w-10 cursor-pointer rounded-full bg-blue-600 font-medium tracking-widest text-white shadow-sm hover:bg-blue-700"
        src={profile.contents}
      />
    </div>
  );
}
