import { CurrencyRupeeIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Friend({ user }) {
  const navigate = useNavigate();

  return (
    <div className="my-1 flex justify-between rounded-md border  bg-white p-1  shadow-lg hover:bg-blue-50">
      <div className="flex items-center">
        <img
          src={user.imageURL}
          style={{ width: "28px", height: "28px" }}
          className="flex h-7 w-7 rounded-full"
          alt="Profile Image"
        />

        <div className="pl-3 text-sm text-blue-700 hover:text-blue-500 sm:text-lg md:text-xl">
          @{user.username}
        </div>
        <div className="text-nowrap pl-3 text-xs text-orange-700 hover:text-orange-500 sm:flex md:text-base">
          <div>{user.firstName}</div>{" "}
          <div className="sm:ml-1">{user.lastName}</div>
        </div>
        <div className="text-nowrap pl-3 text-xs text-green-500 lg:flex lg:text-base">
          <div>{user.email}</div>{" "}
          <div className="lg:ml-2">+91-{user.phoneNumber}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          aria-label="Send Message"
          className=" flex items-center justify-center rounded-md bg-blue-600 p-1 text-white hover:bg-blue-500 focus:outline-red-500"
          onClick={() => {
            toast.info("Feature Coming Soon");
          }}
          label={"SendMessage"}
        >
          <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          aria-label="Send Money"
          className="flex items-center justify-center rounded-md bg-green-600 p-1 text-white hover:bg-green-500 focus:outline-red-500"
          onClick={() => {
            navigate("/send?username=" + user.username);
          }}
          label={"Send Money"}
        >
          <CurrencyRupeeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
}
