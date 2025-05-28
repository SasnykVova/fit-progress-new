// stores/useUserStore.ts
import { create } from "zustand";

export interface IUser {
  uid: string;
  email: string;
  name: string;
}

interface UserState {
  user: null | IUser;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  isLoading: boolean;
  isResolved: boolean;
  setLoading: (value: boolean) => void;
  setResolved: (value: boolean) => void;
}

export const authStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  isResolved: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setLoading: (value) => set({ isLoading: value }),
  setResolved: (value) => set({ isResolved: value }),
}));
