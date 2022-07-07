import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loginInfo } from "../../atom/loginInfo";

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
    .post("/api/proxy/login", auth, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => response.data);
}

export default function useLogin() {
  const router = useRouter();
  const setLoginInfo = useSetRecoilState(loginInfo);
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      setLoginInfo(data?.data);
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  })

  return mutation;
}
