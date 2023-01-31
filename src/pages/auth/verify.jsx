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

      newAnimation.addEventListener("complete", () => {
        if (auth.currentUser.emailVerified)
          window.location.assign(`/dashboard`);
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
    const docRef = doc(db, "songsurf", auth.currentUser.uid);
    setDoc(docRef, {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      storage: `/users/${auth.currentUser.uid}`,
      songs: [],
      pref: {
        dark: true,
        pic: null,
      },
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
    if (
      auth.currentUser.emailVerified &&
      loading === false &&
      success === false
    )
      window.location.assign(`/dashboard`);
  });
  return (
    <React.Fragment>
      <NavBar />

      <div className="flex h-fit w-full flex-col items-center justify-center bg-[#090707] md:h-screen md:flex-row">
        <div className="mb-10 mt-10 flex h-screen w-full flex-col items-center justify-center gap-5 md:mt-0 md:w-[60%]">
          <h2 className="text-center text-[50px] font-bold text-theme-200 ">
            Verify your Song Surf Email
          </h2>

          <div
            className="mt-5 flex h-[42px] w-[70vw] flex-col items-center justify-center rounded-lg bg-theme-200 p-4 text-[20px] font-bold text-theme-50 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-theme-50 hover:text-theme-200 md:w-[400px]"
            onClick={sendEmail}
          >
            Send Verification Email
          </div>
          <div
            className="mt-5 flex h-[42px] w-[70vw] flex-col items-center justify-center rounded-lg bg-theme-200 p-4 text-[20px] font-bold text-theme-50 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-theme-50 hover:text-theme-200 md:w-[400px]"
            onClick={checkEmail}
          >
            Check Verification
          </div>
        </div>
        <div
          className={
            "relative mt-10 flex h-fit flex-col items-center justify-start pb-10 md:w-[40%]"
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
                : "text-[250px] text-theme-200 transition-all duration-300 ease-in-out"
            }
          />

          <div
            className={
              reset
                ? "flex h-full w-full flex-col items-center justify-center"
                : "hidden"
            }
          >
            <FontAwesomeIcon
              icon={faEnvelopeOpen}
              className={
                "text-[250px] text-theme-200 transition-all duration-300 ease-in-out hover:cursor-pointer"
              }
              onClick={() => {
                window.location.assign("/login");
              }}
            />
            <h2 className={"mt-10 text-center text-2xl font-bold text-white"}>
              Email Verification Link Sent
            </h2>
          </div>
          <div
            className={
              error
                ? "flex h-full w-full flex-col items-center justify-center"
                : "hidden"
            }
          >
            <div className="flex h-fit w-[300px] flex-col items-center justify-start gap-5 rounded-lg bg-red-600 text-center text-white transition-all duration-300 ease-in-out md:w-[500px]">
              <h2 className="mt-10 items-center justify-center text-[40px] font-bold">
                Oops, an Error Occured
              </h2>
              <p className="text-[30px] font-semibold">Email Not Verified</p>
            </div>
          </div>
          <div
            className={
              loading
                ? "flex h-full w-full flex-col items-center justify-center"
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
                ? "fixed top-0 left-0 z-20 flex h-full w-full flex-col items-center justify-center bg-[#090707]"
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
