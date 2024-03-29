import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { friendReqTrigger, friends, refreshTrigger } from "../recoil/Friend";
import { Friend } from "../components/Friend";
import { Friendsadded } from "../components/FriendsAdded";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Friendrequest } from "../components/FriendRequest";

export function Friendsection() {
  const friend = useRecoilValueLoadable(friends);
  const refresh = useSetRecoilState(friendReqTrigger);
  const refresh1 = useSetRecoilState(refreshTrigger);

  if (friend.state === "loading") {
    return (
      <div>
        <div className="relative px-2 pt-1 font-bold text-blue-700 hover:text-blue-500">
          My Friends:
          <div className="absolute left-[96px] top-[5px] flex">
            <ArrowPathIcon className="h-5 w-5 cursor-pointer rounded-full hover:bg-blue-100" />
          </div>
        </div>
        <div className="relative px-2 pt-1 font-bold text-blue-700 hover:text-blue-500">
          Friend Requests:
          <div className="absolute left-[132px] top-[5px] flex">
            <ArrowPathIcon className="h-5 w-5 cursor-pointer rounded-full hover:bg-blue-100" />
          </div>
        </div>
        <div className="px-2 pt-1 font-bold text-blue-700 hover:text-blue-500">
          Sent Friend Requests:
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative px-2 pt-1 font-bold text-blue-700 hover:text-blue-500">
        My Friends:
        <div className="absolute left-[96px] top-[4px] flex">
          <ArrowPathIcon
            className="h-5 w-5 cursor-pointer rounded-full text-black hover:bg-blue-100 "
            onClick={() => {
              refresh1((value) => value + 1);
              toast.info("Updating Friends");
            }}
          />
        </div>
      </div>
      <div className="mt-1 rounded-lg border border-blue-100 p-1 shadow-lg">
        {friend.contents.myFriends.map((user) => (
          <Friend key={user.username} user={user} />
        ))}
      </div>

      <div className="relative px-2 pt-1 font-bold text-blue-700 hover:text-blue-500">
        Friend Requests:
        <div className="absolute left-[132px] top-[1px] mt-1 flex">
          <ArrowPathIcon
            className="h-5 w-5 cursor-pointer rounded-full text-black hover:bg-blue-100"
            onClick={() => {
              refresh((value) => value + 1);
              toast.info("Updating Friend Requests");
            }}
          />
        </div>
      </div>
      <div className="rounded-lg border border-blue-100 p-1 shadow-lg">
        <Friendrequest />
      </div>
      <div className="px-2 pt-1 font-bold text-blue-700 hover:text-blue-500">
        Sent Friend Requests:
      </div>
      <div className="mt-1 rounded-lg border border-blue-100 p-1 shadow-lg">
        {friend.contents.friendsIAdded.map((user) => (
          <Friendsadded key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
}
