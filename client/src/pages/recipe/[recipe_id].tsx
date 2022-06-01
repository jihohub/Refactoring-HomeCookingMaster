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
      <RecipeShowOthers data={data?.data} />
      <ReviewList data={data?.data} />
      <RecipeBoard />
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
