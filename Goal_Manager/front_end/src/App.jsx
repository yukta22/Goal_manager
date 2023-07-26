import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import Goal from "./components/goalComponents/Goal";
import NewGoal from "./components/goalComponents/NewGoal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/signUp" element={<SignupForm />}></Route>
        <Route path="/goals" element={<Goal />}></Route>
        <Route path="/newGoal" element={<NewGoal />}></Route>
      </Routes>
    </>
  );
}

export default App;
