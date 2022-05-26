import { useQuery } from "react-query";
import axios from "axios";

type Recipes = {
  did_u_liked: boolean;
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
};

function fetchRecipe(recipe_id: number): Promise<Recipes> {
  return axios.post(`/api/recipe/${recipe_id}`).then((response) => response.data);
}

function useRecipe(recipe_id: number) {
  return useQuery<Recipes, Error>("recipe", () => fetchRecipe(recipe_id));
}
