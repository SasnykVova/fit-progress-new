import { firebaseAuth } from "@/firebase/firebaseConfig";
import { authStore } from "@/store/authStore";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const useAuthListener = () => {
  const setUser = authStore((state) => state.setUser);
  const clearUser = authStore((state) => state.clearUser);
  const setLoading = authStore((state) => state.setLoading);
  const setResolved = authStore((state) => state.setResolved);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || "",
          name: user.displayName || "",
        });
      } else {
        clearUser();
      }
      setResolved(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setLoading, setResolved]);
};
