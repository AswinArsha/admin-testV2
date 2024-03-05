// ../firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBJoNAI78nUXcWDBi7tDr92JMmnLGqkUgY",
    authDomain: "admin-9806e.firebaseapp.com",
    projectId: "admin-9806e",
    storageBucket: "admin-9806e.appspot.com",
    messagingSenderId: "214409287618",
    appId: "1:214409287618:web:efd077d3ad427fbfab685b",
    measurementId: "G-QQ1S0096VG"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);