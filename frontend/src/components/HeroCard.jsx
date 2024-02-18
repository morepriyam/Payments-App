export function HeroCard({ src }) {
  return (
    <div key="1" className="relative m-5 hidden md:block">
      <img
        alt="Hero"
        className="aspect-auto h-full rounded-xl object-cover"
        src={src}
        style={{ maxHeight: "600px" }}
      />
    </div>
  );
}
