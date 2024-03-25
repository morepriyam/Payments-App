import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { useAuth } from "../hooks/useAuth";
import { AddMoney } from "../components/AddMoney";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../components/User";
import { Loader } from "../components/Loader";
import { InputBox } from "../components/InputBox";

export function Dashboard() {
  const authLoadable = useAuth();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Authorization = `Bearer ${token}`;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk?filter=` + filter, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        const shuffledUsers = cachedFn(response.data.user);
        setUsers(shuffledUsers.slice(0, 5));
      });
  }, [filter]);

  const cachedFn = useCallback(
    (array) => {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    },
    [users, filter],
  );

  if (authLoadable.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="relative">
        <div className="flex">
          <Sidebar />
          <div className="h-[100dvh] flex-1 bg-neutral-100">
            <Appbar />
            <div className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3">
              <Balance />
              <AddMoney />
            </div>
            <div className="p-2">
              <InputBox
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                placeholder="Search users..."
              />
              <div className="mt-2 grid grid-rows-5 rounded-lg border border-blue-100 p-1 shadow-lg ">
                {users.map((user) => (
                  <User key={user.username} user={user} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
