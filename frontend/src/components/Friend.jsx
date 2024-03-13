import { CurrencyRupeeIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Friend({ user }) {
  const navigate = useNavigate();

  return (
    <div className="mt-1 flex justify-between rounded-md border  bg-white p-1  shadow-lg hover:bg-blue-50">
      <div className="flex items-center">
        <img
          src={user.imageURL}
          style={{ width: "28px", height: "28px" }}
          className="flex h-7 w-7 rounded-full"
        />

        <div className="pl-3 text-blue-500">@{user.username}</div>
        <div className="pl-3">
          {user.firstName} {user.lastName}
        </div>
        <div className="pl-3">
          {user.email} {user.phoneNumber}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className=" flex items-center justify-center rounded-md bg-blue-600 p-1 text-white"
          onClick={() => {
            toast.info("Feature Coming Soon");
          }}
          label={"SendMessage"}
        >
          <EnvelopeIcon className="h-5 w-5" />
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
  );
}
