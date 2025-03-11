import { create } from "zustand";

const useStore = create((set) => ({
  authMode: "login",
  toggleAuth: (mode) => set({ authMode: mode }), 
}));

export default useStore;
