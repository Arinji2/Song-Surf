import {
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import { auth } from "../../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
function Reset() {
  const [email, setEmail] = useState("");
  const [reset, setReset] = useState(false);

  const sendEmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      setReset(true);
    });
  };

  return (
    <React.Fragment>
      <NavBar />

      <div className="flex h-fit w-full flex-col items-center justify-center bg-[#090707] md:h-screen md:flex-row">
        <div className="mb-10 mt-20 flex h-screen w-full flex-col items-center justify-center gap-5 md:mt-0 md:w-[60%]">
          <h2 className="text-center text-[50px] font-bold text-theme-200 ">
            Reset your Song Surf Password
          </h2>
          <h3 className="text-[20px] font-semibold text-theme-100">
            Input your Email
          </h3>
          <input
            type="email"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck="false"
            className="h-[42px] w-[90vw] rounded-lg p-4 text-[20px] font-bold outline-none md:w-[480px]"
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/ /g, "");
              e.currentTarget.value = e.currentTarget.value.toLowerCase();
              setEmail(e.currentTarget.value);
            }}
          />

          <div
            className="mt-5 flex h-[42px] w-[70vw] flex-col items-center justify-center rounded-lg bg-theme-200 p-4 text-[20px] font-bold text-theme-50 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-theme-50 hover:text-theme-200 md:w-[400px]"
            onClick={sendEmail}
          >
            Send Reset Link
          </div>
        </div>
        <div
          className={
            "mt-10 flex h-fit flex-col items-center justify-start pb-10 md:w-[40%]"
          }
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className={
              reset
                ? "hidden"
                : "text-[250px] text-theme-200 transition-all duration-300 ease-in-out"
            }
          />

          <FontAwesomeIcon
            icon={faEnvelopeOpen}
            className={
              reset
                ? "text-[250px] text-theme-200 transition-all duration-300 ease-in-out hover:cursor-pointer"
                : "hidden"
            }
            onClick={() => {
              window.location.assign("/login");
            }}
          />
          <h2
            className={
              reset
                ? "mt-10 text-center text-2xl font-bold text-white"
                : "hidden"
            }
          >
            Password Reset Mail Sent, click the Icon to go back to Login
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reset;
