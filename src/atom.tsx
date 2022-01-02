import { atom } from "recoil";

export const isDarkState = atom({
  key: "DarkMode",
  default: false,
});
