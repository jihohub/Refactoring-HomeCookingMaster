import { useQuery, useMutation } from "react-query";
import axios from "axios";

type SignedUp = {
  result: string;
  message: string;
  data: {
    user_id: number;
    nickname: string;
  }
};

function signup(formData: FormData | undefined): Promise<SignedUp> {
  return axios
    .post("/api/auth/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export default function useSignup() {
  const mutation = useMutation(signup, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
