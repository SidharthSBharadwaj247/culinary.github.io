import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser, toggleLoading } from "../../store/slices/userSlice";
import { BASE_URL } from "../../utils";

const MoboLogin = ({ setLogin }) => {
  const [isSignUp, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(()=>{
    setErr("")

  },[user])
  const handleSignUp = async (e) => {
    dispatch(toggleLoading(true))
    e.preventDefault();
    console.log(user);
    if (user.email && user.password && user.name) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, user);
        console.log(response);

        if (response.status === 200) {
          dispatch(toggleLoading(false))
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

          // const token = response.data.secrete_token
          // dispatch(addUser({...response.data.user,token}))
          // dispatch(setToken(response.data.secrete_token))
          // toast.success('Successfully Created account!')
          console.log("Logged in");
        } else {
          dispatch(toggleLoading(false))
          setErr("Server Error")
          console.log("error");
        }
      } catch (err) {
        dispatch(toggleLoading(false))
        console.log(err);
        if (err.response.data.code === 1) {
          setErr("User already exsists");
          return;
        }
        setErr("Unwanted error");
        console.log(err);
      }
    } else {
      dispatch(toggleLoading(false))
      setErr("Please enter all the fields");
    }
  };
  const handleSignIn = async (e) => {
    dispatch(toggleLoading(true))
    e.preventDefault();
    console.log(user);
    if (user.email && user.password) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, user);
        console.log(response);

        if (response.status === 200) {
          dispatch(toggleLoading(false))
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
          dispatch(toggleLoading(false))
          console.log("error");
        }
      } catch (err) {
        dispatch(toggleLoading(false))
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
      dispatch(toggleLoading(false))
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
  return (
    <div className="md:hidden flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-black/[0.6] z-[11] px-5">
      <div className="flex flex-col items-center shadow-btn_shadow rounded-md px-5 py-5 gap-5 bg-white">
        <div className="flex justify-end w-full">
          <CancelIcon
            onClick={() => setLogin(false)}
            className="cursor-pointer"
          />
        </div>
        <div>
          <h1 className="font-bold sm:text-[40px] text-[30px]">
            {isSignUp ? "Create Account" : "Login"}
          </h1>
        </div>
        <div className="flex flex-col text-black p-5 gap-4 rounded sm:text-[15px] text-[20px]">
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border border-black sm:text-[12px] text-[20px] p-3 rounded-md"
              onChange={dataInp}
            />
          )}
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            className="border border-black sm:text-[12px] text-[20px] p-3 rounded-md"
            onChange={dataInp}
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            className="border border-black sm:text-[12px] text-[20px] p-3 rounded-md"
            onChange={dataInp}
          />
        </div>
        <div>
          {!isSignUp?(<button className="rounded-[20px] border-1 border-solid border-black/[0.9] bg-bg_secondary1 text-[#ffffff] text-[12px] font-bold py-[12px] px-[45px] uppercase transition-transform duration-1000 ease-in" onClick={handleSignIn}>
            Sign in
          </button>):(<button className="rounded-[20px] border-1 border-solid border-black/[0.9] bg-bg_secondary1 text-[#ffffff] text-[12px] font-bold py-[12px] px-[45px] uppercase transition-transform duration-1000 ease-in" onClick={handleSignUp}>
            Sign up
          </button>)}
        </div>
        {err !== "" && <div className="text-red-600 mt-1">{err}</div>}
        <div>
          {!isSignUp ? (
            <p className="sm:text-[12px] text-[15px]">
              Don't have an account ?{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => setIsSignup(true)}
              >
                Sign up.
              </span>
            </p>
          ) : (
            <p className="sm:text-[12px] text-[15px]">
              Already have an account ?{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => setIsSignup(false)}
              >
                Login.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoboLogin;
