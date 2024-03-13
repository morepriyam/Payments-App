import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";
export const refreshTrigger = atom({
  key: "refreshTrigger",
  default: 0,
});

export const friendReqTrigger = atom({
  key: "refreshReqTrigger",
  default: 0,
});

export const friends = atom({
  key: "friends",
  default: selector({
    key: "fetchFriends",
    get: async ({ get }) => {
      get(refreshTrigger);
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token available");
      }

      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/friends`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization,
            },
          },
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch friends");
        }

        return response.data;
      } catch (error) {
        throw new Error(`Error fetching friends: ${error.message}`);
      }
    },
  }),
});

export const friendRequests = atom({
  key: "friendRequests",
  default: selector({
    key: "fetchRequests",
    get: async ({ get }) => {
      get(refreshTrigger);
      get(friendReqTrigger);
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token available");
      }

      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/receivedfriendrequests`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization,
            },
          },
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch friendsReqs");
        }

        return response.data.friendRequests;
      } catch (error) {
        throw new Error(`Error fetching friendsReqs: ${error.message}`);
      }
    },
  }),
});
