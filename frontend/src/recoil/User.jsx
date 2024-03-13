import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const user = atom({
  key: "user",
  default: selector({
    key: "fetchUser",
    get: async ({ get }) => {
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token available");
      }

      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/userInfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization,
            },
          },
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch user info");
        }

        return response.data.user;
      } catch (error) {
        throw new Error(`Error fetching user info: ${error.message}`);
      }
    },
  }),
});

export const profileImage = selector({
  key: "profileImage",
  get: ({ get }) => {
    const userData = get(user);
    return userData.imageURL;
  },
});

export const username = selector({
  key: "username",
  get: ({ get }) => {
    const userData = get(user);
    return userData.username;
  },
});
