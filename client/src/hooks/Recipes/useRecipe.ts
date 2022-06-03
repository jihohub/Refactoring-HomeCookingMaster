import { useQuery } from "react-query";
import axios from "axios";

type Recipe = {
  result: string;
  message: string;
  data: {
    recipe_info: {
      id: number;
      name: string;
      likes: number;
      views: number;
      img: string;
      servings: string;
      difficulty: string;
      cooking_time: string;
      food_id: number;
    };
    food_info: {
      id: number;
      name: string;
      category_l: string;
      category_m: string;
      category_s: string;
    };
    ingredient_info: Array<{
      id: number;
      name: string;
      amount: string;
      recipe_id: number;
    }>;
    process_info: Array<{
      id: number;
      recipe: string;
      step: number;
      img: string;
      recipe_id: number;
    }>;
    post_info: Array<{
      id: number;
      post: string;
      img: string;
      timestamp: string;
      user_id: number;
      nickname: string;
      profile_img: string;
      recipe_id: number;
    }>;
    other_recipes_info: Array<{
      id: number;
      name: string;
      img: string;
      views: number;
      likes: number;
      servings: string;
      difficulty: string;
      cooking_time: string;
      food_id: number;
    }>;
    did_u_liked: boolean;
  };
};

async function fetchRecipe(recipe_id: string | string[] | undefined): Promise<Recipe> {
  return await axios.post(`/api/recipe/${recipe_id}`, {"user_id": 7}).then((response) => response.data);
}

export default function useRecipe(recipe_id: string | string[] | undefined) {
  return useQuery<Recipe, Error>(["recipe", recipe_id], () => fetchRecipe(recipe_id));
}
