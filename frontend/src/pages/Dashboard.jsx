import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { useAuth } from "../hooks/useAuth";
import { AddMoney } from "../components/AddMoney";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../components/User";

export function Dashboard() {
  const authLoadable = useAuth();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Authorization = `Bearer ${token}`;
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

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
          <div className="p-2">
            <input
              name="input"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              type="text"
              placeholder="Search users..."
              className="w-full rounded border p-2 text-gray-700 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] focus:border-blue-500 focus:outline-none"
            ></input>
            {users.map((user) => (
              <User key={user.username} user={user} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
