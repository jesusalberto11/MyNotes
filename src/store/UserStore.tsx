import { create } from "zustand";

interface IUserStoreState {
  accessToken: string | null;

  refreshToken: string | null;

  setTokens: (acToken: string, rfToken: string) => void;

  isLoggedIn: boolean | null;

  logOut: () => void;
}

export const userUserStore = create<IUserStoreState>()((set) => ({
  accessToken: null,
  refreshToken: null,

  isLoggedIn: null,

  setTokens(acToken: string, rfToken: string) {
    set({ accessToken: acToken, refreshToken: rfToken, isLoggedIn: true });
  },

  logOut() {
    set({ accessToken: null, refreshToken: null, isLoggedIn: false });
  },
}));
