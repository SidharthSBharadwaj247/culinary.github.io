import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, toggleLoading } from "../../store/slices/userSlice";
import { BASE_URL } from "../../utils";
import Loader from "../Loader";

const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);
  const User = useSelector((state) => state.user);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSignUp = async (e) => {
    dispatch(toggleLoading(true));
    e.preventDefault();
    console.log(user);
    if (user.email && user.password && user.name) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, user);
        console.log(response);

        if (response.status === 200) {
          dispatch(toggleLoading(false));
          navigate("/home");
          dispatch(
            addUser({
              ...response.data.user,
              token: response.data.secrete_token,
              id: response.data.user._id,
            })
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...response.data.user,
              token: response.data.secrete_token,
              id: response.data.user._id,
            })
          );
          localStorage.setItem("isLoggedIn", true);
          console.log("Logged in");
        } else {
          dispatch(toggleLoading(false));
          console.log("error");
        }
      } catch (err) {
        dispatch(toggleLoading(false));
        console.log(err);
        if (err.response.data.code === 1) {
          setErr("User already exsists");
          return;
        }
        setErr("Unwanted error");
        console.log(err);
      }
    } else {
      dispatch(toggleLoading(false));
      setErr("Please enter all the fields");
    }
  };
  useEffect(()=>{
    setErr("")

  },[user])
  const handleSignIn = async (e) => {
    dispatch(toggleLoading(true));
    e.preventDefault();
    console.log(user);
    if (user.email && user.password) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, user);
        console.log(response);

        if (response.status === 200) {
          // const token = response.data.secrete_token
          // dispatch(addUser({...response.data.user,token}))
          // dispatch(setToken(response.data.secrete_token));
          dispatch(toggleLoading(false));
          dispatch(
            addUser({
              ...response.data.user,
              token: response.data.secrete_token,
              id: response.data.user._id,
            })
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...response.data.user,
              token: response.data.secrete_token,
              id: response.data.user._id,
            })
          );
          localStorage.setItem("isLoggedIn", true);

          // toast.success('Successfully Logged in!')

          navigate("/home");

          console.log("Logged in");
        } else {
          dispatch(toggleLoading(false));
          console.log("error");
        }
      } catch (err) {
        dispatch(toggleLoading(false));
        console.log(err);
        if (err.response.data.code === 2) {
          setErr("Invalid email");
          return;
        }
        if (err.response.data.code === 4) {
          setErr("Invalid password");
          return;
        }
        if (err.response.data.code === 3) {
          setErr("User does not exists");
          return;
        }
        setErr("Unwanted error");
        console.log(err);
      }
    } else {
      dispatch(toggleLoading(false));

      setErr("Please enter all the fields");
    }
  };
  const dataInp = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value === "") {
      e.target.style.border = "2px solid  #FF0000";
      e.target.style.outline = "none";
    } else {
      e.target.style.border = "2px solid  black";
    }
    if (name === "email") {
      if (value.indexOf("@") === -1 || value.indexOf(".") === -1) {
        e.target.style.border = "2px solid  #FF0000";
        e.target.style.outline = "none";
      } else {
        e.target.style.borderBottom = "2px solid  black";
      }
    }
    setUser({ ...user, [name]: value });
  };
  console.log(User.isLoading);
  return (
    <div className="md:flex hidden justify-center items-center bg-black/[0.2] absolute left-0 top-0 w-screen h-screen z-[11]">
      <div className="flex">
        <div className="bg-[#fff] rounded-[10px] shadow-box_shadow_login relative overflow-hidden w-[678px] max-w-full min-h-[400px] md:block hidden">
          {/* <Toaster position="top-center" reverseOrder={false} /> */}
          {/* Sign up container */}
          <div
            className={`absolute top-0 h-full transition-all ease-in-out left-0 w-1/2 opacity-0 z-[2] duration-1000 ${
              signIn !== true ? "translate-x-full opacity-[1] z-[5]" : ""
            }`}
          >
            <form className="bg-[#ffffff] flex items-center justify-center flex-col px-[50px] h-full text-center">
              <h1 className="font-bold m-0">Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                className="bg-[#eee] border-0 py-[12px] px-[15px] my-[8px] w-full"
                name="name"
                onChange={dataInp}
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-[#eee] border-0 py-[12px] px-[15px] my-[8px] w-full"
                name="email"
                onChange={dataInp}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-[#eee] border-0 py-[12px] px-[15px] my-[8px] w-full"
                name="password"
                onChange={dataInp}
              />
              <button
                className="rounded-[20px] border-[1px] border-solid border-black/[0.9] bg-bg_secondary1 text-[#ffffff] text-[12px] font-bold py-[12px] px-[45px] uppercase transition-transform duration-1000 ease-in"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              {err !== "" && <div className="text-red-600 mt-1">{err}</div>}
            </form>
          </div>
          {/* Sign in container */}
          <div
            className={`absolute top-0 h-full transition-all ease-in-out duration-1000 left-0 w-1/2 z-[2] ${
              signIn !== true ? "translate-x-full" : ""
            }`}
          >
            <form className="bg-[#ffffff] flex items-center justify-center flex-col px-[50px] h-full text-center">
              <h1 className="font-bold m-0">Sign in</h1>
              <input
                type="email"
                placeholder="Email"
                className="bg-[#eee] border-0 py-[12px] px-[15px] my-[8px] w-full"
                name="email"
                onChange={dataInp}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-[#eee] border-0 py-[12px] px-[15px] my-[8px] w-full"
                name="password"
                onChange={dataInp}
              />
              <a href="#" className="text-[#333] text-[14px] my-[15px]">
                Forgot your password?
              </a>
              <button
                className="rounded-[20px] border-1 border-solid border-black/[0.9] bg-bg_secondary1 text-[#ffffff] text-[12px] font-bold py-[12px] px-[45px] uppercase transition-transform duration-1000 ease-in"
                onClick={handleSignIn}
              >
                Sign In
              </button>
              {err != "" && <div className="text-red-600 mt-1">{err}</div>}
            </form>
          </div>
          {/* Overlay container */}
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all ease-in-out duration-1000 z-[100] ${
              signIn !== true ? "-translate-x-full" : ""
            }`}
          >
            {/* Overlay */}
            <div
              className={`bg-bg_secondary1 bg-no-repeat bg-cover text-[#ffffff] relative -left-[100%] h-full w-[200%] translate-x-0 transition-all ease-in-out duration-1000 ${
                signIn !== true ? "translate-x-1/2" : ""
              }`}
            >
              <div
                className={`absolute flex justify-center items-center
            flex-col px-[40px] text-center top-0 h-full w-1/2 -translate-x-[20%] transition-all ease-in-out duration-1000 ${
              signIn !== true ? "translate-x-0" : ""
            }`}
              >
                <h1 className="font-bold m-0">Hello, Friend!</h1>
                <div className="text-[14px]/[20px] font-thin mt-[20px] mx-[30px]">
                  Enter Your personal details and start journey with us
                </div>
                <button
                  onClick={() => toggle(true)}
                  className="bg-transparent border-[#ffffff] border-[1px] border-solid rounded-[20px] text-[12px] font-bold py-[12px] px-[45px] uppercase mt-2"
                >
                  Sign In
                </button>
              </div>

              <div
                className={`absolute flex justify-center items-center
            flex-col px-[40px] text-center top-0 right-0 h-full w-1/2 -translate-x-0 transition-all ease-in-out duration-1000 ${
              signIn !== true ? "translate-x-[20%]" : ""
            }`}
              >
                <h1 className="font-bold m-0">Welcome Back!</h1>
                <p className="text-[14px]/[20px] font-thin mt-[20px] mx-[30px]">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => toggle(false)}
                  className="bg-transparent border-[#ffffff] border-[1px] border-solid rounded-[20px] text-[12px] font-bold py-[12px] px-[45px] uppercase mt-2"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ClearIcon
            className="text-white cursor-pointer z-[100]"
            onClick={() => setLogin(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
