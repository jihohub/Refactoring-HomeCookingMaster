import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

type DeleteRecipes = {
  result: string;
  message: string;
};

interface deleteParameters {
  recipe_id: string | string[] | undefined;
  post_id: number;
  access_token: string | null;
}

async function recipeDelete({
  recipe_id,
  post_id,
  access_token,
}: deleteParameters): Promise<DeleteRecipes> {
  return await axios
    .delete(`/api/recipe/${recipe_id}/del`, {
      data: { post_id },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => response.data);
}

export default function useRecipeDelete() {
  const queryClient = useQueryClient();
  const mutation = useMutation(recipeDelete, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("recipe");
    },
  });

  return mutation;
}
