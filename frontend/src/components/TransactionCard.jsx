import { useRecoilValueLoadable } from "recoil";
import { transaction } from "../recoil/Transaction";
import { username } from "../recoil/User";

export function TransactionCard() {
  const transactions = useRecoilValueLoadable(transaction);
  const user = useRecoilValueLoadable(username);
  const trans = transactions.contents;

  if (transactions.state === "loading" || user.state === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="overflow-y-auto p-2"
      style={{ maxHeight: "calc(100vh - 59px)" }}
    >
      {trans.map((transaction, index) => (
        <div
          key={index}
          className={`mb-1 mt-2 rounded-lg border-2 ${user.contents === transaction.to ? "border-green-300" : "border-red-200"} bg-white p-1 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
        >
          <div className="md:flex md:justify-between">
            <div className="flex p-1">
              <strong className="text-red-500">From:</strong> @
              {transaction.from}
            </div>
            <div className="flex p-1">
              <strong className="text-green-500">To:</strong> @{transaction.to}
            </div>
            <div className="flex py-1">
              <strong className="text-blue-500">Amount:</strong>₹
              {transaction.amount}
            </div>

            <div className="flex p-1">
              <strong>Date:</strong>
              {transaction.date[0]}
            </div>
            <div className="flex p-1">
              <strong>Time:</strong>
              {transaction.date[1]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
