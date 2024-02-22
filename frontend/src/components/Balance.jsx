import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { balance } from "../recoil/Balance";

const Balance = () => {
  const money = useRecoilValueLoadable(balance);

  if (money.state === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full rounded-lg border border-blue-500 bg-white">
      <div className="p-2 tracking-wide">Balance</div>
      <div className=" p-2 text-2xl font-bold tracking-wide">
        ${money.contents}
      </div>
    </div>
  );
};

export default Balance;
