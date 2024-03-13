import { Footer } from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { Appbar } from "../components/Appbar";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Profilecard } from "../components/ProfileCard";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { user } from "../recoil/User";
import { useRecoilValueLoadable } from "recoil";

export function Profile() {
  const profile = useRecoilValueLoadable(user);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imageURL, setImageURL] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const authLoadable = useAuth();
  if (authLoadable.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 bg-neutral-100">
          <Appbar />
          <div className="grid grid-cols-5 gap-3 p-2">
            <div className="col-span-2">
              <Profilecard />
            </div>
            <div className="col-span-3 rounded-lg border border-blue-300 bg-gradient-to-r from-sky-100 to-indigo-100 p-2 text-black">
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
                      }
                    } catch (error) {
                      toast.error(error.response.data.message);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
