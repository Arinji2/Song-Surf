import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";

import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import icon from "../assets/default.svg";
function NavBarLog() {
  const [scroll, setScroll] = useState(0);
  const [nav, setNav] = useState(false);
  const [svg, setSvg] = useState();
  const containerPc = useRef(null);
  const containerMob = useRef(null);

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
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth) {
        const docRef = doc(db, "songsurf", auth.currentUser.uid);
        getDoc(docRef).then((res) => {
          setSvg(res.data().pref.pic);

          containerPc.current.innerHTML = res.data().pref.pic;
          containerMob.current.innerHTML = res.data().pref.pic;
        });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div
        className={`h-[120px] w-full bg-${
          scroll > 60 ? "[#262525]" : "[#090707]"
        } fixed top-0 z-50 hidden flex-row items-center justify-between font-bold text-white transition-all duration-300 ease-in-out md:flex `}
      >
        <div className="flex h-full w-[33%]  flex-col items-start justify-center text-center text-[30px] ">
          <p
            className="ml-10 hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/");
            }}
          >
            SONG SURF
          </p>
        </div>
        <div className="flex h-full w-[33%] flex-row items-center justify-evenly text-[20px] ">
          <span
            className="group flex flex-col items-center justify-center hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/dashboard");
            }}
          >
            <p>Dashboard</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
          <span
            className="group flex flex-col items-center justify-center hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/account");
            }}
          >
            <p>Account</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
          <span
            className="group flex flex-col items-center justify-center hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/upload");
            }}
          >
            <p>Uploader</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
          <span
            className="group flex flex-col items-center justify-center hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/play");
            }}
          >
            <p>Player</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
          <span
            className="group flex flex-col items-center justify-center hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/help");
            }}
          >
            <p>Help</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
        </div>
        <div className="flex h-full w-[33%] flex-col items-end justify-center">
          <div
            className="mr-10 h-[78px] w-[64px] scale-90 rounded-2xl bg-theme-100 transition-all duration-300 ease-in-out hover:scale-100 hover:cursor-pointer"
            onClick={() => {
              window.location.assign("/account");
            }}
          >
            <img
              src={icon}
              alt={icon}
              className={svg === null ? "aspect-auto w-full" : "hidden"}
            />
            <p
              ref={containerPc}
              className={svg === null ? "hidden" : "aspect-auto w-full"}
            ></p>
          </div>
        </div>
      </div>
      <div
        className={`h-[80px] w-full  bg-${
          scroll > 60 ? "[#262525]" : "transparent"
        } fixed top-0 z-50 flex flex-col items-start justify-center text-white transition-all duration-300 ease-in-out md:hidden`}
      >
        <div className="flex h-full w-full flex-row items-center justify-between">
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
            ? "fixed top-0 z-[60] flex h-[100vh] w-[90vw] flex-col items-start justify-start bg-[#090707] text-white transition-all duration-300 ease-in-out"
            : "fixed top-0 z-[60] h-[100vh] w-0 bg-[#090707] text-transparent transition-all duration-300 ease-in-out"
        }`}
      >
        <div className="flex h-[30%] w-full flex-row items-center justify-center gap-10">
          <h2 className="text-[40px] font-bold">Song Surf</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-10 right-10 text-4xl"
            onClick={handleNav}
          />
        </div>
        <div className="flex h-[50%] w-full flex-col items-center justify-start gap-5 text-[30px] font-semibold">
          <p>Dashboard</p>
          <p>Account</p>
          <p>Uploader</p>
          <p>Player</p>
          <p>Help</p>
        </div>
        <div
          className={
            nav
              ? "flex h-[20%] w-[100vw] translate-x-0 flex-col items-center  justify-center transition-all duration-1000 ease-in-out"
              : "h-[10%] w-0  -translate-x-64 flex-col items-center justify-center transition-all duration-1000 ease-in-out "
          }
        >
          <div
            className={
              nav
                ? "duration-3000 mr-10 h-[78px] w-[64px] scale-90 rounded-2xl bg-theme-100 transition-all ease-in-out hover:scale-100 hover:cursor-pointer"
                : "hidden"
            }
            onClick={() => {
              window.location.assign("/account");
            }}
          >
            <img
              src={icon}
              alt={icon}
              className={svg === null ? "aspect-auto w-full" : "hidden"}
            />
            <p
              ref={containerMob}
              className={svg === null ? "hidden" : "aspect-auto w-full "}
            ></p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavBarLog;
