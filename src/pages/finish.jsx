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
      <div className="w-full h-screen bg-[#090707] flex flex-col items-center justify-center gap-5">
        <h1 className="text-theme-200 text-[30px]  md:text-[40px] font-bold">
          Finish Your Account Setup
        </h1>
        <h3 className="text-white font-semibold text-[30px]">
          What should we call you?
        </h3>
        <input
          type="email"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          className="rounded-lg h-[42px] w-[90vw] md:w-[480px] text-[20px] p-4 outline-none font-bold"
          onChange={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/ /g, "");
            setName(e.currentTarget.value);
          }}
        />
        <h3 className="text-white font-semibold text-[30px]">Choose an Icon</h3>

        <div className="border-b-2 w-[80vw] flex flex-col items-center justify-center border-white pb-4 ">
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
          className="text-2xl text-white font-bold bg-theme-200 p-2 rounded-lg absolute bottom-10 border-2 border-theme-200 hover:text-theme-200 hover:bg-white transition-all ease-in-out duration-300 hover:cursor-pointer"
          onClick={submit}
        >
          Submit
        </p>
      </div>
      <div
        className={
          loading
            ? "absolute z-30 w-full h-[85vh] bottom-0 left-0 bg-[#090707]"
            : "hidden"
        }
        id="loading-container"
      ></div>
      <div
        className={
          success
            ? "absolute z-50 w-full h-[85vh] bottom-0 left-0 bg-[#090707]"
            : "hidden"
        }
        id="success-container"
      ></div>
    </React.Fragment>
  );
}

export default Finish;
