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
          window.location.assign("/dashboard");
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
      <div className="w-full h-fit md:h-screen bg-black flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-[60%] w-full h-screen flex flex-col items-center justify-center gap-5 mt-20 md:mt-4">
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
          <div
            className="rounded-lg h-[42px]  w-[70vw] md:w-[400px] text-[20px] p-4 bg-theme-200 text-theme-50 flex flex-col items-center justify-center font-bold mt-5 hover:text-theme-200 hover:bg-theme-50 transition-all ease-in-out duration-300 hover:cursor-pointer"
            onClick={loginwithGoogle}
          >
            <p>
              <FontAwesomeIcon icon={faGoogle} className="mr-3" /> Sign in with
              Google
            </p>
          </div>
          <div className="w-[400px] flex flex-row items-center justify-evenly text-white font-bold">
            <p className="underline underline-offset-4 decoration-theme-200 decoration-[2px] hover:cursor-pointer">
              Sign up
            </p>
            <p
              className="underline underline-offset-4 decoration-theme-200 decoration-[2px] hover:cursor-pointer"
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
                : success
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
          <div
            className={
              success
                ? "w-full h-screen bg-black flex flex-col items-center justify-center fixed top-0 left-0 z-20"
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
