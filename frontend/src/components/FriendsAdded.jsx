import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export function Friendsadded({ user }) {
  const navigate = useNavigate();

  return (
    <div className="my-1 flex justify-between rounded-md border  bg-white  p-1 shadow-lg hover:bg-blue-50">
      <div className="flex items-center">
        <img
          src={user.imageURL}
          className="flex h-7 w-7 rounded-full"
          style={{ width: "28px", height: "28px" }}
          alt="Profile Image"
        />

        <div className="pl-3 text-sm text-blue-700 hover:text-blue-500 sm:text-lg md:text-xl">
          @{user.username}
        </div>
        <div className="text-nowrap pl-3 text-xs text-orange-700 hover:text-orange-500 sm:text-sm md:text-lg">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div>
        <button
          aria-label="Send Money"
          className="flex items-center justify-center rounded-md bg-green-600 p-1 text-white hover:bg-green-500 focus:outline-red-500"
          onClick={() => {
            navigate("/send?username=" + user.username);
          }}
          label={"Send Money"}
        >
          <CurrencyRupeeIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
