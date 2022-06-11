import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

type TEditimage = {
  result: string;
  message: string;
  data: {
    img: string;
  };
};

interface editimgParameters {
  formData: FormData;
  access_token: string | null;
}

async function editImg({ formData, access_token }: editimgParameters): Promise<TEditimage> {
  return await axios
    .post("/api/mypage/editimg", formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => response.data);
}

export default function useEditImg() {
  const queryClient = useQueryClient();
  const mutation = useMutation(editImg, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("mypage");
    },
  });

  return mutation;
}
