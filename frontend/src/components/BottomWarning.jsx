import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="text-md flex justify-center pt-2 text-slate-500">
      <div>{label}</div>
      <Link
        aria-label="Swtich Signup/Signin"
        className="pointer cursor-pointer pl-1 text-blue-700 hover:text-blue-500"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
