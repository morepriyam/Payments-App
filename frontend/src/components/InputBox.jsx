import { useState } from "react";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
