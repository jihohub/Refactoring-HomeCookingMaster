import { useQuery } from "react-query";
import axios from "axios";

type resultText = {
  respond: {
    result: string;
    message: string;
    data: {
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
};

function searchText(): Promise<resultText> {
  return axios.post("/api/main/search/str").then((response) => response.data);
}

function useSearchText() {
  return useQuery<resultText, Error>("recipeLike", searchText);
}
