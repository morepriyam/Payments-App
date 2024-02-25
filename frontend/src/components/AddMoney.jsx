import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useState } from "react";
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
import { balance } from "../recoil/Balance";
import { transaction } from "../recoil/Transaction";
import { username } from "../recoil/User";

export function AddMoney() {
  const [deposit, setDeposit] = useState();
  const [bal, setBal] = useRecoilStateLoadable(balance);
  const [trans, setTrans] = useRecoilStateLoadable(transaction);
  const user = useRecoilValueLoadable(username);
  if (
    bal.state === "loading" ||
    trans.state === "loading" ||
    user.state === "loading"
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full rounded-lg border border-blue-500 bg-white p-2 shadow-md">
      <InputBox
        label={"Deposit"}
        placeholder={"₹5000 max"}
        onChange={(e) => {
          setDeposit(e.target.value);
        }}
        variant={"number"}
      />
      <div className="flex flex-row justify-center p-2">
        <button
          className="text-md flex h-10 items-center justify-center rounded-full bg-blue-600 px-8 font-medium tracking-wide text-white shadow-sm hover:bg-blue-800"
          onClick={async () => {
            const token = localStorage.getItem("token");
            const Authorization = `Bearer ${token}`;
            try {
              const response = await axios.post(
                "http://localhost:3000/api/v1/account/deposit",
                { amount: parseInt(deposit) },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization,
                  },
                },
              );
              if (response.status === 200) {
                setBal(response.data.balance);
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
                    from: "admin",
                    to: user.contents,
                    amount: parseInt(deposit),
                    date: [formattedDate, formattedTime],
                  },
                  ...c,
                ]);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Deposit
        </button>
      </div>
    </div>
  );
}
