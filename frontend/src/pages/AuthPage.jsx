import React, { useState } from "react";
import "./AuthPage.css";
import Login from "../components/auth/Login";
import MoboLogin from "../components/auth/MoboLogin";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const AuthPage = () => {
  const User = useSelector((state) => state.user);
  const [login, setLogin] = useState(false);
  return (
    <>
      {" "}
      <div className="Auth_main_div">
        <h1 className=" text-[50px] text-center">Welcome to CulinaShare</h1>
        <p>Please log in or sign up below</p>
        <div className="mt-5 flex gap-4">
          <button
            className="border border-[#a7462c] rounded py-2 px-5 text-[18px] font-semibold bg-bg_secondary1 shadow-btn_shadow"
            onClick={() => setLogin(true)}
          >
            Get Started
          </button>
        </div>
      </div>
      {login && <Login setLogin={setLogin} />}
      {login && <MoboLogin setLogin={setLogin} />}
      {User.isLoading && (
        <div className="z-[100] absolute top-0 left-0 h-screen w-screen bg-black/[0.6] flex items-center justify-center">
          <Loader
            primaryColor="#000000"
            secondaryColor="#e0e0e0"
            height={50}
            width={50}
          />
        </div>
      )}
    </>
  );
};

export default AuthPage;
