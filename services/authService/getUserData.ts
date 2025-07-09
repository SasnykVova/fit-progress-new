import { firebaseDB } from "@/firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

const getUserDataById = async (uid: string) => {
  try {
    const userDocRef = doc(firebaseDB, "users", uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const useGetUserDataById = (uid: string) => {
  return useQuery({
    queryKey: ["getUserDataById"],
    queryFn: () => getUserDataById(uid),
  });
};
