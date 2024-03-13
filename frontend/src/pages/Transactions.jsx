import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { TransactionCard } from "../components/TransactionCard";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
export function Transactions() {
  const authLoadable = useAuth();

  if (authLoadable.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <TransactionCard />
        </div>
      </div>
      <Footer />
    </>
  );
}
