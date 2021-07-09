import { atom } from "recoil";

export const userAtom = atom<number>({ key: "user", default: 1 });
