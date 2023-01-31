import React, { useState, useEffect, useRef } from "react";
import NavBarLog from "../components/navbarlog";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/personas";
import icon from "../assets/default.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/fontawesome-free-solid";
import Lottie from "lottie-web";
import { auth, db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
function Finish() {
  const [name, setName] = useState("Guest");
  const [svgState, setSvg] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const containerRef = useRef(null);
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
      newAnimation.addEventListener("complete", () => {
        window.location.assign(`/dashboard`);
      });
    }
  }, [success]);
  useEffect(() => {
    if (loading) {
      const newAnimation = Lottie.loadAnimation({
        container: document.getElementById("loading-container"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "./loading.json",
        heigh: 200,
        width: 200,
      });
    }
  }, [loading]);
  const random = () => {
    let svg = createAvatar(style, {
      seed: Math.random().toString(),
    });

    setSvg(svg);
    containerRef.current.innerHTML = svg;
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      const docRef = doc(db, "songsurf", auth.currentUser.uid);

      updateDoc(docRef, {
        name: name,
        "pref.pic": svgState,
      }).then(() => {
        setLoading(false);
        setSuccess(true);
      });
    }, 2000);
  };
  useEffect(() => {
    random();
  }, []);
  return (
    <React.Fragment>
      <NavBarLog icon={icon} />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-[#090707]">
        <h1 className="text-[30px] font-bold  text-theme-200 md:text-[40px]">
          Finish Your Account Setup
        </h1>
        <h3 className="text-[30px] font-semibold text-white">
          What should we call you?
        </h3>
        <input
          type="email"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          className="h-[42px] w-[90vw] rounded-lg p-4 text-[20px] font-bold outline-none md:w-[480px]"
          onChange={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/ /g, "");
            setName(e.currentTarget.value);
          }}
        />
        <h3 className="text-[30px] font-semibold text-white">Choose an Icon</h3>

        <div className="flex w-[80vw] flex-col items-center justify-center border-b-2 border-white pb-4 ">
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
          className="absolute bottom-10 rounded-lg border-2 border-theme-200 bg-theme-200 p-2 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-200"
          onClick={submit}
        >
          Submit
        </p>
      </div>
      <div
        className={
          loading
            ? "absolute bottom-0 left-0 z-30 h-[85vh] w-full bg-[#090707]"
            : "hidden"
        }
        id="loading-container"
      ></div>
      <div
        className={
          success
            ? "absolute bottom-0 left-0 z-50 h-[85vh] w-full bg-[#090707]"
            : "hidden"
        }
        id="success-container"
      ></div>
    </React.Fragment>
  );
}

export default Finish;
