import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { TransferMoney } from "../components/TransferMoney";
import { Loader } from "../components/Loader";

export function SendMoney() {
  const authLoadable = useAuth();

  if (authLoadable.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-[100dvh] flex-1 bg-neutral-100">
          <Appbar />
          <div className="grid p-2 sm:grid-cols-2">
            <TransferMoney />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
