import { Link } from "react-router-dom";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
export function GoBackButton({ to }) {
  return (
    <div className="absolute left-4 top-[43px]">
      <Link
        className="inline-flex items-center  hover:-translate-x-1"
        to={to}
        aria-label="Go Back"
      >
        <ChevronDoubleLeftIcon className="h-8 w-8 rounded-full text-blue-700" />
      </Link>
    </div>
  );
}
