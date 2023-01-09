import React, { useState, useEffect, useRef } from "react";
import NavBarLog from "../components/navbarlog";
import { auth, db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Player } from "@lottiefiles/react-lottie-player";

function Account() {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [render, setRender] = useState(false);

  const container = useRef("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth && auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        getDoc(docRef)
          .then((res) => {
            setData(res.data());

            setTimeout(() => {
              setLoaded(true);
            }, 1000);
          })
          .catch(() => {
            window.location.assign("/dashboard");
          });
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1500);
  }, [loaded]);
  return (
    <React.Fragment>
      <NavBarLog />
      <div
        className={
          loaded
            ? "w-full h-fit md:h-screen bg-[#090707] flex flex-col items-center justify-end"
            : "hidden"
        }
      >
        <div
          className={
            render
              ? "w-full h-[85vh] flex flex-col items-center justify-start opacity-100 transition-opacity ease-in-out duration-1000 "
              : "opacity-0 transition-opacity ease-in-out duration-1000"
          }
        >
          <h1 className="text-[50px] font-bold text-theme-200">Account</h1>
          <p ref={container}></p>
        </div>
      </div>
      <div
        className={
          loaded
            ? "hidden"
            : "w-full h-fit md:h-screen bg-[#090707] flex flex-col items-center justify-center"
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

export default Account;
