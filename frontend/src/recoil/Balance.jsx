import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const balRefreshTrigger = atom({
  key: "balrefreshTrigger",
  default: 0,
});

export const balance = atom({
  key: "balance",
  default: selector({
    key: "fetchBalance",
    get: async ({ get }) => {
      get(balRefreshTrigger);
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token");
      }
      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/account/balance`,
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
