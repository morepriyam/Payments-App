import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export function Friendsadded({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 59px)" }}
    >
      <div className="mt-1 flex justify-between rounded-md border  bg-white  p-1 shadow-lg hover:bg-blue-50">
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
        <div>
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
