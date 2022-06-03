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

function searchImage(imagefile: FormData): Promise<reslutImage> {
  return axios
    .post("/api/main/search/img", imagefile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export default function useSearchImage(imagefile: FormData) {
  return useQuery<reslutImage, Error>(["searchimage", imagefile], () => searchImage(imagefile));
}
