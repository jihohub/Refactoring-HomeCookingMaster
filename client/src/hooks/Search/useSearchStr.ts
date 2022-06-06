import { useQuery } from "react-query";
import axios from "axios";

type ResultStr = {
  result: string;
  message: string;
  data: {
    food_list: Array<string>;
    food: Array<{
      id: number;
      name: string;
      image: string;
      likes: number;
      views: number;
      servings: string;
      difficulty: string;
      cooking_time: string;
      food_id: number;
    }>;
  };
};

async function searchStr(str: string | string[] | undefined): Promise<ResultStr> {
  return await axios
    .get(`/api/main/search/str?data=${str}`)
    .then((response) => response.data);
}

export default function useSearchStr(str: string | string[] | undefined) {
  return useQuery<ResultStr, Error>(["searchstr", str], () =>
    searchStr(str)
  );
}
