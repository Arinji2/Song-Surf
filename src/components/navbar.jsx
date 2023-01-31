import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";
function NavBar() {
  const [scroll, setScroll] = useState(0);
  const [nav, setNav] = useState(false);

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
  return (
    <React.Fragment>
      <div
        className={`h-[120px] w-full bg-${
          scroll > 60 ? "[#262525]" : "#090707"
        } fixed top-0 z-50 hidden flex-row items-center justify-between font-bold text-white transition-all duration-300 ease-in-out md:flex `}
      >
        <div className="flex h-full w-[33%]  flex-col items-center justify-center text-center text-[30px] ">
          SONG SURF
        </div>
        <div className="flex h-full w-[33%] flex-row items-center justify-evenly text-[20px] ">
          <span className="group flex flex-col items-center justify-center hover:cursor-pointer">
            <p>About</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
          <span className="group flex flex-col items-center justify-center hover:cursor-pointer">
            <p>Team</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
          <span className="group flex flex-col items-center justify-center hover:cursor-pointer">
            <p>Pricing</p>{" "}
            <p className="h-[5px] w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full "></p>
          </span>
        </div>
        <div className="flex h-full w-[33%] flex-col items-center justify-center text-[20px]">
          <div className="flex h-[60px] w-[162px] flex-col items-center justify-center border-2 border-theme-200 bg-theme-200 text-center transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-200">
            Login
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
        <div className="flex h-[40%] w-full flex-row items-center justify-center gap-10">
          <h2 className="text-[40px] font-bold">Song Surf</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-10 right-10 text-4xl"
            onClick={handleNav}
          />
        </div>
        <div className="flex h-[60%] w-full flex-col items-center justify-start gap-10 text-[30px] font-semibold">
          <p>About</p>
          <p>Team</p>
          <p>Pricing</p>
          <div
            className={
              nav
                ? `absolute bottom-10 flex h-[60px] w-[162px] flex-col items-center justify-center border-2 border-theme-200 bg-theme-200 text-center transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-200`
                : `hidden`
            }
          >
            Login
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavBar;
