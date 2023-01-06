import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUserShield } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import { Oval } from "react-loader-spinner";
function Login() {
  return (
    <React.Fragment>
      <NavBar />
      <Page />
    </React.Fragment>
  );
}

function Page() {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("No Account Found");
  const [errorCode, setErrorCode] = useState(2);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (error === false && loading === false) setError(true);
    else if (error === false && loading === true) setLoading(false);
    else if (error === true && loading === false) setLoading(true);
    else {
      setLoading(false);
      setError(false);
    }
  };
  return (
    <div className="w-full h-fit md:h-screen bg-black flex flex-col md:flex-row items-center justify-center">
      <div className="md:w-[60%] w-full h-screen flex flex-col items-center justify-end gap-5 mb-10 mt-20 md:mt-0">
        <h2 className="text-center text-[50px] text-theme-200 font-bold ">
          Login to Song Surf
        </h2>
        <h3 className="text-theme-100 text-[20px] font-semibold">Email</h3>
        <input
          type="email"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          className="rounded-lg h-[42px] w-[90vw] md:w-[480px] text-[20px] p-4 outline-none font-bold"
          onChange={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/ /g, "");
            e.currentTarget.value = e.currentTarget.value.toLowerCase();
            setEmail(e.currentTarget.value);
          }}
        />
        <h3 className="text-theme-100 text-[20px] font-semibold">Password</h3>
        <input
          type="password"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          className="rounded-lg h-[42px] w-[90vw] md:w-[480px] text-[20px] p-4 outline-none"
          onChange={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/ /g, "");
            e.currentTarget.value = e.currentTarget.value.toLowerCase();
            setPassword(e.currentTarget.value);
          }}
        />
        <div
          className="rounded-lg h-[42px] w-[70vw] md:w-[400px] text-[20px] p-4 bg-theme-200 text-theme-50 flex flex-col items-center justify-center font-bold mt-5 hover:text-theme-200 hover:bg-theme-50 transition-all ease-in-out duration-300 hover:cursor-pointer"
          onClick={handleLogin}
        >
          Log in
        </div>
        <p className="w-[400px] text-theme-50 text-center font-semibold text-[20px] mt-5">
          Or
        </p>
        <div className="rounded-lg h-[42px]  w-[70vw] md:w-[400px] text-[20px] p-4 bg-theme-200 text-theme-50 flex flex-col items-center justify-center font-bold mt-5 hover:text-theme-200 hover:bg-theme-50 transition-all ease-in-out duration-300 hover:cursor-pointer">
          <p>
            <FontAwesomeIcon icon={faGoogle} className="mr-3" /> Sign in with
            Google
          </p>
        </div>
        <div className="w-[400px] flex flex-row items-center justify-evenly text-white font-bold">
          <p className="underline underline-offset-4 decoration-theme-200 decoration-[2px]">
            Sign up
          </p>
          <p className="underline underline-offset-4 decoration-theme-200 decoration-[2px]">
            Forgot Password?
          </p>
        </div>
      </div>
      <div
        className={
          "md:w-[40%] h-fit flex flex-col items-center justify-start mt-10 pb-10"
        }
      >
        <FontAwesomeIcon
          icon={faUserShield}
          className={
            loading
              ? "hidden transition-all ease-in-out duration-300"
              : error
              ? "hidden transition-all ease-in-out duration-300"
              : "text-theme-200 text-[250px] transition-all ease-in-out duration-300"
          }
        />
        <div
          className={
            loading
              ? "hidden transition-all ease-in-out duration-300"
              : error
              ? "w-[300px] text-center md:w-[500px] h-fit bg-red-600 rounded-lg text-white flex flex-col items-center justify-start gap-5 transition-all ease-in-out duration-300"
              : "hidden transition-all ease-in-out duration-300"
          }
        >
          <h2 className="text-[40px] font-bold items-center justify-center mt-10">
            Oops, an Error Occured
          </h2>
          <p className="text-[20px] font-semibold">{errorText}</p>
          <p className="text-[20px] font-semibold mb-10">{errorCode}</p>
        </div>
        <div
          className={
            loading
              ? "block transition-all ease-in-out duration-300"
              : "hidden transition-all ease-in-out duration-300"
          }
        >
          <Oval
            color="yellow"
            secondaryColor="transparent"
            height={300}
            width={300}
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
