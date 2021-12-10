/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
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
    const user_id = sessionStorage.getItem("user_id"); // user_id

    useEffect(() => {
        dispatch(getRecipe({ recipe_id, user_id }));
        return () => {
            dispatch(clearRecipe());
        };
    }, [dispatch, recipe_id, user_id]);

    return (
        <div>
            <RecipeMain recipe={recipe} user_id={user_id} />
            <RecipeShowOthers recipe={recipe} />
            <ReviewList post={recipe.post_info} />
            <RecipeBoard recipe_id={recipe_id} />
        </div>
    );
}

export default RecipePage;
