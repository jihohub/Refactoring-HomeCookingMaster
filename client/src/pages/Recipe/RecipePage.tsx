/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRecipe, clearRecipe } from "../../modules/recipeSlice";

import RecipeMain from "../../components/Recipe/RecipeMain";
import ReviewList from "../../components/Recipe/ReviewList";
import RecipeBoard from "../../components/Recipe/RecipeBoard";
import RecipeShowOthers from "../../components/Recipe/RecipeShowOthers";

function RecipePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const recipe_id = Number(params.id);
    const recipe = useSelector((state: RootStateOrAny) => state.recipeSlice);
    const user_id = String(sessionStorage.getItem("user_id")); // user_id

    console.log("세션스토리지", user_id);

    useEffect(() => {
        dispatch(getRecipe({ recipe_id, user_id }));
        return () => {
            dispatch(clearRecipe());
        };
    }, []);

    return (
        <div>
            <RecipeMain recipe={recipe} />
            <RecipeShowOthers recipe={recipe} />
            <ReviewList post={recipe.post_info} />
            <RecipeBoard recipe_id={recipe_id} />
        </div>
    );
}

export default RecipePage;
