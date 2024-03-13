import { useRecoilValueLoadable } from "recoil";
import { user } from "../recoil/User";

export function Profilecard() {
  const profile = useRecoilValueLoadable(user);
  return (
    <div className="flex flex-col rounded-lg bg-gradient-to-r from-sky-200 to-indigo-200 text-black shadow-md">
      <div className="flex flex-col items-center gap-6 p-3 text-center sm:gap-8">
        <img
          src={profile.contents.imageURL}
          className="mt-7 h-28 rounded-full border-2 border-blue-500 bg-white p-1 text-sm sm:h-40"
          alt="profile picture"
        />
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold sm:text-2xl">
            @{profile.contents.username}
          </div>
          <div className="text-nowrap text-xl font-semibold sm:text-2xl">
            {profile.contents.firstName} {profile.contents.lastName}
          </div>
          <div className="text-lg font-normal text-blue-500 sm:text-xl">
            {profile.contents.email}
          </div>
          <div className="text-nowrap text-lg font-normal sm:text-xl">
            +91-{profile.contents.phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
