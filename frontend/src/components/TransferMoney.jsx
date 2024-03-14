import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useState } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { balance } from "../recoil/Balance";
import { transaction } from "../recoil/Transaction";
import { username } from "../recoil/User";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export function TransferMoney() {
  const [searchParams] = useSearchParams();
  const [deposit, setDeposit] = useState();
  const setBal = useSetRecoilState(balance);
  const setTrans = useSetRecoilState(transaction);
  const user = useRecoilValueLoadable(username);

  const [userName, setUserName] = useState(searchParams.get("username") || "");

  const handleUserNameChange = (value) => {
    const usernameWithoutAt = value.replace(/^@/, "");
    setUserName(usernameWithoutAt);
    const params = new URLSearchParams(searchParams);
    params.set("username", usernameWithoutAt);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`,
    );
  };
  if (user.state === "loading") {
    return (
      <div className=" relative flex  h-[211px] items-center justify-center shadow-lg ">
        <div role="status">
          <svg
            aria-hidden="true"
            className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-white p-2 shadow-lg">
      <InputBox
        label={"Username"}
        placeholder={"₹1234"}
        value={userName ? `@${userName}` : "@"}
        onChange={(e) => handleUserNameChange(e.target.value)}
      />
      <InputBox
        label={"Amount"}
        placeholder={"₹1234"}
        onChange={(e) => {
          setDeposit(e.target.value);
        }}
        variant={"number"}
      />
      <div className="flex flex-row justify-center p-2">
        <button
          className="text-md mt-2 flex h-10 items-center justify-center rounded-full bg-blue-600 px-4 font-medium tracking-wide text-white shadow-sm hover:bg-blue-800 focus:outline-red-500"
          onClick={async () => {
            const token = localStorage.getItem("token");
            const Authorization = `Bearer ${token}`;
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/account/transfer`,
                { to: userName, amount: parseInt(deposit) },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization,
                  },
                },
              );
              if (response.status === 200) {
                toast.success(response.data.message);
                setBal((prevBalance) => prevBalance - parseInt(deposit));
                const currentDate = new Date();
                const formattedDate = currentDate
                  .toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })
                  .replace(/^0/, "");

                const formattedTime = currentDate
                  .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })
                  .replace(/^0/, "");

                setTrans((c) => [
                  {
                    from: user.contents,
                    to: userName,
                    amount: parseInt(deposit),
                    date: [formattedDate, formattedTime],
                  },
                  ...c,
                ]);
              }
            } catch (error) {
              toast.error(error.response.data.message);
            }
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
