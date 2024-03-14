import { atom, selector } from "recoil";
import axios from "axios";
import { toast } from "react-toastify";

export const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem("token"),
});

export const isAuthenticatedState = selector({
  key: "isAuthenticatedState",
  get: async ({ get }) => {
    const token = get(tokenState);

    if (!token) {
      return false;
    }

    const Authorization = `Bearer ${token}`;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/me`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization,
          },
        },
      );

      if (response.status === 200) {
        toast.info("Welcome To Payments-App");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.info("Authentication Failed");
      return false;
    }
  },
});
