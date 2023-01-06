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
        className={`w-full h-[120px] bg-${
          scroll > 60 ? "[#262525]" : "transparent"
        } fixed top-0 transition-all ease-in-out duration-300 md:flex hidden flex-row items-center justify-between text-white font-bold z-50 `}
      >
        <div className="w-[33%] h-full text-center  flex flex-col items-center justify-center text-[30px] ">
          SONG SURF
        </div>
        <div className="w-[33%] h-full flex flex-row items-center justify-evenly text-[20px] ">
          <span className="flex flex-col items-center justify-center group hover:cursor-pointer">
            <p>About</p>{" "}
            <p className="w-0 group-hover:w-full h-[5px] bg-white transition-all ease-in-out duration-500 "></p>
          </span>
          <span className="flex flex-col items-center justify-center group hover:cursor-pointer">
            <p>Team</p>{" "}
            <p className="w-0 group-hover:w-full h-[5px] bg-white transition-all ease-in-out duration-500 "></p>
          </span>
          <span className="flex flex-col items-center justify-center group hover:cursor-pointer">
            <p>Pricing</p>{" "}
            <p className="w-0 group-hover:w-full h-[5px] bg-white transition-all ease-in-out duration-500 "></p>
          </span>
        </div>
        <div className="w-[33%] h-full flex flex-col items-center justify-center text-[20px]">
          <div className="w-[162px] h-[60px] bg-theme-200 text-center flex flex-col items-center justify-center hover:cursor-pointer hover:text-theme-200 hover:bg-white border-2 border-theme-200 transition-all ease-in-out duration-300">
            Login
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
        <div className="w-full h-[60%] flex flex-col items-center justify-start gap-10 text-[30px] font-semibold">
          <p>About</p>
          <p>Team</p>
          <p>Pricing</p>
          <div
            className={
              nav
                ? `w-[162px] h-[60px] bg-theme-200 text-center flex flex-col items-center justify-center hover:cursor-pointer hover:text-theme-200 hover:bg-white border-2 border-theme-200 transition-all ease-in-out duration-300 absolute bottom-10`
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
