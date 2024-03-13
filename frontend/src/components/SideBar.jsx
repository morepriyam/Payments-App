import { NavLink } from "./NavLink";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ChartPieIcon,
  BanknotesIcon,
  UserPlusIcon,
  CurrencyRupeeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  BackwardIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export function Sidebar() {
  const [open, setOpen] = useState(window.innerWidth > 768);
  const setAuth = useSetRecoilState(tokenState);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    {
      label: "Dashboard",
      icon: <ChartPieIcon className="h-6 w-6 text-yellow-500" />,
      src: "/dashboard",
    },

    {
      label: "Transactions",
      icon: <BanknotesIcon className="h-6 w-6 text-purple-500" />,
      src: "/transactions",
    },

    {
      label: "Friends",
      icon: <UserPlusIcon className="h-6 w-6 text-blue-500" />,
      src: "/friends",
    },

    {
      label: "SendMoney",
      icon: <CurrencyRupeeIcon className="h-6 w-6 text-green-500" />,
      src: "/send",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen border-r border-zinc-300 bg-white p-5 pt-8 ${open ? "w-44" : "w-20"} relative duration-300`}
    >
      <BackwardIcon
        className={`absolute -right-[14px] top-10 h-7 w-7 cursor-pointer rounded-full border
      border-white bg-blue-600 p-1 text-3xl text-white ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <ul className="space-y-2 font-medium">
        {navLinks.map((link, index) => (
          <NavLink open={open} key={index} {...link} />
        ))}
      </ul>
      <div className="mt-4 border-t border-slate-300">
        <div
          className="mt-4 flex cursor-pointer items-center  rounded-2xl px-2 py-3 hover:bg-blue-50"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <UserIcon className="h-6 w-6 text-blue-500 " />
          <span
            className={`ml-3 ${!open && "hidden"} font-medium text-zinc-800 duration-100`}
          >
            Profile
          </span>
        </div>
        <div
          className="flex cursor-pointer items-center  rounded-2xl px-2 py-3 hover:bg-blue-50"
          onClick={() => {
            localStorage.removeItem("token");
            setAuth("");
            toast.info("Logged Out");
            navigate("/signin");
          }}
        >
          <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-red-500 " />
          <span
            className={`ml-3 ${!open && "hidden"} font-medium text-zinc-800 duration-100`}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
