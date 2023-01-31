import React, { useEffect } from "react";
import HeroPic from "../assets/hero.jpg";
import AwesomePic from "../assets/awesome.jpg";
import NavBar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faFileAudio,
  faMusic,
  faPenSquare,
  faFastForward,
  faUserShield,
  faWifi,
} from "@fortawesome/fontawesome-free-solid";

function Landing() {
  return (
    <React.Fragment>
      <NavBar />
      <Hero />
      <Process />
      <Awesome />
      <Features />
    </React.Fragment>
  );
}

function Hero() {
  return (
    <div className="relative h-screen w-full">
      <img
        src={HeroPic}
        alt="Hero Picture"
        className="absolute -z-20 h-screen w-full object-cover"
      ></img>
      <div className="absolute -z-10 h-screen w-full bg-[#262525] opacity-50"></div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <h1 className="text-center text-[60px]  font-bold text-theme-200 md:text-[110px]">
          SONG SURF
        </h1>
        <p className="text-[15px] text-white md:text-[20px]">
          Music Playing Redesigned
        </p>
        <p className="mt-20 border-theme-200 bg-theme-200 pt-2 pb-2 pl-14 pr-14 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-200 md:text-[20px]">
          Start Listening
        </p>
      </div>
    </div>
  );
}

function Process() {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-5 bg-[#090707] text-white md:h-screen">
      <h1 className="mb-5 text-[40px] font-bold">The Process</h1>
      <div className="mt-14 mb-10 flex w-full flex-col items-center justify-evenly gap-y-20 md:flex-row">
        <Card
          num="1"
          icon={faYoutube}
          head="Youtube"
          desc="The user sends us the Youtube link of a song."
        />
        <Card
          num="2"
          icon={faFileAudio}
          head="Convert"
          desc="We convert the link to mp3 and save it."
        />
        <Card
          num="3"
          icon={faMusic}
          head="Play"
          desc="Login to your account and play all your songs."
        />
      </div>
    </div>
  );

  function Card({ num, icon, head, desc }) {
    return (
      <div className="relative flex h-[280px] w-[190px] flex-col items-center justify-center gap-5 rounded-[20px] bg-theme-100 text-center">
        <div className="absolute -top-10 flex h-[72px] w-[75px] flex-col items-center justify-center rounded-full bg-theme-50">
          <p className="text-4xl text-white">{num}</p>
        </div>
        <FontAwesomeIcon icon={icon} className="text-5xl" />
        <h2 className="text-[30px] font-bold text-theme-200">{head}</h2>
        <p className="text-[17px]">{desc}</p>
      </div>
    );
  }
}

function Awesome() {
  return (
    <div className="h-screen w-full">
      <img
        src={AwesomePic}
        alt="Party Pic"
        className="absolute -z-20 h-full w-full object-cover"
      />
      <div className="absolute -z-10 h-screen w-full bg-[#262525] opacity-50"></div>
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-start text-white">
        <h2 className="mt-10 bg-theme-200 p-4 text-center text-[40px] font-bold">
          Why Are We So <br /> Awesome
        </h2>
        <div className="absolute bottom-0 flex w-full flex-col items-center  text-center text-[40px] font-bold md:bottom-28 md:flex-row md:justify-evenly md:text-[50px]">
          <p className="mb-5 border-b-4 border-white md:mb-0 md:border-b-0 md:border-transparent">
            Free <br /> Forever
          </p>
          <p className="mb-5 border-b-4 border-white md:mb-0 md:border-b-0 md:border-transparent">
            Secure
          </p>
          <p className="mb-5 border-b-4 border-white md:mb-0 md:border-b-0 md:border-transparent">
            Fast <br /> Process
          </p>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center bg-[#090707] text-white md:h-screen">
      <h1 className="mb-5 mt-10 text-[50px] font-bold">Features</h1>
      <div className="mb-10 flex w-full flex-col items-center justify-evenly gap-10 md:flex-row">
        <Card icon={faPenSquare} head="Modern Design" />
        <Card icon={faFastForward} head="Fast Conversions" />
        <Card icon={faUserShield} head="Stored Securely" />
        <Card icon={faWifi} head="Always Online" />
      </div>
    </div>
  );

  function Card({ icon, head }) {
    return (
      <div className="relative flex h-[350px] w-[190px] flex-col items-center justify-center gap-10 rounded-[20px] bg-theme-100 text-center">
        <h1 className="text-[30px] font-bold text-theme-200">{head}</h1>
        <FontAwesomeIcon icon={icon} className="text-5xl text-white" />
      </div>
    );
  }
}

export default Landing;
