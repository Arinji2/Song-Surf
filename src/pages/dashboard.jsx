import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NavBarLog from "../components/navbarlog";
import icon from "../assets/default.svg";

function Dashboard() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "users", id);
    getDoc(docRef)
      .then((res) => {
        setDocument(res.data());
        if (res.data().pref.pic == null) window.location.assign("/finish");
      })
      .catch((er) => {
        console.log(er);
        console.log(auth.currentUser);
      });
  }, [id]);

  onAuthStateChanged(auth, () => {
    if (auth.currentUser.uid != id) window.location.assign("/login");
  });

  if (!document) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <NavBarLog icon={icon} />
      <div className="w-full h-screen bg-black"></div>
    </React.Fragment>
  );
}

export default Dashboard;
