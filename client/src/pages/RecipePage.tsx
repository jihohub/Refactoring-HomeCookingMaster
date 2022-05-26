import React, { useState } from "react";
import { useEffect } from "react";
// import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { getRecipe, clearRecipe } from "../modules/recipeSlice";

import RecipeMain from "../components/Recipe/RecipeMain";
import ReviewList from "../components/Recipe/ReviewList";
import RecipeBoard from "../components/Recipe/RecipeBoard";
import RecipeShowOthers from "../components/Recipe/RecipeShowOthers";
import { Box } from "@mui/material";

function RecipePage() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const recipe_id = Number(router.query.id);
  // const recipe = useSelector((state: RootStateOrAny) => state.recipeSlice);
  // const user_id = sessionStorage.getItem("user_id"); // user_id

  // useEffect(() => {
  //   dispatch(getRecipe({ recipe_id, user_id }));
  //   return () => {
  //     dispatch(clearRecipe());
  //   };
  // }, [dispatch, recipe_id, user_id]);

  return (
    <Box
      sx={{
        backgroundColor: "#fbfbf9",
        width: "80vw",
        margin: "10% auto",
        padding: "0 5%",
      }}
    >
      {/* <RecipeMain recipe={recipe} user_id={user_id} />
      <RecipeShowOthers recipe={recipe} />
      <ReviewList post={recipe.post_info} />
      <RecipeBoard recipe_id={recipe_id} /> */}
    </Box>
  );
}

export default RecipePage;
