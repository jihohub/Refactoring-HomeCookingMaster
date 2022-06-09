import { useMutation } from "react-query";
import axios from "axios";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { loginInfo } from "../../atom/loginInfo";

type LoggedOut = {
  result: string;
  message: string;
};

async function logout(): Promise<LoggedOut> {
  const loggedin = useRecoilValue(loginInfo);
  
  return await axios
    .delete("/api/auth/logout", {
      headers: {
        Authorization: `Bearer ${loggedin.access_token}`,
      },
    })
    .then((response) => response.data);
}

export default function useLogout() {
  const resetLoggedin = useResetRecoilState(loginInfo);

  const mutation = useMutation(logout, {
    onSuccess: (data) => {
      resetLoggedin();
    },
  });

  return mutation;
}
