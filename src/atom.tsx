import { atom } from "recoil";

export const isDarkState = atom({
  key: "DarkMode",
  default: false,
});

export interface Todo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: Todo[];
}

export const todoState = atom<ITodoState>({
  key: "todoState",
  default: {
    todos: [],
    doing: [],
    done: [],
  },
});
