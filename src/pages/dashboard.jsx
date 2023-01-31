import React, { useState, useEffect, useRef } from "react";

import { auth, db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NavBarLog from "../components/navbarlog";

import Account from "../assets/account.jpg";
import Upload from "../assets/upload.jpg";
import Songs from "../assets/songs.jpg";

import { Player } from "@lottiefiles/react-lottie-player";

function Dashboard() {
  const [document, setDocument] = useState(null);
  const [ready, setReady] = useState(false);
  const [id, setId] = useState("");
  const container = useRef(null);
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth) {
        const docRef = doc(db, "songsurf", auth.currentUser.uid);
        getDoc(docRef)
          .then((res) => {
            setDocument(res.data());
            if (res.data().pref.pic == null) window.location.assign("/finish");
            setReady(true);
          })
          .catch((er) => {
            console.log(er);
            console.log(auth.currentUser);
          });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <NavBarLog />
      <div className="h-fit w-full bg-[#090707] md:h-screen">
        <div
          className={
            ready
              ? "flex h-full w-full flex-col items-center justify-center gap-5 opacity-100 transition-all duration-1000 ease-in-out"
              : "flex h-full w-full flex-col items-center justify-end gap-5 opacity-0 transition-all duration-1000 ease-in-out md:justify-center"
          }
        >
          <p className="mt-20 text-[30px] font-bold text-white md:mt-0 md:text-[40px]">
            Welcome back{" "}
            <span className="text-theme-200">{ready ? document.name : ""}</span>
          </p>
          <div className="relative mb-20 mt-20 flex w-screen flex-col items-center justify-center gap-y-5 md:top-10 md:mb-0 md:mt-0 md:flex-row md:justify-evenly">
            <Card
              img={Account}
              head="Account"
              disc="Access your Account"
              link="account"
            />
            <Card
              img={Upload}
              head="Upload"
              disc="Upload Songs"
              link="upload"
            />
            <Card img={Songs} head="Songs" disc="Play your Songs" link="play" />
          </div>
        </div>
      </div>
      <div
        className={
          ready
            ? "hidden"
            : "absolute top-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-black"
        }
      >
        <Player
          src={"./loading.json"}
          autoplay={true}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    </React.Fragment>
  );
}

function Card({ img, head, disc, link }) {
  return (
    <div
      className="group relative flex h-[400px] w-[250px] scale-100 flex-col items-center justify-center overflow-hidden rounded-lg bg-theme-100 text-center shadow-xl shadow-black transition-all duration-300 ease-in-out hover:cursor-pointer md:hover:scale-110"
      onClick={() => {
        window.location.assign(`/${link}`);
      }}
    >
      <img
        src={img}
        alt={"image"}
        className="absolute z-0 h-full w-full rounded-lg object-cover  transition-all duration-500 ease-in-out group-hover:scale-[1.5]"
      />
      <div className="absolute z-10 h-full w-full rounded-lg  bg-[#262525] opacity-60 transition-all duration-300 ease-in-out"></div>
      <h2 className="z-20 text-[30px] font-bold text-white transition-all duration-300 ease-in-out md:text-[40px]">
        {head}
      </h2>
      <p className="absolute bottom-10 z-20 text-[20px] font-semibold text-theme-200 ">
        {disc}
      </p>
    </div>
  );
}
export default Dashboard;
