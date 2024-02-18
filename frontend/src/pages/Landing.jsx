import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import LandingSection from "../components/LandingSection";

export function Landing() {
  return (
    <>
      <div className="w-full border-b border-zinc-300 bg-white py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <div className="p-5 text-4xl font-bold tracking-wide text-blue-600 hover:text-blue-500">
              Payments-App
            </div>
            <p className="mx-autotext-black font-semibold text-slate-500 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
              Payments-App is a comprehensive financial management and social
              networking platform that enables users to handle transactions,
              connect with friends, and stay organized in one convenient
              location.
            </p>
          </div>

          <div className="flex flex-row justify-center gap-2">
            <Link
              className="text-md flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 font-medium tracking-wide text-white shadow-sm hover:bg-blue-800"
              to={"/signup"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <LandingSection
        label={"Transaction History"}
        description={
          "View a detailed history of past transactions, including transfers, deposits, and withdrawals, allowing users to track their financial activity effortlessly."
        }
        src={""}
      />
      <LandingSection
        label={"Friend Requests"}
        description={
          "Receive and manage friend requests from other users, enabling seamless connection and networking within the Payments-App community."
        }
        src={""}
      />
      <LandingSection
        label={"Secure Messaging"}
        description={
          "Soon, users will be able to communicate with their friends directly within the app, enhancing user engagement and facilitating communication between connected users."
        }
        src={""}
      />
      <Footer />
    </>
  );
}
