import hero from "../assets/app.jpg";

export function HeroCard() {
  return (
    <div key="1" className="relative m-5 hidden md:block">
      <img
        alt="Hero"
        className="aspect-auto h-full rounded-xl object-cover"
        src={hero}
        style={{ maxHeight: "600px" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-yellow font-serif absolute left-1 top-1 hidden text-3xl font-bold tracking-tighter">
            Welcome to my project
          </h1>
        </div>
      </div>
    </div>
  );
}
