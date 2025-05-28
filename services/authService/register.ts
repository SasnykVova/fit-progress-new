// import { db, firebaseAuth } from "@/firebase/firebaseConfig";
// import { useMutation } from "@tanstack/react-query";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// const signUp = async (email: string, password: string, name: string) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       firebaseAuth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     await setDoc(doc(db, "users", user.uid), {
//       name,
//       email,
//       exercises: [],
//     });
//     console.log("Registration successful");
//   } catch (error) {
//     const err = error as Error;
//     console.error("Registration error:", err);
//     alert(err.message);
//     throw err;
//   }
// };

// export const useSignUp = () => {
//   return useMutation({
//     mutationFn: ({
//       email,
//       password,
//       name,
//     }: {
//       email: string;
//       password: string;
//       name: string;
//     }) => signUp(email, password, name),
//   });
// };
