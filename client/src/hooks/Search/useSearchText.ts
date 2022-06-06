import { useQuery } from "react-query";
import axios from "axios";

type ResultText = {
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

async function searchText(text: string | string[] | undefined): Promise<ResultText> {
  return await axios
    .get(`/api/main/search/str?data=${text}`)
    .then((response) => response.data);
}

export default function useSearchText(text: string | string[] | undefined) {
  return useQuery<ResultText, Error>(["searchtext", text], () =>
    searchText(text)
  );
}
