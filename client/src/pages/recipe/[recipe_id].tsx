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
import fetchRecipe from "../../hooks/Recipes/useRecipe"

const Recipe = () => {
  const router = useRouter();
  const { recipe_id } = router.query;
  const { data } = useQuery(["recipe", recipe_id], () =>
    fetchRecipe(recipe_id)
  );
  const { recipe_info, food_info, ingredient_info, process_info, post_info, other_recipes_info, did_u_liked } = data?.data || {};

  return (
    <>
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
        {ingredient_info?.map((item) => (
          <p>{item.name}</p>
        ))}
      </div>
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
