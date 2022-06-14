import { atom } from "recoil";

export const searchedImage = atom<File | null>({
  key: "searchedImage",
  default: null,
});
