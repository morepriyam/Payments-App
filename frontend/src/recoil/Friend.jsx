import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const friends = atom({
  key: "friends",
  default: selector({
    key: "fetchFriends",
    get: async ({ get }) => {
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token available");
      }

      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/friends",
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

        return response.data.friends;
      } catch (error) {
        throw new Error(`Error fetching friends: ${error.message}`);
      }
    },
  }),
});
