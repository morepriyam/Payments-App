import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const user = atom({
  key: "user",
  default: selector({
    key: "fetchUser",
    get: async ({ get }) => {
      const token = get(tokenState);

      if (token) {
        const Authorization = `Bearer ${token}`;

        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/user/me2",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization,
              },
            },
          );
          if (response.status === 200) {
            return response.data.user;
          } else {
            return error;
          }
        } catch (error) {
          throw error;
        }
      } else {
        throw error;
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
