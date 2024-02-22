import { atom, selector } from "recoil";
import axios from "axios";

import { tokenState } from "./Auth";

export const transaction = atom({
  key: "transaction",
  default: selector({
    key: "fetchTransaction",
    get: async ({ get }) => {
      const token = get(tokenState);

      if (token) {
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
          if (response.status === 200) {
            return response.data.transactions;
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
