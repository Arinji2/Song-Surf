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
        const docRef = doc(db, "users", auth.currentUser.uid);
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
            ? "w-full h-screen bg-[#090707] flex flex-col items-center justify-end"
            : "hidden"
        }
      >
        <div
          className={
            render
              ? "w-full h-[85vh] flex flex-col items-center justify-start opacity-100 transition-opacity ease-in-out duration-[1500ms] gap-5"
              : "opacity-0 transition-opacity ease-in-out duration-[1500ms]"
          }
        >
          <h1 className="text-[50px] font-bold text-theme-200">Your Account</h1>

          <div
            className="w-[200px] h-[200px] bg-theme-100 rounded-full hover:scale-110 transition-all ease-in-out duration-300"
            ref={container}
          ></div>

          <h3 className="text-white text-[40px]">{data.name}</h3>
          <h3 className="text-white text-[20px]">{data.email}</h3>
          <div className="flex flex-row items-end justify-evenly gap-5 w-full h-full pb-5">
            <p
              className="p-2 rounded-lg bg-theme-200 text-white text-[15px] md:text-[20px] font-bold hover:-translate-y-3 transition-all ease-in-out duration-300 hover:cursor-pointer"
              onClick={() => {
                window.location.assign("/edit-account");
              }}
            >
              Change Details
            </p>
            <p className="p-2 rounded-lg bg-theme-200 text-white text-[15px] md:text-[20px] font-bold hover:-translate-y-3 transition-all ease-in-out duration-300 hover:cursor-pointer">
              Logout
            </p>
            <p className="p-2 rounded-lg bg-theme-200 text-white text-[15px] md:text-[20px] font-bold hover:-translate-y-3 transition-all ease-in-out duration-300 hover:cursor-pointer">
              Delete Account
            </p>
          </div>
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
