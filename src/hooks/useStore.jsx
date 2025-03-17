import { create } from "zustand";

const useStore = create((set) => {
  const storedAuthMode = localStorage.getItem("authMode") || "login";

  return {
    authMode: storedAuthMode,
    toggleAuth: (mode) => {
      localStorage.setItem("authMode", mode);
      set({ authMode: mode });
    },
  };
});

export default useStore;

