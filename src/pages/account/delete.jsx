import { deleteUser, onAuthStateChanged } from "firebase/auth";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { ref, listAll } from "firebase/storage";
import Lottie from "lottie-web";
import React, { useState, useEffect, useRef } from "react";
import NavBarLog from "../../components/navbarlog";
import { auth, db, storage } from "../../firebase.config";
function DeleteAccount() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [deleteFlg, setDeleteFlg] = useState(false);
  useEffect(() => {
    if (deleteFlg) {
      const newAnimation = Lottie.loadAnimation({
        container: document.getElementById("delete-container"),
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "./delete.json",
        heigh: 200,
        width: 200,
      });
      newAnimation.setSpeed(0.9);
      newAnimation.addEventListener("complete", () => {
        window.location.assign("/");
      });
    }
  }, [deleteFlg]);
  const deleteAcct = () => {
    deleteUser(auth.currentUser)
      .catch((er) => {
        if (er.code === "auth/requires-recent-login") {
          alert(
            "Please login and Come back to this Page, Redirecting in 2 seconds"
          );
          setTimeout(() => {
            window.location.assign("/login");
          }, 2000);
        }
      })
      .then(() => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        deleteDoc(docRef).then(() => {
          const docRef = doc(db, "deletions", auth.currentUser.email);
          setDoc(docRef, {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
          }).then(() => {
            setDeleteFlg(true);
          });
        });
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setReady(true);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <NavBarLog />
      <div className="w-full h-screen flex flex-col items-center justify-end bg-[#090707]">
        <div
          className={
            ready
              ? "w-full h-[85vh] flex flex-col items-center justify-center opacity-100 transition-opacity ease-in-out duration-[1500ms]"
              : "opacity-0 transition-opacity ease-in-out duration-[1500ms]"
          }
        >
          <h1 className="text-[50px] text-theme-200 font-bold">
            Delete your Account
          </h1>
          <div className="flex flex-col items-center justify-center w-screen text-center gap-10 mt-10">
            <h2 className="text-[30px] text-white font-semibold">
              Enter your Email As Shown Here to Confirm
            </h2>
            <p className="text-theme-200 text-[30px]">
              {ready ? auth.currentUser.email : ""}
            </p>
            <input
              type="email"
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              className="rounded-lg h-[22px] w-[50%] text-[20px] p-4 outline-none font-bold mt-10"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <p
              className="p-2 rounded-lg bg-red-600 text-white text-[20px] font-bold hover:cursor-pointer"
              onClick={deleteAcct}
            >
              Delete Account
            </p>
          </div>
        </div>
        <div
          className={
            deleteFlg
              ? "w-full h-screen fixed top-0 left-0 bg-red-400 flex flex-col items-center justify-center"
              : "hidden"
          }
        >
          <div id="animation-container"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DeleteAccount;
