import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { HeroCard } from "../components/HeroCard";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signup() {
  return (
    <div className=" flex h-[100dvh] flex-col justify-center bg-neutral-100">
      <div className="mx-20 rounded-xl bg-white p-5">
        <div className="xl:grid xl:grid-cols-12">
          <div className="col-span-8 flex flex-col justify-center">
            <HeroCard />
          </div>
          <div className="col-span-4 mx-3 flex flex-col justify-center">
            <div className="w-100% p-2 px-4">
              <Heading label={"Sign up"} />
              <SubHeading
                label={"Enter your infromation to create an account"}
              />
              <InputBox placeholder="John" label={"First Name"} />
              <InputBox placeholder="Doe" label={"Last Name"} />
              <InputBox placeholder="johndoe123@gmail.com" label={"Email"} />
              <InputBox placeholder="@johndoe" label={"User Name"} />
              <InputBox placeholder="Password" label={"Password"} />
              <InputBox
                placeholder="1234567890"
                label={"Phone Number-(optional)"}
              />
              <div className="pt-4">
                <Button label={"Sign up"} />
              </div>
              <BottomWarning
                label={"Already have an account?"}
                buttonText={"Sign in"}
                to={"/signin"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
