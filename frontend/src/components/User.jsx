import { CurrencyRupeeIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function User({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 59px)" }}
    >
      <div className="mt-2 flex justify-between rounded-md border  bg-white  p-1 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className="flex items-center">
          <img src={user.imageURL} className="flex h-7 w-7 rounded-full" />

          <div className="pl-3 text-blue-500">@{user.username}</div>
          <div className="pl-3 text-green-500">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className=" flex items-center justify-center rounded-md bg-blue-600 p-1 text-white"
            onClick={() => {
              const token = localStorage.getItem("token");
              const Authorization = `Bearer ${token}`;
              axios.post(
                "http://localhost:3000/api/v1/user/addfriend",
                { username: user.username },
                {
                  headers: {
                    Authorization,
                  },
                },
              );
            }}
            label={"Add Friend"}
          >
            <UserPlusIcon className="h-5 w-5" />
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-blue-600 p-1 text-white"
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
