export function Card({ children }) {
  return (
    <div className="relative mx-5 flex justify-center rounded-xl border border-zinc-300 bg-white p-8 shadow-md sm:mx-auto">
      {children}
    </div>
  );
}
