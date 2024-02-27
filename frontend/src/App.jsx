import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { RecoilRoot } from "recoil";
import { Transactions } from "./pages/Transactions";
import { Friends } from "./pages/Friends";
import { Profile } from "./pages/Profile";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
