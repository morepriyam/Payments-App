import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useState } from "react";
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
import { balance } from "../recoil/Balance";
import { transaction } from "../recoil/Transaction";
import { username } from "../recoil/User";
import { useSearchParams } from "react-router-dom";

export function TransferMoney() {
  const [searchParams] = useSearchParams();
  const [deposit, setDeposit] = useState();
  const [bal, setBal] = useRecoilStateLoadable(balance);
  const [trans, setTrans] = useRecoilStateLoadable(transaction);
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
  if (
    bal.state === "loading" ||
    trans.state === "loading" ||
    user.state === "loading"
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full rounded-lg border border-blue-500 bg-white p-2 shadow-md">
      <input
        name="input"
        value={userName ? `@${userName}` : "@"}
        placeholder="@username"
        className="w-full rounded-md border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none "
        onChange={(e) => handleUserNameChange(e.target.value)}
      />
      <InputBox
        placeholder={"₹5000 max"}
        onChange={(e) => {
          setDeposit(e.target.value);
        }}
        variant={"number"}
      />
      <div className="flex flex-row justify-center p-2">
        <button
          className="text-md flex h-10 items-center justify-center rounded-full bg-blue-600 px-4 font-medium tracking-wide text-white shadow-sm hover:bg-blue-800"
          onClick={async () => {
            const token = localStorage.getItem("token");
            const Authorization = `Bearer ${token}`;
            try {
              await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                { to: userName, amount: parseInt(deposit) },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization,
                  },
                },
              );
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
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
