export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" text-md mb-2 w-full rounded-md bg-blue-600 py-3 font-medium tracking-widest text-white hover:bg-blue-800"
    >
      {label}
    </button>
  );
}
