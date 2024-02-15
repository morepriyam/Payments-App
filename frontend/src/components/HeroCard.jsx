import priyam from "../assets/priyam.jpg";

export function HeroCard() {
  return (
    <div key="1" className="relative m-5 hidden xl:block">
      <img alt="Hero" className="w-full rounded-xl object-cover" src={priyam} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="absolute left-10 top-10 text-3xl font-bold tracking-tighter">
            Welcome to my project
          </h1>
        </div>
      </div>
    </div>
  );
}
