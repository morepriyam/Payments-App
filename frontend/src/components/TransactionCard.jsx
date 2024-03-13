import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { refreshTrans, transaction } from "../recoil/Transaction";
import { username } from "../recoil/User";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export function TransactionCard() {
  const transactions = useRecoilValueLoadable(transaction);
  const user = useRecoilValueLoadable(username);
  const trans = transactions.contents;
  const refreshTran = useSetRecoilState(refreshTrans);

  if (transactions.state === "loading" || user.state === "loading") {
    return (
      <div className="p-2" style={{ maxHeight: "calc(100vh - 59px)" }}>
        <table className="w-full table-auto rounded-lg border border-gray-200">
          <thead>
            <tr className="relative bg-gray-100 text-left">
              <th className="px-2 py-2 sm:px-4">From</th>
              <th className="px-2 py-2 sm:px-4">To</th>
              <th className="px-2 py-2 sm:px-4">Amount</th>
              <th className="hidden px-2 py-2 sm:block sm:px-4">Date</th>
              <th className="px-2 py-2 sm:px-4">
                Time
                <div className="absolute right-2 top-2 flex">
                  <ArrowPathIcon className="h-5 w-5 cursor-pointer rounded-full hover:bg-blue-100 " />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b border-gray-200`}>
              <td className="px-2 py-2 sm:px-4">
                <TableLoader />
              </td>
              <td className="px-2 py-2 sm:px-4">
                <TableLoader />
              </td>
              <td className="px-2 py-2 sm:px-4">
                <TableLoader />
              </td>
              <td className="hidden px-2 py-2 sm:block sm:px-4">
                <TableLoader />
              </td>
              <td className="px-2 py-2 sm:px-4">
                <TableLoader />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div
      className="overflow-auto p-2"
      style={{ maxHeight: "calc(100vh - 59px)" }}
    >
      <table className="w-full table-auto rounded-lg border border-gray-200 shadow-lg">
        <thead>
          <tr className=" relative bg-gray-100 text-left">
            <th className="px-2 sm:px-4">From</th>
            <th className="pl-2 pr-3 sm:px-4">To</th>
            <th className="pr-2 sm:px-4">Amount</th>
            <th className="hidden py-2 sm:block sm:px-4">Date</th>
            <th className="py-2 sm:px-4">
              Time
              <div className="absolute right-2 top-2 flex">
                <ArrowPathIcon
                  className="h-5 w-5 cursor-pointer rounded-full hover:bg-blue-100 "
                  onClick={() => {
                    refreshTran((value) => value + 1);
                    toast.info("Updating Transactions");
                  }}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {trans.map((transaction, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 ${user.contents === transaction.to ? "bg-green-200" : "bg-red-200"} bg-opacity-50 hover:bg-opacity-75`}
            >
              <td className="px-2 py-2 text-red-500 sm:px-4">
                @{transaction.from}
              </td>
              <td className="px-2 py-2 text-green-500 sm:px-4">
                @{transaction.to}
              </td>
              <td className=" py-2 text-blue-500 sm:px-4">
                ₹{transaction.amount}
              </td>
              <td className="hidden py-2 sm:block sm:px-4">
                {transaction.date[0]}
              </td>
              <td className="py-2 sm:px-4">{transaction.date[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableLoader() {
  return (
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
  );
}
