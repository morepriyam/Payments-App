import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useState } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { balance } from "../recoil/Balance";
import { transaction } from "../recoil/Transaction";
import { username } from "../recoil/User";
import { toast } from "react-toastify";
import { Cardloader } from "./CardLoader";

export function AddMoney() {
  const [deposit, setDeposit] = useState();
  const setBal = useSetRecoilState(balance);
  const setTrans = useSetRecoilState(transaction);
  const user = useRecoilValueLoadable(username);
  if (user.state === "loading") {
    return <Cardloader />;
  }
  return (
    <div className="flex w-full flex-col justify-evenly rounded-lg bg-white p-2 shadow-lg">
      <div className="pb-2 text-sm  font-normal  tracking-wide text-zinc-800">
        Add Money:
      </div>
      <div>
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
            className="text-md  flex h-10 items-center justify-center rounded-full bg-blue-600 px-8 font-medium tracking-wide text-white shadow-sm hover:bg-blue-800"
            onClick={async () => {
              const token = localStorage.getItem("token");
              const Authorization = `Bearer ${token}`;
              try {
                const response = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/account/deposit`,
                  { amount: parseInt(deposit) },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization,
                    },
                  },
                );
                if (response.status === 200) {
                  toast.success(response.data.message);
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
                toast.error(error.response.data.message);
              }
            }}
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
