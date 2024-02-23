import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const transaction = atom({
  key: "transaction",
  default: selector({
    key: "fetchTransaction",
    get: async ({ get }) => {
      const token = get(tokenState);

      if (!token) {
        throw new Error("No token available");
      }

      const Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/transactions",
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