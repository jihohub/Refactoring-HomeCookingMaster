import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

type PostRecipes = {
  result: string;
  message: string;
  data: {
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
  };
};

interface postParameters {
  recipe_id: string | string[] | undefined;
  formData: FormData;
  access_token: string | null;
}

async function recipePost({ recipe_id, formData, access_token }: postParameters): Promise<PostRecipes> {
  return await axios
    .post(`/api/recipe/${recipe_id}/post`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => response.data);
}

export default function useRecipePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation(recipePost, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("recipe");
    },
  });

  return mutation;
}
