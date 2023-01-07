import {
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import { auth, storage, db } from "../../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";

import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { Oval } from "react-loader-spinner";
import Lottie from "lottie-web";
function Verify() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState(false);

  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (success) {
      const newAnimation = Lottie.loadAnimation({
        container: document.getElementById("animation-container"),
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "./complete.json",
        heigh: 200,
        width: 200,
      });

      setAnimation(newAnimation);
      newAnimation.setSpeed(0.5);
      newAnimation.addEventListener("complete", () => {
        if (auth.currentUser.emailVerified)
          window.location.assign("/dashboard");
        else window.location.assign("/verify");
      });
    }
  }, [success]);
  const sendEmail = () => {
    sendEmailVerification(auth.currentUser);
    setReset(true);
    setError(false);
  };

  const checkDocs = () => {
    setError(false);
    setReset(false);
    setLoading(true);
    const docRef = doc(db, "users", auth.currentUser.uid);
    setDoc(docRef, {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      storage: `/users/${auth.currentUser.uid}`,
      songs: [],
    })
      .then(() => {
        const storeRef = ref(
          storage,
          `songsurf/${auth.currentUser.uid}/initial.txt`
        );
        uploadBytes(storeRef)
          .then(() => {
            setError(false);
            setLoading(false);
            setSuccess(true);
          })
          .catch((er) => {
            setLoading(false);
            setError(true);
            console.error(er);
          });
      })
      .catch((er) => {
        setLoading(false);
        setError(true);
      });
  };

  const checkEmail = () => {
    auth.currentUser.reload();
    setTimeout(() => {
      if (auth.currentUser.emailVerified) checkDocs();
      else {
        setReset(false);
        setError(true);
      }
    }, 1000);
  };
  onAuthStateChanged(auth, () => {
    if (auth.currentUser.emailVerified && loading === false)
      window.location.assign("/dashboard");
  });
  return (
    <React.Fragment>
      <NavBar />

      <div className="w-full h-fit md:h-screen bg-black flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-[60%] w-full h-screen flex flex-col items-center justify-center gap-5 mb-10 mt-10 md:mt-0">
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
            "md:w-[40%] h-fit flex flex-col items-center justify-start mt-10 pb-10 relative"
          }
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className={
              reset
                ? "hidden"
                : loading
                ? "hidden"
                : success
                ? "hidden"
                : error
                ? "hidden"
                : "text-theme-200 text-[250px] transition-all ease-in-out duration-300"
            }
          />

          <div
            className={
              reset
                ? "w-full h-full flex flex-col items-center justify-center"
                : "hidden"
            }
          >
            <FontAwesomeIcon
              icon={faEnvelopeOpen}
              className={
                "text-theme-200 text-[250px] transition-all ease-in-out duration-300 hover:cursor-pointer"
              }
              onClick={() => {
                window.location.assign("/login");
              }}
            />
            <h2 className={"text-white text-2xl font-bold text-center mt-10"}>
              Email Verification Link Sent
            </h2>
          </div>
          <div
            className={
              error
                ? "w-full h-full flex flex-col items-center justify-center"
                : "hidden"
            }
          >
            <div className="w-[300px] text-center md:w-[500px] h-fit bg-red-600 rounded-lg text-white flex flex-col items-center justify-start gap-5 transition-all ease-in-out duration-300">
              <h2 className="text-[40px] font-bold items-center justify-center mt-10">
                Oops, an Error Occured
              </h2>
              <p className="text-[30px] font-semibold">Email Not Verified</p>
            </div>
          </div>
          <div
            className={
              loading
                ? "w-full h-full flex flex-col items-center justify-center"
                : "hidden"
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
                ? "w-full h-full bg-black flex flex-col items-center justify-center fixed top-0 left-0 z-20"
                : "hidden"
            }
            id="animation-container"
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Verify;
