import { Link } from "react-router-dom";

export function NavLink({ icon, label, src, open }) {
  return (
    <div className="flex cursor-pointer items-center rounded-full px-2 py-3 hover:bg-blue-50">
      <Link to={src}>{icon}</Link>
      <span
        className={`ml-3 ${!open && "scale-0"}  font-medium text-zinc-800 duration-100`}
      >
        {label}
      </span>
    </div>
  );
}
