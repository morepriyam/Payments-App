export function LandingSection({ label, description, src }) {
  return (
    <section className="w-full bg-white py-5 md:py-10">
      <div className="container grid items-center justify-between gap-3 px-4 text-center md:px-6 ">
        <div className="grid items-center gap-4 lg:grid-cols-2 lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-zinc-800 sm:text-4xl md:text-5xl">
              {label}
            </h2>
            <p className="mx-auto max-w-3xl text-slate-500 md:text-xl lg:text-xl xl:text-xl">
              {description}
            </p>
          </div>
          <div className="mx-auto hidden w-full max-w-[90%] md:block lg:max-w-[400px]">
            <img
              alt="Image"
              className="aspect-video h-full rounded-xl"
              src={src}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
