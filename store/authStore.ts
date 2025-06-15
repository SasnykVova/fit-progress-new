import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  userId: string;
  setUserId: (id: string) => void;
  clearUserId: () => void;
  userName: string;
  setUserName: (name: string) => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      userId: "",
      setUserId: (id: string) => set({ userId: id }),
      clearUserId: () => set({ userId: "" }),
      userName: "",
      setUserName: (name: string) => set({ userName: name }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
