import { burgerSlice, type IBurgerSlice } from "@/features/burger/model/burgerSlice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AppStateWebStore = IBurgerSlice;

export const useWebStore = create<AppStateWebStore>()(
  devtools(
    (set, get, api) => ({
      ...burgerSlice(set, get, api),
    })
  )
)