import { atom } from "recoil";

export const isDarkState = atom({
  key: "DarkMode",
  default: false,
});

interface ITodoState {
  [key: string]: string[];
}

export const todoState = atom<ITodoState>({
  key: "todoState",
  default: {
    todos: ["a", "b", "c"],
    doing: ["d", "e", "f"],
    done: ["g"],
  },
});
