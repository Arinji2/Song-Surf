import React, { useState, useEffect, useRef } from "react";

import { auth, db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NavBarLog from "../components/navbarlog";
import icon from "../assets/default.svg";
import Account from "../assets/account.jpg";
import Upload from "../assets/upload.jpg";
import Songs from "../assets/songs.jpg";
import Lottie from "lottie-web";
import { Player } from "@lottiefiles/react-lottie-player";

function Dashboard() {
  const [document, setDocument] = useState(null);
  const [ready, setReady] = useState(false);
  const [id, setId] = useState("");
  const container = useRef(null);

  onAuthStateChanged(auth, () => {
    if (auth) {
      const docRef = doc(db, "users", auth.currentUser.uid);
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

  return (
    <React.Fragment>
      <NavBarLog icon={icon} />
      <div className="w-full h-screen bg-[#090707]">
        <div
          className={
            ready
              ? "w-full h-full opacity-100 transition-all ease-in-out duration-1000 flex flex-col items-center justify-center gap-5"
              : "w-full h-full opacity-0 transition-all ease-in-out duration-1000 flex flex-col items-center justify-center gap-5"
          }
        >
          <p className="text-[30px] md:text-[40px] text-white font-bold">
            Welcome back{" "}
            <span className="text-theme-200">{ready ? document.name : ""}</span>
          </p>
          <div className="w-screen flex flex-row items-center justify-evenly relative top-10">
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
            : "w-full h-screen bg-black z-20 absolute top-0 flex flex-col items-center justify-center"
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
      className="h-[400px] w-[250px] bg-theme-100 rounded-lg relative flex flex-col items-center justify-center group overflow-hidden md:hover:scale-110 shadow-xl shadow-black transition-all ease-in-out duration-300 hover:cursor-pointer scale-[.85] md:scale-100 text-center"
      onClick={() => {
        window.location.assign(`/${link}`);
      }}
    >
      <img
        src={img}
        alt={"image"}
        className="object-cover rounded-lg h-full w-full z-0 absolute  md:group-hover:scale-[1.5] transition-all ease-in-out duration-500"
      />
      <div className="h-full w-full z-10 bg-[#262525] opacity-60  transition-all ease-in-out duration-300 absolute rounded-lg"></div>
      <h2 className="text-white text-[30px] md:text-[40px] transition-all ease-in-out duration-300 font-bold z-20 scale-[.85] md:scale-100">
        {head}
      </h2>
      <p className="text-theme-200 absolute bottom-10 text-[20px] z-20 font-semibold scale-[.85] md:scale-100">
        {disc}
      </p>
    </div>
  );
}
export default Dashboard;
