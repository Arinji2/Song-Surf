import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUserShield } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import { Oval } from "react-loader-spinner";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import lottie from "lottie-web";
import NavBarSticky from "../../components/navbarsticky";
import NavBar from "../../components/navbar";

function Login() {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("No Account Found");
  const [errorCode, setErrorCode] = useState(2);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [, setAnimation] = useState(null);

  useEffect(() => {
    if (success) {
      const newAnimation = lottie.loadAnimation({
        container: document.getElementById("animation-container"),
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "./complete.json",
        heigh: 200,
        width: 200,
      });
      setAnimation(newAnimation);

      newAnimation.addEventListener("complete", () => {
        if (auth.currentUser.emailVerified)
          window.location.assign(`/dashboard`);
        else window.location.assign("/verify");
      });
    }
  }, [success]);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        if (error.code === "auth/user-not-found")
          setErrorText("Could Not Find User");
        else if (error.code === "auth/wrong-password")
          setErrorText("Incorrect Password");
        else if (error.code === "auth/internal-error")
          setErrorText("An Internal Error has Occurred, Try again later");
        else if (error.code === "auth/invalid-email")
          setErrorText("Email Invalid, Please try Again");
        else setErrorText(error.code);
      });
  };

  const loginwithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setErrorText(error);
      });
  };
  return (
    <React.Fragment>
      <NavBar />
      <div className="flex h-fit w-full flex-col items-center justify-center bg-[#090707] md:h-screen md:flex-row">
        <div className="mt-20 flex h-screen w-full flex-col items-center justify-center gap-5 md:mt-4 md:w-[60%]">
          <h2 className="text-center text-[50px] font-bold text-theme-200 ">
            Login to Song Surf
          </h2>
          <h3 className="text-[20px] font-semibold text-theme-100">Email</h3>
          <input
            type="email"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck="false"
            className="h-[42px] w-[90vw] rounded-lg p-4 text-[20px] font-bold outline-none md:w-[480px]"
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/ /g, "");

              setEmail(e.currentTarget.value);
            }}
          />
          <h3 className="text-[20px] font-semibold text-theme-100">Password</h3>
          <input
            type="password"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck="false"
            className="h-[42px] w-[90vw] rounded-lg p-4 text-[20px] outline-none md:w-[480px]"
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/ /g, "");

              setPassword(e.currentTarget.value);
            }}
          />
          <div
            className="mt-5 flex h-[42px] w-[70vw] flex-col items-center justify-center rounded-lg bg-theme-200 p-4 text-[20px] font-bold text-theme-50 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-theme-50 hover:text-theme-200 md:w-[400px]"
            onClick={handleLogin}
          >
            Log in
          </div>
          <p className="mt-5 w-[400px] text-center text-[20px] font-semibold text-theme-50">
            Or
          </p>
          <div
            className="mt-5 flex  h-[42px] w-[70vw] flex-col items-center justify-center rounded-lg bg-theme-200 p-4 text-[20px] font-bold text-theme-50 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-theme-50 hover:text-theme-200 md:w-[400px]"
            onClick={loginwithGoogle}
          >
            <p>
              <FontAwesomeIcon icon={faGoogle} className="mr-3" /> Sign in with
              Google
            </p>
          </div>
          <div className="flex w-[400px] flex-row items-center justify-evenly font-bold text-white">
            <p className="underline decoration-theme-200 decoration-[2px] underline-offset-4 hover:cursor-pointer">
              Sign up
            </p>
            <p
              className="underline decoration-theme-200 decoration-[2px] underline-offset-4 hover:cursor-pointer"
              onClick={() => {
                window.location.assign("/reset");
              }}
            >
              Forgot Password?
            </p>
          </div>
        </div>
        <div
          className={
            "mt-10 flex h-fit flex-col items-center justify-start pb-10 md:w-[40%]"
          }
        >
          <FontAwesomeIcon
            icon={faUserShield}
            className={
              loading
                ? "hidden transition-all duration-300 ease-in-out"
                : error
                ? "hidden transition-all duration-300 ease-in-out"
                : success
                ? "hidden transition-all duration-300 ease-in-out"
                : "text-[250px] text-theme-200 transition-all duration-300 ease-in-out"
            }
          />
          <div
            className={
              loading
                ? "hidden transition-all duration-300 ease-in-out"
                : error
                ? "flex h-fit w-[300px] flex-col items-center justify-start gap-5 rounded-lg bg-red-600 text-center text-white transition-all duration-300 ease-in-out md:w-[500px]"
                : "hidden transition-all duration-300 ease-in-out"
            }
          >
            <h2 className="mt-10 items-center justify-center text-[40px] font-bold">
              Oops, an Error Occured
            </h2>
            <p className="text-[20px] font-semibold">{errorText}</p>
            <p className="mb-10 text-[20px] font-semibold">{errorCode}</p>
          </div>
          <div
            className={
              loading
                ? "block transition-all duration-300 ease-in-out"
                : "hidden transition-all duration-300 ease-in-out"
            }
          >
            <Oval
              color="yellow"
              secondaryColor="transparent"
              height={300}
              width={300}
            />
          </div>
          <div
            className={
              success
                ? "fixed top-0 left-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-[#090707]"
                : "hidden"
            }
          >
            <div id="animation-container" className=" "></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
