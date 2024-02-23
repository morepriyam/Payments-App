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
          className={`mb-1 mt-2 rounded-lg border-2 ${user.contents === transaction.to ? "border-green-500" : "border-red-500"} bg-white p-1 shadow-md`}
        >
          <div className="sm:flex sm:justify-around">
            <div className="flex p-1">
              <strong className="text-red-500">From:</strong> @
              {transaction.from}
            </div>
            <div className="flex p-1">
              <strong className="text-green-500">To:</strong> @{transaction.to}
            </div>
            <div className="flex p-1">
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
