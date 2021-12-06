/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { getRecipe, clearRecipe } from "../../modules/recipeSlice";
import RecipeMain from "../../components/Recipe/RecipeMain";
import ReviewList from "../../components/Recipe/ReviewList";
import RecipeBoard from "../../components/Recipe/RecipeBoard";

function RecipePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        dispatch(getRecipe(id));
        return () => {
            dispatch(clearRecipe());
        };
    }, []);

    const recipe = useSelector((state: RootStateOrAny) => state.recipeSlice);

    return (
        <div>
            <RecipeMain recipe={recipe} />
            <ReviewList recipe={recipe} />
            <RecipeBoard recipe={recipe} />
        </div>
    );
}

export default RecipePage;
