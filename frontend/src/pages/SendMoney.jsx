import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { TransferMoney } from "../components/TransferMoney";

export function SendMoney() {
  const authLoadable = useAuth();

  if (authLoadable.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <div className="grid p-2 sm:grid-cols-3">
            <TransferMoney />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
