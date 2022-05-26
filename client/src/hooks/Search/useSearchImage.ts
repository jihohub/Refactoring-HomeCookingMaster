import { useQuery } from "react-query";
import axios from "axios";

type reslutImage = {
  respond: {
    result: string;
    message: string;
    data: {
      equal_rate: Array<{
        name: string;
        rate: number;
      }>;
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

function searchImage(): Promise<reslutImage> {
  return axios.post("/api/main/search/img").then((response) => response.data);
}

function useSearchImage() {
  return useQuery<reslutImage, Error>("recipe", searchImage);
}
