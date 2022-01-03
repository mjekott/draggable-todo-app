import { atom } from "recoil";

export const isDarkState = atom({
  key: "DarkMode",
  default: false,
});

export const todoState = atom({
  key: "todoState",
  default: ["a", "b", "c", "d", "e", "f"],
});
