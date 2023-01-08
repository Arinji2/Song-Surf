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
    <div className="w-full h-screen relative">
      <img
        src={HeroPic}
        alt="Hero Picture"
        className="w-full h-screen object-cover -z-20 absolute"
      ></img>
      <div className="w-full h-screen -z-10 absolute opacity-50 bg-[#262525]"></div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <h1 className="text-[60px] md:text-[110px]  font-bold text-theme-200 text-center">
          SONG SURF
        </h1>
        <p className="text-[15px] md:text-[20px] text-white">
          Music Playing Redesigned
        </p>
        <p className="mt-20 text-white text-[15px] md:text-[20px] pt-2 pb-2 pl-14 pr-14 bg-theme-200 border-theme-200 hover:bg-white hover:text-theme-200 transition-all ease-in-out duration-300 hover:cursor-pointer">
          Start Listening
        </p>
      </div>
    </div>
  );
}

function Process() {
  return (
    <div className="w-full h-fit md:h-screen bg-[#090707] flex flex-col items-center justify-center gap-5 text-white">
      <h1 className="text-[40px] font-bold mb-5">The Process</h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-evenly mt-14 gap-y-20 mb-10">
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
      <div className="h-[280px] w-[190px] bg-theme-100 rounded-[20px] flex flex-col items-center justify-center relative gap-5 text-center">
        <div className="w-[75px] h-[72px] rounded-full bg-theme-50 absolute -top-10 flex flex-col items-center justify-center">
          <p className="text-white text-4xl">{num}</p>
        </div>
        <FontAwesomeIcon icon={icon} className="text-5xl" />
        <h2 className="text-theme-200 font-bold text-[30px]">{head}</h2>
        <p className="text-[17px]">{desc}</p>
      </div>
    );
  }
}

function Awesome() {
  return (
    <div className="w-full h-screen">
      <img
        src={AwesomePic}
        alt="Party Pic"
        className="absolute w-full h-full object-cover -z-20"
      />
      <div className="w-full h-screen -z-10 absolute opacity-50 bg-[#262525]"></div>
      <div className="w-full h-screen relative z-10 flex flex-col items-center justify-start text-white">
        <h2 className="p-4 bg-theme-200 font-bold text-[40px] text-center mt-10">
          Why Are We So <br /> Awesome
        </h2>
        <div className="w-full flex flex-col md:flex-row items-center md:justify-evenly  text-[40px] md:text-[50px] font-bold absolute bottom-0 md:bottom-28 text-center">
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
    <div className="h-fit md:h-screen w-full relative bg-[#090707] flex flex-col items-center justify-center text-white">
      <h1 className="text-[50px] font-bold mb-5 mt-10">Features</h1>
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full mb-10 gap-10">
        <Card icon={faPenSquare} head="Modern Design" />
        <Card icon={faFastForward} head="Fast Conversions" />
        <Card icon={faUserShield} head="Stored Securely" />
        <Card icon={faWifi} head="Always Online" />
      </div>
    </div>
  );

  function Card({ icon, head }) {
    return (
      <div className="h-[350px] w-[190px] bg-theme-100 rounded-[20px] flex flex-col items-center justify-center relative gap-10 text-center">
        <h1 className="text-[30px] font-bold text-theme-200">{head}</h1>
        <FontAwesomeIcon icon={icon} className="text-white text-5xl" />
      </div>
    );
  }
}

export default Landing;
