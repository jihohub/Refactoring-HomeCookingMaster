import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../atom/loginInfo";
import { Token } from "typescript";

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

// interface postParameters {
//   recipe_id: string | string[] | undefined;
//   user_id: number | null;
//   post: string;
//   img: File | null;
// }

interface postParameters {
  recipe_id: string | string[] | undefined;
  formData: FormData;
  access_token: string | null;
}

// function recipePost({ recipe_id, user_id, post, img }: postParameters): Promise<PostRecipes> {
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
  // const formData = new FormData();
  // formData.append("user_id", String(user_id));
  // formData.append("post", post);
  // img && formData.append("img", img);
  const loggedin = useRecoilValue(loginInfo);


  const mutation = useMutation(recipePost, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("recipe");
    },
  });

  return mutation;
}
