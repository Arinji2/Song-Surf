import {
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import { auth } from "../../firebase.config";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  sendEmailVerification,
} from "firebase/auth";
function Verify() {
  const [email, setEmail] = useState("");
  const [reset, setReset] = useState(false);

  const sendEmail = () => {
    sendEmailVerification(auth.currentUser);
    setReset(true);
  };

  const checkEmail = () => {
    if (auth.currentUser.emailVerified) window.location.assign("/dashboard");
    else setReset(false);
  };

  return (
    <React.Fragment>
      <NavBar />

      <div className="w-full h-fit md:h-screen bg-black flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-[60%] w-full h-screen flex flex-col items-center justify-center gap-5 mb-10 mt-20 md:mt-0">
          <h2 className="text-center text-[50px] text-theme-200 font-bold ">
            Verify your Song Surf Email
          </h2>

          <div
            className="rounded-lg h-[42px] w-[70vw] md:w-[400px] text-[20px] p-4 bg-theme-200 text-theme-50 flex flex-col items-center justify-center font-bold mt-5 hover:text-theme-200 hover:bg-theme-50 transition-all ease-in-out duration-300 hover:cursor-pointer"
            onClick={sendEmail}
          >
            Send Verification Email
          </div>
          <div
            className="rounded-lg h-[42px] w-[70vw] md:w-[400px] text-[20px] p-4 bg-theme-200 text-theme-50 flex flex-col items-center justify-center font-bold mt-5 hover:text-theme-200 hover:bg-theme-50 transition-all ease-in-out duration-300 hover:cursor-pointer"
            onClick={checkEmail}
          >
            Check Verification
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
            Email Verification Link Sent
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Verify;
