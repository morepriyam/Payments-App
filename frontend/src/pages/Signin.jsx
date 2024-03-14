import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { HeroCard } from "../components/HeroCard";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoBackButton } from "../components/GoBackButton";
import { Card } from "../components/Card";
import hero from "../assets/app.png";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { isAuthenticatedState, tokenState } from "../recoil/Auth";
import { toast } from "react-toastify";

export function Signin() {
  const [usernameOrEmailOrNumber, setUsernameOrEmailOrNumber] = useState();
  const [password, setPassword] = useState("");
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
              <Heading label={"Sign in"} />
              <SubHeading label={"Enter your credentials"} />

              <InputBox
                placeholder="johndoe"
                label={"Email/Phone/Username"}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s/g, "");
                  setUsernameOrEmailOrNumber(sanitizedValue);
                }}
              />
              <InputBox
                placeholder="password"
                label={"Password"}
                variant="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="pt-4">
                <Button
                  label={"Sign in"}
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/user/signin`,
                        {
                          usernameOrEmailOrNumber:
                            usernameOrEmailOrNumber === ""
                              ? undefined
                              : usernameOrEmailOrNumber,
                          password,
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
                label={"Dont have an account?"}
                buttonText={"Signup"}
                to={"/signup"}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
