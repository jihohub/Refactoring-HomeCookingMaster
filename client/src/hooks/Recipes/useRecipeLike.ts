import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

type LikeRecipes = {
  result: string;
  message: string;
};

interface likeParameters {
  recipe_id: string | string[] | undefined;
  user_id: number | null;
  access_token: string | null;
}

async function recipeLike({
  recipe_id,
  user_id,
  access_token,
}: likeParameters): Promise<LikeRecipes> {
  return await axios
    .post(`/api/recipe/${recipe_id}/like`, { user_id }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => response.data);
}

export default function useRecipeLike() {
  const queryClient = useQueryClient();
  const mutation = useMutation(recipeLike, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("recipe");
    },
  });

  return mutation;
}
