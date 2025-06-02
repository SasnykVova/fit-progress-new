import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuaVdp87OVQAbYAqiIsOqAmnasLSRIPYY",
  authDomain: "fit-progress-back-end.firebaseapp.com",
  projectId: "fit-progress-back-end",
  storageBucket: "fit-progress-back-end.firebasestorage.app",
  messagingSenderId: "597929735742",
  appId: "1:597929735742:web:1422978f6193cdc552036f",
  measurementId: "G-SC1SYP4HX6",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore();
