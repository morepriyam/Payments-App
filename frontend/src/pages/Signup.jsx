import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { HeroCard } from "../components/HeroCard";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const navigate = useNavigate();

  return (
    <div className=" flex h-[100dvh] flex-col items-center justify-center bg-neutral-100">
      <div className="block p-5 text-4xl font-bold tracking-wide text-blue-500 md:hidden">
        Payments-App
      </div>
      <div className="mx-5 flex justify-center rounded-xl bg-white p-8 sm:mx-auto">
        <div className="md:grid md:grid-cols-12">
          <div className="flex flex-col justify-center md:col-span-6 lg:col-span-8">
            <HeroCard />
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
                placeholder="Password"
                label={"Password"}
                variant={["password", "required"]}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputBox
                placeholder="John"
                label={"First Name"}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s/g, "");
                  setFirstName(sanitizedValue);
                }}
              />
              <InputBox
                placeholder="Doe"
                label={"Last Name"}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s/g, "");
                  setLastName(sanitizedValue);
                }}
              />

              <InputBox
                placeholder="1234567890"
                variant="number"
                label={"Phone"}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <div className="pt-4">
                <Button
                  label={"Sign up"}
                  onClick={async () => {
                    const response = await axios.post(
                      "http://localhost:3000/api/v1/user/signup",
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
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
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
      </div>
    </div>
  );
}
