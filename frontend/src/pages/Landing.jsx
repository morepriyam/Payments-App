import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { LandingSection } from "../components/LandingSection";
import transaction from "../assets/transaction.svg";
import friend from "../assets/friend.svg";
import message from "../assets/message.svg";

export function Landing() {
  return (
    <>
      <div className="w-full border-b border-blue-300 bg-gradient-to-r from-sky-200 to-indigo-200 py-12 md:py-20">
        <div className="container grid items-center gap-4 px-4 text-center md:px-6 ">
          <div className="space-y-3">
            <div className="p-5 text-3xl font-bold tracking-wide text-blue-600 hover:text-blue-500 sm:text-4xl md:text-5xl">
              Payments-App
            </div>
            <p className="mx-auto font-semibold  text-slate-500 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
              Payments-App: Seamlessly manage transactions, transfer funds
              securely, and connect with friends effortlessly in one intuitive
              platform.
            </p>
          </div>

          <div className="flex flex-row justify-center">
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
        src={transaction}
      />
      <LandingSection
        label={"Friend Requests"}
        description={
          "Receive and manage friend requests from other users, enabling seamless connection and networking within the Payments-App community."
        }
        src={friend}
      />
      <LandingSection
        label={"Secure Messaging"}
        description={
          "Soon, users will be able to communicate with their friends directly within the app, enhancing user engagement and facilitating communication between connected users."
        }
        src={message}
      />
      <Footer />
    </>
  );
}
