import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuaVdp87OVQAbYAqiIsOqAmnasLSRIPYY",
  authDomain: "fit-progress-back-end.firebaseapp.com",
  projectId: "fit-progress-back-end",
  storageBucket: "fit-progress-back-end.firebasestorage.app",
  messagingSenderId: "597929735742",
  appId: "1:597929735742:web:1422978f6193cdc552036f",
  measurementId: "G-SC1SYP4HX6",
};

const app = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
export const db = getFirestore(app);

export { firebaseAuth };
