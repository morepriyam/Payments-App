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
    <div className="flex w-full flex-col justify-center gap-3 rounded-lg border border-blue-500 bg-white shadow-md">
      <div className="px-2 tracking-wide  text-blue-500">@{user.contents}</div>
      <div className="px-2 text-sm font-bold tracking-wide text-zinc-800">
        Balance
      </div>

      <div className="px-2 text-3xl font-bold tracking-wide">
        ₹{money.contents}
      </div>
    </div>
  );
}
