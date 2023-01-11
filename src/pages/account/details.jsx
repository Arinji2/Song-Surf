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
      <div className="w-full h-fit md:h-screen bg-[#090707] flex flex-col items-center justify-end">
        <div className="w-full h-fit md:h-[87vh]  flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center w-full h-[40%]">
            <h1 className="text-[50px] font-bold text-theme-200 md:mt-0 mt-14 text-center">
              {"Update your Account"}
            </h1>
            <p className="text-[20px] font-bold text-white text-center">
              {"(Update those Values which you want Changed)"}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-evenly w-full h-full md:h-[60%] gap-10 md:gap-4 pb-5">
            <div className="flex flex-col items-center justify-start gap-10 h-[300px] md:h-full md:w-[25%] md:border-r-2 md:border-b-0 border-b-2 mb-2 md:mr-2 border-white  relative">
              <h3 className="text-[30px] text-white font-semibold">
                Type your new Name
              </h3>
              <input
                type="email"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                className="rounded-lg h-[42px] w-[90%] text-[20px] p-4 outline-none font-bold mt-10"
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
              />
              <p
                className="p-2 rounded-lg bg-green-500 text-[20px] font-bold text-white absolute bottom-5 hover:cursor-pointer scale-110 hover:scale-100 transition-all ease-in-out duration-300"
                onClick={() => {
                  const docRef = doc(db, "users", auth.currentUser.uid);
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

            <div className="flex flex-col items-center justify-start gap-10 h-[300px] md:h-full md:w-[25%] md:border-r-2 md:border-b-0 border-b-2 mb-2 md:mr-2 border-white  relative">
              <h3 className="text-[30px] text-white font-semibold">
                Type your new Email
              </h3>
              <input
                type="email"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                className="rounded-lg h-[42px] w-[90%] text-[20px] p-4 outline-none font-bold mt-10"
                onChange={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    / /g,
                    ""
                  );

                  setEmail(e.currentTarget.value);
                }}
              />
              <p
                className="p-2 rounded-lg bg-green-500 text-[20px] font-bold text-white absolute bottom-5 hover:cursor-pointer scale-110 hover:scale-100 transition-all ease-in-out duration-300"
                onClick={() => {
                  const docRef = doc(db, "users", auth.currentUser.uid);
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
            <div className="flex flex-col items-center justify-start gap-10 h-[300px] md:h-full md:w-[25%] md:border-r-2 md:border-b-0 border-b-2 mb-2 md:mr-2 border-white  relative">
              <h3 className="text-[30px] text-white font-semibold">
                Update your Icon
              </h3>
              <div className="flex flex-row items-center justify-evenly w-full mt-5">
                <div className="w-[100px] h-[100px] rounded-xl bg-theme-100 flex flex-col items-center justify-center ">
                  <div className="w-[80px] h-[80px]" ref={containerRef}></div>
                </div>
                <p
                  className="text-xl p-4 m-3 text-white bg-theme-200 scale-90 hover:scale-100 transition-all ease-in-out duration-300 rounded-lg hover:cursor-pointer"
                  onClick={random}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </p>
              </div>
              <p
                className="p-2 rounded-lg bg-green-500 text-[20px] font-bold text-white absolute bottom-5 hover:cursor-pointer scale-110 hover:scale-100 transition-all ease-in-out duration-300"
                onClick={() => {
                  const docRef = doc(db, "users", auth.currentUser.uid);
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
            <div className="flex flex-col items-center justify-start gap-10 h-[300px] md:h-full md:w-[25%]  md:border-b-0 border-b-2 mb-2 md:mr-2 border-white  relative">
              <h3 className="text-[30px] text-white font-semibold">
                Update your Password
              </h3>
              <p
                className="mt-8 p-2 rounded-lg bg-theme-200 text-[20px] font-bold text-white hover:cursor-pointer scale-110 hover:scale-100 transition-all ease-in-out duration-300"
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
              <p className="p-2 rounded-lg bg-green-500 text-[20px] font-bold text-white absolute bottom-5 hover:cursor-pointer scale-110 hover:scale-100 transition-all ease-in-out duration-300">
                Change
              </p>
            </div>
          </div>
          <div
            className={
              success
                ? "bg-[#090707] w-full h-full fixed top-0 left-0 z-40 flex flex-col items-center justify-center"
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
