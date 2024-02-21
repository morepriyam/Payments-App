import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="body-font z-20 w-full border-t border-zinc-300 bg-white text-zinc-800 ">
      <div className="container px-4 py-10">
        <div className="grid items-center justify-between gap-4 md:grid-cols-[1fr_auto]">
          <p className="text-sm tracking-wider text-slate-500 opacity-50">
            © 2024 Payments-App All rights reserved
          </p>
          <div className="flex items-center gap-4 md:order-first md:gap-8">
            <nav className="flex items-center gap-4 text-sm md:gap-6">
              <Link className="hover:underline" to={"/"}>
                Home
              </Link>
              <Link className="hover:underline" to={""}>
                Features
              </Link>
              <Link className="hover:underline" to={""}>
                Support
              </Link>
              <Link className="hover:underline" to={""}>
                Commits
              </Link>
            </nav>
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-blue-300 hover:text-white"
                to={"https://twitter.com/Priyamrm"}
                target={"_blank"}
              >
                <TwitterIcon className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-200"
                to={"https://github.com/morepriyam/Payments-App.git"}
                target={"_blank"}
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
