import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { user, userRefresh } from "../recoil/User";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import axios from "axios";

export function Profilecard() {
  const profile = useRecoilValueLoadable(user);
  const setRefreshUser = useSetRecoilState(userRefresh);
  return (
    <div className="flex flex-col rounded-lg bg-gradient-to-r from-sky-200 to-indigo-200 text-black shadow-md">
      <div className="flex flex-col items-center gap-1 p-3 text-center sm:gap-8">
        <div className="relative">
          <img
            src={profile.contents.imageURL}
            className="h-24 rounded-full border-2 border-blue-500 bg-white p-1 text-sm sm:h-36 md:h-36"
            alt="Profile Image"
          ></img>
          <div className="absolute right-[6px] top-[6px] flex sm:right-[17px] sm:top-[12px]">
            <ArrowPathIcon
              className="h-5 w-5 cursor-pointer rounded-full bg-white hover:bg-blue-100"
              onClick={async () => {
                const token = localStorage.getItem("token");
                const Authorization = `Bearer ${token}`;
                try {
                  const response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/user`,
                    {
                      imageURL:
                        "https://ui-avatars.com/api/?name=" +
                        profile.contents.username +
                        "&size=250&background=3866e3&color=ffffff",
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization,
                      },
                    },
                  );
                  if (response.status === 200) {
                    toast.info("Profile Picture Reset!");
                    setRefreshUser((value) => value + 1);
                  }
                } catch (error) {
                  toast.error(error.response.data.message);
                }
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-blue-600 sm:text-2xl">
            @{profile.contents.username}
          </div>
          <div className="text-nowrap text-lg font-semibold sm:text-xl md:text-2xl ">
            {profile.contents.firstName} {profile.contents.lastName}
          </div>
          <div className="text-nowrap text-sm font-normal sm:text-lg md:text-xl">
            {profile.contents.email}
          </div>
          <div className="text-nowrap text-sm font-normal sm:text-lg md:text-xl">
            +91-{profile.contents.phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
