import { useQuery } from "react-query";
import axios from "axios";

type LikeRecipes = {
  result: string;
};

function likeRecipe(recipe_id: number): Promise<LikeRecipes> {
  return axios.post(`/api/recipe/${recipe_id}/like`).then((response) => response.data);
}

function useRecipeLike(recipe_id: number) {
  return useQuery<LikeRecipes, Error>("recipeLike", () => likeRecipe(recipe_id));
}
