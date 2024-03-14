import { Link, useNavigate } from "react-router-dom";

export function NavLink({ icon, label, src, open, onClick }) {
  const navigate = useNavigate();
  return (
    <li className="py-3">
      <div
        className={`relative flex cursor-pointer rounded-2xl  px-2 py-2 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${!open && "shadow-[0_3px_10px_rgb(0,0,0,0.2)] "}`}
        onClick={(e) => {
          navigate(src);
          if (onClick) onClick(e);
        }}
      >
        <Link
          to={src}
          aria-label="Navigation"
          className={` ${!open && "absolute"}  left-2 top-2`}
        >
          {icon}
        </Link>
        <span
          className={`ml-3 ${!open && "scale-0"} font-medium text-zinc-800 duration-300`}
        >
          {label}
        </span>
      </div>
    </li>
  );
}
