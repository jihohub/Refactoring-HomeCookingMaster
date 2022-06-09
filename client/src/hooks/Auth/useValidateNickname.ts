import { useQuery } from "react-query";
import axios from "axios";

type valNickname = {
  is_valid: boolean;
  message: string;
};

function validateNickname(nickname: string): Promise<valNickname> {
  return axios
    .post("/api/auth/signup/val_nickname", nickname, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}

export default function useValidateNickname(nickname: string) {
  return useQuery<valNickname, Error>("valnickname", () =>
    validateNickname(nickname)
  );
}
