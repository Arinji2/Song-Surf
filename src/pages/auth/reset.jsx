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

      <div className="w-full h-fit md:h-screen bg-black flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-[60%] w-full h-screen flex flex-col items-center justify-center gap-5 mb-10 mt-20 md:mt-0">
          <h2 className="text-center text-[50px] text-theme-200 font-bold ">
            Reset your Song Surf Password
          </h2>
          <h3 className="text-theme-100 text-[20px] font-semibold">
            Input your Email
          </h3>
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

          <div
            className="rounded-lg h-[42px] w-[70vw] md:w-[400px] text-[20px] p-4 bg-theme-200 text-theme-50 flex flex-col items-center justify-center font-bold mt-5 hover:text-theme-200 hover:bg-theme-50 transition-all ease-in-out duration-300 hover:cursor-pointer"
            onClick={sendEmail}
          >
            Send Reset Link
          </div>
        </div>
        <div
          className={
            "md:w-[40%] h-fit flex flex-col items-center justify-start mt-10 pb-10"
          }
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className={
              reset
                ? "hidden"
                : "text-theme-200 text-[250px] transition-all ease-in-out duration-300"
            }
          />

          <FontAwesomeIcon
            icon={faEnvelopeOpen}
            className={
              reset
                ? "text-theme-200 text-[250px] transition-all ease-in-out duration-300 hover:cursor-pointer"
                : "hidden"
            }
            onClick={() => {
              window.location.assign("/login");
            }}
          />
          <h2
            className={
              reset
                ? "text-white text-2xl font-bold text-center mt-10"
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
