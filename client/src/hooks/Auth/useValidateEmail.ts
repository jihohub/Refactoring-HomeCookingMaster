import { useQuery, useMutation } from "react-query";
import axios from "axios";

type valEmail = {
  is_valid: boolean;
  message: string;
};

function validateEmail(email: string): Promise<valEmail> {
  return axios
    .post("/api/auth/signup/val_email", { email }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}

export default function useValidateEmail() {
  const mutation = useMutation(validateEmail, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
