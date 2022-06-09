import { useQuery, useMutation } from "react-query";
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

export default function useValidateNickname() {
  const mutation = useMutation(validateNickname, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
