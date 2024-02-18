import { Link } from "react-router-dom";

export function GoBackButton({ to }) {
  return (
    <div className="absolute left-4 top-[43px]">
      <Link className="inline-flex items-center  hover:-translate-x-1" to={to}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-8 w-8 text-blue-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>
      </Link>
    </div>
  );
}
