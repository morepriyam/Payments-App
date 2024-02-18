import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { HeroCard } from "../components/HeroCard";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { GoBackButton } from "../components/GoBackButton";
import { Card } from "../components/Card";
import hero from "../assets/app.jpg";

export function Signin() {
  const [usernameOrEmailOrNumber, setUsernameOrEmailOrNumber] = useState();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
                placeholder="Johndoe"
                label={"Email/Phone/Username"}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s/g, "");
                  setUsernameOrEmailOrNumber(sanitizedValue);
                }}
              />
              <InputBox
                placeholder="Password"
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
                    const response = await axios.post(
                      "http://localhost:3000/api/v1/user/signin",
                      {
                        usernameOrEmailOrNumber:
                          usernameOrEmailOrNumber === ""
                            ? undefined
                            : usernameOrEmailOrNumber,
                        password,
                      },
                    );
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
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
