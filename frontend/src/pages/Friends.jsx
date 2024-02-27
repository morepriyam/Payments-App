import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { useRecoilValueLoadable } from "recoil";
import { friendRequests, friends } from "../recoil/Friend";
import { User } from "../components/User";
import { Friend } from "../components/Friend";

export function Friends() {
  const authLoadable = useAuth();
  const friend = useRecoilValueLoadable(friends);
  const friendReq = useRecoilValueLoadable(friendRequests);
  if (
    authLoadable.state === "loading" ||
    friend.state === "loading" ||
    friendReq.state === "loading"
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <div className="p-2 text-sm">This page needs refresh</div>
          <div className="p-2 font-bold text-blue-500">My Friends</div>
          {friend.contents.myFriends.map((user) => (
            <Friend key={user.username} user={user} />
          ))}

          <div className="p-2 font-bold text-blue-500">Friend Requests</div>
          {friendReq.contents.map((user) => (
            <User key={user.username} user={user} />
          ))}
          <div className="p-2 font-bold text-blue-500">Friends I've Added</div>
          {friend.contents.friendsIAdded.map((user) => (
            <User key={user.username} user={user} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
