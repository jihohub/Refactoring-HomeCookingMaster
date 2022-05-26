import { useQuery } from "react-query";
import axios from "axios";

type PostRecipes = {
  nickname: string;
  post: string;
  img: string;
  timestamp: Date;
};

function postRecipe(recipe_id: number): Promise<PostRecipes> {
  return axios.post(`/api/recipe/${recipe_id}/post`).then((response) => response.data);
}

function useRecipePost(recipe_id: number) {
  return useQuery<PostRecipes, Error>("recipePost", () => postRecipe(recipe_id));
}