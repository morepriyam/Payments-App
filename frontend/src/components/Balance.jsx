import { useRecoilValueLoadable } from "recoil";
import { balance } from "../recoil/Balance";
import { username } from "../recoil/User";

export function Balance() {
  const money = useRecoilValueLoadable(balance);
  const user = useRecoilValueLoadable(username);

  if (money.state === "loading" || user.state === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-full flex-col justify-center gap-3 rounded-lg  bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="px-2 tracking-wide  text-blue-500">@{user.contents}</div>
      <div className="px-2 text-sm  font-light tracking-wide text-zinc-800">
        Balance
      </div>

      <div className="px-2 text-3xl font-bold tracking-wide">
        ₹{money.contents}
      </div>
    </div>
  );
}
