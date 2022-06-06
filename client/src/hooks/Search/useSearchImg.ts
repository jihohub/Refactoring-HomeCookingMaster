import { useQuery } from "react-query";
import axios from "axios";

type ReslutImg = {
  result: string;
  message: string;
  data: {
    food_list: Array<string>;
    equal_rate: Array<{
      name: string;
      rate: number;
    }>;
    food_0: Array<{
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
    food_1: Array<{
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
    food_2: Array<{
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

async function searchImg(formData: FormData | undefined): Promise<ReslutImg> {
  return await axios
    .post("/api/main/search/img", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export default function useSearchImg(formData: FormData | undefined) {
  return useQuery<ReslutImg, Error>(["searchimg", formData], () =>
    searchImg(formData)
  );
}
