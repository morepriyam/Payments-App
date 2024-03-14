import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { user, userRefresh } from "../recoil/User";

export function Profileupdate() {
  const profile = useRecoilValueLoadable(user);
  const setRefreshUser = useSetRecoilState(userRefresh);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imageURL, setImageURL] = useState(profile.contents.imageURL);
  const [phoneNumber, setPhoneNumber] = useState();
  return (
    <div className="col-span-3 mt-2 rounded-lg border border-blue-300 bg-gradient-to-r from-sky-100 to-indigo-100 p-2  text-black sm:mt-0 ">
      <InputBox
        value={profile.contents.imageURL}
        placeholder={
          "https://avatars.githubusercontent.com/u/118034652?s=96&v=4"
        }
        label={"Profile URL"}
        onChange={(e) => {
          setImageURL(e.target.value);
        }}
      />

      <div className="grid grid-cols-2 sm:gap-2">
        <InputBox
          value={profile.contents.firstName}
          placeholder={"john"}
          label={"Firstname"}
          onChange={(e) => {
            const sanitizedValue = e.target.value.replace(/\s/g, "");
            setFirstName(sanitizedValue);
          }}
        />
        <InputBox
          value={profile.contents.lastName}
          placeholder={"doe"}
          label={"Lastname"}
          onChange={(e) => {
            const sanitizedValue = e.target.value.replace(/\s/g, "");
            setLastName(sanitizedValue);
          }}
        />
      </div>
      <InputBox
        value={profile.contents.email}
        placeholder={"johndoe@gmail.com"}
        label={"Email"}
        onChange={(e) => {
          const sanitizedValue = e.target.value.replace(/\s/g, "");
          setEmail(sanitizedValue);
        }}
      />
      <InputBox
        variant={"password"}
        placeholder={"password (min. 5)"}
        label={"Password"}
        onChange={(e) => {
          const sanitizedValue = e.target.value.replace(/\s/g, "");
          setPassword(sanitizedValue);
        }}
      />
      <InputBox
        value={profile.contents.phoneNumber}
        placeholder={"phone (max. 10 digits)"}
        label={"Phone"}
        variant={"number"}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <div className="my-2">
        <Button
          label={"Update"}
          onClick={async () => {
            const token = localStorage.getItem("token");
            const Authorization = `Bearer ${token}`;
            try {
              const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/user`,
                {
                  email: email === "" ? undefined : email,
                  password: password === "" ? undefined : password,
                  firstName: firstName === "" ? undefined : firstName,
                  lastName: lastName === "" ? undefined : lastName,
                  imageURL: imageURL === "" ? undefined : imageURL,
                  phoneNumber:
                    phoneNumber === "" || isNaN(parseInt(phoneNumber))
                      ? undefined
                      : parseInt(phoneNumber),
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization,
                  },
                },
              );
              if (response.status === 200) {
                toast.success(response.data.message);
                setRefreshUser((value) => value + 1);
              }
            } catch (error) {
              toast.error(error.response.data.message);
            }
          }}
        />
      </div>
    </div>
  );
}
