import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { useAuth } from "../hooks/useAuth";
import { AddMoney } from "../components/AddMoney";

export function Dashboard() {
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
          <div className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3">
            <Balance />
            <AddMoney />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
