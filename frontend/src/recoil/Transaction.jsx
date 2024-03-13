import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const refreshTrans = atom({
  key: "refreshTrans",
  default: 0,
});

export const transaction = atom({
  key: "transaction",
  default: selector({
    key: "fetchTransaction",
    get: async ({ get }) => {
      get(refreshTrans);
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token available");
      }

      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/transactions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization,
            },
          },
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch transactions");
        }

        return response.data.transactions.reverse();
      } catch (error) {
        throw new Error(`Error fetching transactions: ${error.message}`);
      }
    },
  }),
});
