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
        const docRef = doc(db, "songsurf", auth.currentUser.uid);
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
      <div className="flex h-screen w-full flex-col items-center justify-end bg-[#090707]">
        <div
          className={
            ready
              ? "flex h-[85vh] w-full flex-col items-center justify-center opacity-100 transition-opacity duration-[1500ms] ease-in-out"
              : "opacity-0 transition-opacity duration-[1500ms] ease-in-out"
          }
        >
          <h1 className="text-[50px] font-bold text-theme-200">
            Delete your Account
          </h1>
          <div className="mt-10 flex w-screen flex-col items-center justify-center gap-10 text-center">
            <h2 className="text-[30px] font-semibold text-white">
              Enter your Email As Shown Here to Confirm
            </h2>
            <p className="text-[30px] text-theme-200">
              {ready ? auth.currentUser.email : ""}
            </p>
            <input
              type="email"
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              className="mt-10 h-[22px] w-[50%] rounded-lg p-4 text-[20px] font-bold outline-none"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <p
              className="rounded-lg bg-red-600 p-2 text-[20px] font-bold text-white hover:cursor-pointer"
              onClick={deleteAcct}
            >
              Delete Account
            </p>
          </div>
        </div>
        <div
          className={
            deleteFlg
              ? "fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center bg-red-400"
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
