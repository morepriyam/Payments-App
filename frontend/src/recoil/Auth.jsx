import { atom, selector } from "recoil";
import axios from "axios";

export const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem("token"),
});

export const isAuthenticatedState = selector({
  key: "isAuthenticatedState",
  get: async ({ get }) => {
    const token = get(tokenState);

    if (token) {
      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/me",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization,
            },
          },
        );
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  },
});
