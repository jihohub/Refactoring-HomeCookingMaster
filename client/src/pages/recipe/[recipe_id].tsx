import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useSession } from "next-auth/react";
import fetchRecipe from "../../hooks/Recipes/useRecipe";
import RecipeMain from "../../components/Recipe/RecipeMain";
import RecipeBoard from "../../components/Recipe/RecipeBoard";
import RecipeShowOthers from "../../components/Recipe/RecipeShowOthers";
import ReviewList from "../../components/Recipe/ReviewList";


const Recipe = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { recipe_id } = router.query;
  const { data } = useQuery(["recipe", recipe_id], () =>
    fetchRecipe(recipe_id)
  );
  const { recipe_info, food_info, ingredient_info, process_info, post_info, other_recipes_info, did_u_liked } = data?.data || {};

  return (
    <>
      <RecipeMain data={data?.data} />
      {/* <RecipeBoard props={data} />
      <RecipeShowOthers props={data} />
      <ReviewList props={data} /> */}
      <div>
        <p>{recipe_info?.name}</p>
        <img src={recipe_info?.img}></img>
        <p>좋아요: {recipe_info?.likes}</p>
        <p>조회수: {recipe_info?.views}</p>
        <p>{recipe_info?.servings}</p>
        <p>{recipe_info?.difficulty}</p>
        <p>{recipe_info?.cooking_time}</p>
      </div>
      <div>
        <h1>재료</h1>
        {ingredient_info?.map((item) => (
          <p>{item.name}</p>
        ))}
      </div>
      <div>
        <h1>조리과정</h1>
        {process_info?.map((item) => (
          <>
            <h2>{item.step}</h2>
            <img src={item.img}></img>
            <p>{item.recipe}</p>
          </>
        ))}
      </div>
      <div>
        <h1>댓글</h1>
        {post_info?.map((item) => (
          <>
            <p>{item.nickname}</p>
            <p>{item.timestamp}</p>
            <img src={item.img} width="200"></img>
          </>
        ))}
      </div>
      <form>
        <label htmlFor="post">Username:</label>
        <input type="text" placeholder="댓글" name="post" />
        <input type="submit" value="Submit!"></input>
      </form>
    </>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { recipe_id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["recipe", recipe_id], () =>
    fetchRecipe(recipe_id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Recipe;
