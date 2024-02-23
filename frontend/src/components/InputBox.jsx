import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function InputBox({ label, placeholder, onChange, variant = [] }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const variants = Array.isArray(variant) ? variant : variant.split(" ");
  return (
    <div>
      <div className="py-1 text-left text-sm font-bold text-zinc-800">
        {label}{" "}
        {variants.includes("required") && (
          <span className="text-red-500">*</span>
        )}
      </div>
      <div className="relative">
        <input
          name="inpput"
          onChange={onChange}
          type={
            variants.includes("number")
              ? "number"
              : variants.includes("password") && !showPassword
                ? "password"
                : "text"
          }
          placeholder={placeholder}
          className="w-full rounded-md border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none "
        />
        {variant.includes("password") && (
          <button
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
