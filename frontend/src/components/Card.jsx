import React from "react";

export function Card({ children }) {
  return (
    <div className="relative mx-5 flex justify-center rounded-xl border border-zinc-300 bg-white p-6 shadow-md sm:mx-auto sm:p-8">
      {children}
    </div>
  );
}
