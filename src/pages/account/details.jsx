import React, { useState, useEffect, useRef } from "react";
import NavBarLog from "../../components/navbarlog";
import { auth, db } from "../../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import { updateEmail, sendPasswordResetEmail } from "firebase/auth";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/personas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/fontawesome-free-solid";
import Lottie from "lottie-web";
function Details() {
  const containerRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [svg, setSvg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (document.readyState === "interactive") random();
  }, []);
  const random = () => {
    let svg = createAvatar(style, {
      seed: Math.random().toString(),
    });
    setSvg(svg);
    containerRef.current.innerHTML = svg;
  };

  useEffect(() => {
    if (success) {
      const newAnimation = Lottie.loadAnimation({
        container: document.getElementById("success-container"),
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "./complete.json",
        heigh: 200,
        width: 200,
      });
      newAnimation.setSpeed(0.9);
      newAnimation.addEventListener("complete", () => {
        setSuccess(false);

        document.getElementById("success-container").innerHTML = "";
      });
    }
  }, [success]);

  return (
    <React.Fragment>
      <NavBarLog />
      <div className="flex h-fit w-full flex-col items-center justify-end bg-[#090707] md:h-screen">
        <div className="flex h-fit w-full  flex-col items-center justify-center gap-5 md:h-[87vh]">
          <div className="flex h-[40%] w-full flex-col items-center justify-center">
            <h1 className="mt-14 text-center text-[50px] font-bold text-theme-200 md:mt-0">
              {"Update your Account"}
            </h1>
            <p className="text-center text-[20px] font-bold text-white">
              {"(Update those Values which you want Changed)"}
            </p>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-evenly gap-10 pb-5 md:h-[60%] md:flex-row md:gap-4">
            <div className="relative mb-2 flex h-[300px] flex-col items-center justify-start gap-10 border-b-2 border-white md:mr-2 md:h-full md:w-[25%] md:border-r-2  md:border-b-0">
              <h3 className="text-[30px] font-semibold text-white">
                Type your new Name
              </h3>
              <input
                type="email"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                className="mt-10 h-[42px] w-[90%] rounded-lg p-4 text-[20px] font-bold outline-none"
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
              />
              <p
                className="absolute bottom-5 scale-110 rounded-lg bg-green-500 p-2 text-[20px] font-bold text-white transition-all duration-300 ease-in-out hover:scale-100 hover:cursor-pointer"
                onClick={() => {
                  const docRef = doc(db, "songsurf", auth.currentUser.uid);
                  updateDoc(docRef, {
                    name: name,
                  })
                    .then(() => {
                      setSuccess(true);
                    })
                    .catch(() => {
                      window.location.assign("/error");
                    });
                }}
              >
                Change
              </p>
            </div>

            <div className="relative mb-2 flex h-[300px] flex-col items-center justify-start gap-10 border-b-2 border-white md:mr-2 md:h-full md:w-[25%] md:border-r-2  md:border-b-0">
              <h3 className="text-[30px] font-semibold text-white">
                Type your new Email
              </h3>
              <input
                type="email"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                className="mt-10 h-[42px] w-[90%] rounded-lg p-4 text-[20px] font-bold outline-none"
                onChange={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    / /g,
                    ""
                  );

                  setEmail(e.currentTarget.value);
                }}
              />
              <p
                className="absolute bottom-5 scale-110 rounded-lg bg-green-500 p-2 text-[20px] font-bold text-white transition-all duration-300 ease-in-out hover:scale-100 hover:cursor-pointer"
                onClick={() => {
                  const docRef = doc(db, "songsurf", auth.currentUser.uid);
                  updateDoc(docRef, {
                    email: email,
                  })
                    .then(() => {
                      updateEmail(auth.currentUser, email);
                    })
                    .then(() => {
                      setSuccess(true);
                    })
                    .catch(() => {
                      window.location.assign("/error");
                    });
                }}
              >
                Change
              </p>
            </div>
            <div className="relative mb-2 flex h-[300px] flex-col items-center justify-start gap-10 border-b-2 border-white md:mr-2 md:h-full md:w-[25%] md:border-r-2  md:border-b-0">
              <h3 className="text-[30px] font-semibold text-white">
                Update your Icon
              </h3>
              <div className="mt-5 flex w-full flex-row items-center justify-evenly">
                <div className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-xl bg-theme-100 ">
                  <div className="h-[80px] w-[80px]" ref={containerRef}></div>
                </div>
                <p
                  className="m-3 scale-90 rounded-lg bg-theme-200 p-4 text-xl text-white transition-all duration-300 ease-in-out hover:scale-100 hover:cursor-pointer"
                  onClick={random}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </p>
              </div>
              <p
                className="absolute bottom-5 scale-110 rounded-lg bg-green-500 p-2 text-[20px] font-bold text-white transition-all duration-300 ease-in-out hover:scale-100 hover:cursor-pointer"
                onClick={() => {
                  const docRef = doc(db, "songsurf", auth.currentUser.uid);
                  updateDoc(docRef, {
                    "pref.pic": svg,
                  })
                    .then(() => {
                      setSuccess(true);
                    })
                    .catch(() => {
                      window.location.assign("/error");
                    });
                }}
              >
                Change
              </p>
            </div>
            <div className="relative mb-2 flex h-[300px] flex-col items-center justify-start gap-10  border-b-2 border-white md:mr-2 md:h-full md:w-[25%]  md:border-b-0">
              <h3 className="text-[30px] font-semibold text-white">
                Update your Password
              </h3>
              <p
                className="mt-8 scale-110 rounded-lg bg-theme-200 p-2 text-[20px] font-bold text-white transition-all duration-300 ease-in-out hover:scale-100 hover:cursor-pointer"
                onClick={() => {
                  sendPasswordResetEmail(auth, auth.currentUser.email)
                    .then(() => {
                      setSuccess(true);
                    })
                    .catch(() => {
                      window.location.assign("/error");
                    });
                }}
              >
                Send Password Reset Link
              </p>
              <p className="absolute bottom-5 scale-110 rounded-lg bg-green-500 p-2 text-[20px] font-bold text-white transition-all duration-300 ease-in-out hover:scale-100 hover:cursor-pointer">
                Change
              </p>
            </div>
          </div>
          <div
            className={
              success
                ? "fixed top-0 left-0 z-40 flex h-full w-full flex-col items-center justify-center bg-[#090707]"
                : "hidden"
            }
          >
            <div id="success-container"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Details;
