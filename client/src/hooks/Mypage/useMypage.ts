import { useQuery } from "react-query";
import axios from "axios";

type TMypage = {
  result: string;
  message: string;
  data: {
    user_info: {
      email: string;
      exp: string;
      img: string;
      intro: null;
      nickname: string;
    };
    liked_recipe: Array<{
      recipe_id: number;
      recipe_img: string;
      recipe_name: string;
    }>;
    my_post: Array<{
      recipe_id: number;
      recipe_img: string;
      recipe_name: string;
    }>;
  };
};

async function getMypage(access_token: string | null): Promise<TMypage> {
  return await axios
    .get("/api/mypage", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => response.data);
}

export default function useGetMypage(access_token: string | null) {
  return useQuery<TMypage, Error>("mypage", () => getMypage(access_token));
}
