import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      

      // Set logged in user
      setUser: (userData) =>
        set({
          user: userData,
        }),

      // Clear auth state
      logout: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
