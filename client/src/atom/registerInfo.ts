import { atom } from "recoil";

export interface IRegisterInfoTypes {
  user_id: number | null;
  nickname: string | null;
}

export const registerInfo = atom<IRegisterInfoTypes>({
  key: "register",
  default: {
    "user_id": null,
    "nickname": null,
  },
});
