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
import useRecipe from "../../hooks/Recipes/useRecipe";
import RecipeMain from "../../components/Recipe/RecipeMain";
import RecipeReviewForm from "../../components/Recipe/RecipeReviewForm";
import RecipeShowOthers from "../../components/Recipe/RecipeShowOthers";
import RecipeReviews from "../../components/Recipe/RecipeReviews";
import LoadingScreen from "../../components/Common/LoadingScreen";


const Recipe = () => {
  const router = useRouter();
  const { recipe_id } = router.query;
  const { isLoading, data } = useRecipe(recipe_id);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <RecipeMain data={data?.data} />
      <RecipeShowOthers data={data?.data} />
      <RecipeReviews data={data?.data} />
      <RecipeReviewForm />
    </>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { recipe_id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["recipe", recipe_id], () =>
    useRecipe(recipe_id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Recipe;
