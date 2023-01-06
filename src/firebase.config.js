import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB58DNUia7wT_W9oOF-s7l0ZHk7B7SZt8c",
  authDomain: "auth.arinji.ga",
  projectId: "arinji-9a53b",
  storageBucket: "arinji-9a53b.appspot.com",
  messagingSenderId: "992504505004",
  appId: "1:992504505004:web:85f2fdffce31a0dc897509",
  measurementId: "G-ZYHP6JV0DX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
