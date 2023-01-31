import React, { useState, useEffect, useRef } from "react";
import NavBarLog from "../../components/navbarlog";
import { auth, db } from "../../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Player } from "@lottiefiles/react-lottie-player";

function Account() {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [render, setRender] = useState(false);

  const container = useRef("");
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth && auth.currentUser) {
        const docRef = doc(db, "songsurf", auth.currentUser.uid);
        getDoc(docRef)
          .then((res) => {
            setData(res.data());
            container.current.innerHTML = res.data().pref.pic;
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
    }, 2000);
  }, [loaded]);
  return (
    <React.Fragment>
      <NavBarLog />
      <div
        className={
          loaded
            ? "flex h-screen w-full flex-col items-center justify-end bg-[#090707]"
            : "hidden"
        }
      >
        <div
          className={
            render
              ? "flex h-[85vh] w-full flex-col items-center justify-start gap-5 opacity-100 transition-opacity duration-[1500ms] ease-in-out"
              : "opacity-0 transition-opacity duration-[1500ms] ease-in-out"
          }
        >
          <h1 className="text-[50px] font-bold text-theme-200">Your Account</h1>

          <div
            className="h-[200px] w-[200px] rounded-full bg-theme-100 transition-all duration-300 ease-in-out hover:scale-110"
            ref={container}
          ></div>

          <h3 className="text-[40px] text-white">{data.name}</h3>
          <h3 className="text-[20px] text-white">{data.email}</h3>
          <div className="flex h-full w-full flex-row items-end justify-evenly gap-5 pb-5">
            <p
              className="rounded-lg bg-theme-200 p-2 text-[15px] font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-3 hover:cursor-pointer md:text-[20px]"
              onClick={() => {
                window.location.assign("/edit-account");
              }}
            >
              Change Details
            </p>
            <p className="rounded-lg bg-theme-200 p-2 text-[15px] font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-3 hover:cursor-pointer md:text-[20px]">
              Logout
            </p>
            <p className="rounded-lg bg-theme-200 p-2 text-[15px] font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-3 hover:cursor-pointer md:text-[20px]">
              Delete Account
            </p>
          </div>
        </div>
      </div>
      <div
        className={
          loaded
            ? "hidden"
            : "flex h-fit w-full flex-col items-center justify-center bg-[#090707] md:h-screen"
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
