import { useQuery, useMutation } from "react-query";
import axios from "axios";

type LoggedIn = {
  result: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user_id: number;
    nickname: string;
    img: string;
  };
};

async function login(auth: {email: string, password: string}): Promise<LoggedIn> {
  return await axios
    .post("/api/auth/login", auth, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}

// export default function useLogin(auth: {email: string, password: string}) {
//   return useQuery<LoggedIn, Error>(["login", auth.email], () => login(auth));
// }

export default function useLogin() {
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  })

  return mutation;
}
