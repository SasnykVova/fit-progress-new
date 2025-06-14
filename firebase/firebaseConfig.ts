import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
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

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = firebaseAuth.initializeAuth(firebaseApp, {
  persistence: reactNativePersistence(AsyncStorage),
});
export const firebaseDB = getFirestore(firebaseApp);
