import { atom } from "recoil";

export const register = atom({
  key: "register",
  default: {
    "user_id": -1,
    "nickname": "",
  },
});
