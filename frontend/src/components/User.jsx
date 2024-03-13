import { CurrencyRupeeIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { refreshTrigger } from "../recoil/Friend";
import { useSetRecoilState } from "recoil";

export function User({ user }) {
  const navigate = useNavigate();
  const setRefreshTrigger = useSetRecoilState(refreshTrigger);

  return (
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 59px)" }}
    >
      <div className="my-1 flex justify-between rounded-md border  bg-white  p-1 shadow-lg hover:bg-blue-50">
        <div className="flex items-center">
          <img
            src={user.imageURL}
            className="flex h-7 w-7 rounded-full"
            style={{ width: "28px", height: "28px" }}
          />

          <div className="pl-3 text-blue-500">@{user.username}</div>
          <div className="pl-3">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className=" flex items-center justify-center rounded-md bg-blue-600 p-1 text-white"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                const Authorization = `Bearer ${token}`;
                const response = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/user/addfriend`,
                  { username: user.username },
                  {
                    headers: {
                      Authorization,
                    },
                  },
                );
                if (response.status === 200) {
                  toast.success(response.data.message);
                  setRefreshTrigger((value) => value + 1);
                }
              } catch (error) {
                toast.error(error.response.data.message);
              }
            }}
            label={"Add Friend"}
          >
            <UserPlusIcon className="h-5 w-5" />
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-green-500 p-1 text-white"
            onClick={() => {
              navigate("/send?username=" + user.username);
            }}
            label={"Send Money"}
          >
            <CurrencyRupeeIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
