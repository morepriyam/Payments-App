import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const balance = atom({
  key: "balance",
  default: selector({
    key: "fetchBalance",
    get: async ({ get }) => {
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token");
      }
      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization,
            },
          },
        );

        if (response.status !== 200) {
          throw new Error("Axios request failed");
        }

        return response.data.balance;
      } catch (error) {
        throw new Error(`Error fetching balance: ${error.message}`);
      }
    },
  }),
});
