import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";

import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
function NavBarLog({ icon }) {
  const [scroll, setScroll] = useState(0);
  const [nav, setNav] = useState(false);
  const [svg, setSvg] = useState();
  const container = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
  }, [scroll]);
  const handleNav = () => {
    if (nav === false) setNav(true);
    else setNav(false);
  };

  onAuthStateChanged(auth, () => {
    if (auth) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef).then((res) => {
        setSvg(res.data().pref.pic);
        container.current.innerHTML = res.data().pref.pic;
      });
    }
  });
  return (
    <React.Fragment>
      <div
        className={`w-full h-[120px] bg-${
          scroll > 60 ? "[#262525]" : "transparent"
        } fixed top-0 transition-all ease-in-out duration-300 md:flex hidden flex-row items-center justify-between text-white font-bold z-50 `}
      >
        <div className="w-[33%] h-full text-center  flex flex-col items-start justify-center text-[30px] ">
          <p
            className="ml-10 hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/");
            }}
          >
            SONG SURF
          </p>
        </div>
        <div className="w-[33%] h-full flex flex-row items-center justify-evenly text-[20px] ">
          <span
            className="flex flex-col items-center justify-center group hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/account");
            }}
          >
            <p>Account</p>{" "}
            <p className="w-0 group-hover:w-full h-[5px] bg-white transition-all ease-in-out duration-500 "></p>
          </span>
          <span
            className="flex flex-col items-center justify-center group hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/upload");
            }}
          >
            <p>Uploader</p>{" "}
            <p className="w-0 group-hover:w-full h-[5px] bg-white transition-all ease-in-out duration-500 "></p>
          </span>
          <span
            className="flex flex-col items-center justify-center group hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/play");
            }}
          >
            <p>Player</p>{" "}
            <p className="w-0 group-hover:w-full h-[5px] bg-white transition-all ease-in-out duration-500 "></p>
          </span>
          <span
            className="flex flex-col items-center justify-center group hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/help");
            }}
          >
            <p>Help</p>{" "}
            <p className="w-0 group-hover:w-full h-[5px] bg-white transition-all ease-in-out duration-500 "></p>
          </span>
        </div>
        <div className="w-[33%] h-full flex flex-col items-end justify-center">
          <div
            className="w-[64px] h-[78px] rounded-2xl bg-theme-100 mr-10 scale-90 hover:scale-100 transition-all ease-in-out duration-300 hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/account");
            }}
          >
            <img
              src={icon}
              alt={icon}
              className={svg === null ? "w-full aspect-auto" : "hidden"}
            />
            <p
              ref={container}
              className={svg === null ? "hidden" : "w-full aspect-auto"}
            ></p>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-[80px]  bg-${
          scroll > 60 ? "[#262525]" : "transparent"
        } fixed top-0 transition-all ease-in-out duration-300 md:hidden flex flex-col items-start justify-center text-white z-50`}
      >
        <div className="w-full h-full flex flex-row items-center justify-between">
          <p onClick={handleNav}>
            <FontAwesomeIcon icon={faBars} className="ml-4 text-2xl" />
          </p>

          <p className="text-[20px] font-bold">SONG SURF</p>
          <p className="mr-3"></p>
        </div>
      </div>
      <div
        className={`${
          nav
            ? "w-[90vw] h-[100vh] bg-black z-[60] fixed top-0 transition-all ease-in-out duration-300 flex flex-col items-start justify-start text-white"
            : "w-0 h-[100vh] text-transparent bg-black z-[60] fixed top-0 transition-all ease-in-out duration-300"
        }`}
      >
        <div className="w-full h-[40%] flex flex-row items-center justify-center gap-10">
          <h2 className="text-[40px] font-bold">Song Surf</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-4xl absolute top-10 right-10"
            onClick={handleNav}
          />
        </div>
        <div className="w-full h-[50%] flex flex-col items-center justify-start gap-5 text-[30px] font-semibold">
          <p>Account</p>
          <p>Uploader</p>
          <p>Player</p>
          <p>Help</p>
        </div>
        <div
          className={
            nav
              ? "w-[100vw] h-[20%] flex flex-col items-center justify-center transition-all ease-in-out duration-300"
              : "w-0 h-[10%]  flex-col items-center justify-center hidden transition-all ease-in-out duration-300"
          }
        >
          <div
            className="w-[64px] h-[78px] rounded-2xl bg-theme-100 mr-10 scale-90 hover:scale-100 transition-all ease-in-out duration-300 hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/account");
            }}
          >
            <img
              src={icon}
              alt={icon}
              className={svg === null ? "w-full aspect-auto" : "hidden"}
            />
            <p
              ref={container}
              className={svg === null ? "hidden" : "w-full aspect-auto"}
            ></p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavBarLog;
