import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="flex justify-center py-2 text-sm">
      <div>{label}</div>
      <Link
        className="pointer cursor-pointer pl-1 text-blue-500 underline"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
