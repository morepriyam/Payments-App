import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { HeroCard } from "../components/HeroCard";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { GoBackButton } from "../components/GoBackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import hero from "../assets/app.jpg";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { isAuthenticatedState, tokenState } from "../recoil/Auth";
import { toast } from "react-toastify";

export function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const navigate = useNavigate();
  const setTokenState = useSetRecoilState(tokenState);

  const authLoadable = useRecoilValueLoadable(isAuthenticatedState);

  useEffect(() => {
    if (authLoadable.state === "hasValue" && authLoadable.contents) {
      navigate("/dashboard");
    }
  }, [authLoadable, navigate]);

  return (
    <div className=" flex h-[100dvh] flex-col items-center justify-center bg-neutral-100">
      <div className="block p-5 text-4xl font-bold tracking-wide text-blue-600 hover:text-blue-500 md:hidden">
        Payments-App
      </div>
      <Card>
        <GoBackButton to={"/"} />
        <div className="md:grid md:grid-cols-12">
          <div className="flex flex-col justify-center md:col-span-6 lg:col-span-8">
            <HeroCard src={hero} />
          </div>
          <div className="mx-3 flex flex-col justify-center md:col-span-6  lg:col-span-4">
            <div className="w-100% p-2 px-4">
              <Heading label={"Sign up"} />
              <SubHeading
                label={"Enter your infromation to create an account"}
              />
              <InputBox
                placeholder="johndoe"
                label={"Username"}
                variant="required"
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s/g, "");
                  setUsername(sanitizedValue);
                }}
              />
              <InputBox
                placeholder="abc@gmail.com"
                label={"Email"}
                variant="required"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <InputBox
                placeholder="password (min. 5)"
                label={"Password"}
                variant={["password", "required"]}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputBox
                placeholder="phone (max. 10 digits)"
                variant={["number", "required"]}
                label={"Phone"}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <InputBox
                placeholder="john"
                label={"First Name"}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s/g, "");
                  setFirstName(sanitizedValue);
                }}
              />
              <InputBox
                placeholder="doe"
                label={"Last Name"}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s/g, "");
                  setLastName(sanitizedValue);
                }}
              />
              <div className="pt-4">
                <Button
                  label={"Sign up"}
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
                        {
                          username,
                          email,
                          password,
                          firstName: firstName === "" ? undefined : firstName,
                          lastName: lastName === "" ? undefined : lastName,
                          phoneNumber: phoneNumber
                            ? parseInt(phoneNumber)
                            : undefined,
                        },
                      );
                      if (response.status === 200) {
                        toast.success(response.data.message);
                        localStorage.setItem("token", response.data.token);
                        setTokenState(response.data.token);
                        navigate("/dashboard");
                      }
                    } catch (error) {
                      toast.error(error.response.data.message);
                    }
                  }}
                />
              </div>
              <BottomWarning
                label={"Already have an account?"}
                buttonText={"Signin"}
                to={"/signin"}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
