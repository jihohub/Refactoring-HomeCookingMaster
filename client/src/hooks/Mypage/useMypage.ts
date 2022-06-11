import { useQuery } from "react-query";
import axios from "axios";

type Ranking = {
  result: string;
  message: string;
  data: Array<{
    id: number;
    name: string;
    likes: number;
    views: number;
    img: string;
    servings: string;
    difficulty: string;
    cooking_time: string;
    food_id: number;
  }>;
};

async function getMypage(access_token: string | null): Promise<any> {
  return await axios.get("/api/mypage", {
      headers: {
        "Authorization": `Bearer ${access_token}`,
      },
    })
    .then((response) => response.data);
}

export default function useGetMypage(access_token: string | null) {
  return useQuery<any, Error>("mypage", () => getMypage(access_token));
}
