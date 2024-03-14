import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { balRefreshTrigger, balance } from "../recoil/Balance";
import { username } from "../recoil/User";
import { Cardloader } from "./CardLoader";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export function Balance() {
  const money = useRecoilValueLoadable(balance);
  const user = useRecoilValueLoadable(username);
  const refresh = useSetRecoilState(balRefreshTrigger);

  if (money.state === "loading" || user.state === "loading") {
    return <Cardloader />;
  }
  return (
    <div className="relative flex w-full flex-col justify-evenly rounded-lg  bg-white shadow-lg">
      <div className="absolute right-2 top-2 flex">
        <ArrowPathIcon
          className="h-5 w-5 cursor-pointer rounded-full hover:bg-blue-100"
          onClick={() => {
            refresh((value) => value + 1);
            toast.info("Updating Balance");
          }}
        />
      </div>
      <div>
        <div className="px-2 text-sm font-normal tracking-wide text-zinc-800">
          Username:
        </div>
        <div className="px-2 tracking-wide text-blue-700 hover:text-blue-500">
          @{user.contents}
        </div>
      </div>
      <div>
        <div className="px-2 text-sm  font-normal  tracking-wide text-zinc-800">
          Balance:
        </div>
        <div className="px-2 text-3xl font-bold tracking-wide">
          ₹{money.contents}
        </div>
      </div>
    </div>
  );
}
