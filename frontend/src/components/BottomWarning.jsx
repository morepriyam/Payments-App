import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="text-md flex justify-center pt-2 text-slate-500">
      <div>{label}</div>
      <Link
        className="pointer cursor-pointer pl-1 text-blue-500 hover:text-blue-400"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
