import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { registerInfo } from "../../atom/registerInfo";


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
  const router = useRouter();
  const setRegisterInfo = useSetRecoilState(registerInfo);
  const mutation = useMutation(signup, {
    onSuccess: (data) => {
      setRegisterInfo(data?.data);
      router.push("/complete");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
