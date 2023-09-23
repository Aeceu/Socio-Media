import { create } from "zustand";
import { persist } from "zustand/middleware";

type Props = {
  tokenID: string | null;
  setToken: (id: string | null) => void;
};

const AuthStore = create<Props>()(
  persist(
    (set) => ({
      tokenID: null,
      setToken: (id: string | null) => {
        set({ tokenID: id });
      },
    }),
    {
      name: "auth",
    }
  )
);

export default AuthStore;
