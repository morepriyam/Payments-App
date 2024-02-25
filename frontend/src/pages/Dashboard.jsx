import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { useAuth } from "../hooks/useAuth";
import { AddMoney } from "../components/AddMoney";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CurrencyRupeeIcon, UserPlusIcon } from "@heroicons/react/24/outline";

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
              className="w-full rounded border p-2 text-gray-700 focus:border-blue-500 focus:outline-none"
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

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="mt-2 flex justify-between rounded-md border border-green-500 bg-white p-1">
      <div className="flex items-center">
        <img src={user.imageURL} className="flex h-7 w-7 rounded-full" />

        <div className="pl-3 text-blue-500">@{user.username}</div>
        <div className="pl-3 text-green-500">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="flex w-10 items-center justify-center rounded-md bg-blue-600 p-1 text-white"
          onClick={() => {
            const token = localStorage.getItem("token");
            const Authorization = `Bearer ${token}`;
            axios.post(
              "http://localhost:3000/api/v1/user/addfriend",
              { username: user.username },
              {
                headers: {
                  Authorization,
                },
              },
            );
          }}
          label={"Add Friend"}
        >
          <UserPlusIcon className="h-5 w-5" />
        </button>
        <button
          className="flex w-10 items-center justify-center rounded-md bg-blue-600 p-1 text-white"
          onClick={() => {
            navigate("/send?username=" + user.username);
          }}
          label={"Send Money"}
        >
          <CurrencyRupeeIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
