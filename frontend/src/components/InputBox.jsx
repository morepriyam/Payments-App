export function InputBox({ label, placeholder }) {
  return (
    <div>
      <div className="py-2 text-left text-sm font-medium">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full rounded-md border-2 border-zinc-100 px-2 py-1"
      />
    </div>
  );
}
