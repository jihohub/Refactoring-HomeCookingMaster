/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRecipe, clearRecipe } from "../../modules/recipeSlice";

import RecipeMain from "../../components/Recipe/RecipeMain";
import ReviewList from "../../components/Recipe/ReviewList";
import RecipeBoard from "../../components/Recipe/RecipeBoard";

function RecipePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const recipe_id = Number(params.id);
    const user_info = useSelector((state: RootStateOrAny) => state.loginInfoSlice);
    const recipe = useSelector((state: RootStateOrAny) => state.recipeSlice);

    console.log("ui", user_info);
    // useEffect(() => {
    //     dispatch(getRecipe({ recipe_id, user_info.user_id }));
    //     return () => {
    //         dispatch(clearRecipe());
    //     };
    // }, []);

    return (
        <div>
            <RecipeMain recipe={recipe} user_id={user_info.user_id} />
            <ReviewList post={recipe.post_info} />
            <RecipeBoard recipe_id={recipe_id}/>
        </div>
    );
}

export default RecipePage;
