import { useQuery } from "react-query";
import axios from "axios";

type ResultImg = {
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

async function searchImg(formData: FormData | undefined, random_path: string | string[] | undefined): Promise<ResultImg> {
  return await axios
    .post("/api/main/search/img", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export default function useSearchImg(formData: FormData | undefined, random_path: string | string[] | undefined) {
  return useQuery<ResultImg, Error>(["searchimg", formData, random_path], () =>
    searchImg(formData, random_path)
  );
}
