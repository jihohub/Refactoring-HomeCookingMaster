import { atom } from "recoil";

export interface ILoginInfoTypes {
  access_token: string | null;
  refresh_token: string | null;
  user_id: number | null;
  nickname: string | null;
  img: string | null;
}

export const loginInfo = atom<ILoginInfoTypes>({
  key: "login",
  default: {
    "access_token": null,
    "refresh_token": null,
    "user_id": null,
    "nickname": null,
    "img": null,
  },
});
