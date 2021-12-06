/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { getRecipe, clearRecipe } from "../../modules/recipeSlice";
import ReviewList from "../../components/Recipe/ReviewList";

function RecipePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.id);
    console.log("hm", id, typeof id);

    useEffect(() => {
        dispatch(getRecipe(id));
        return () => {
            dispatch(clearRecipe());
        };
    }, []);
    
    const { food_info, ingredient_info, post_info, process_info, recipe_info } = useSelector((state: RootStateOrAny) => state.recipeSlice);
    
    console.log("1", ingredient_info);
    console.log("2", process_info);
    console.log("3", recipe_info);

    const {
        cooking_time,
        difficulty,
        food_id2,
        recipe_id,
        img,
        likes,
        name,
        servings,
        views
    } = recipe_info;

    return (
        <div>
            <img src={img} alt="food" />
            <Typography>{name}</Typography>
            <Typography>재료리스트</Typography>
            {ingredient_info.map((item: any) => {
                return (
                    <div>
                        <Typography>
                            {item.name} {item.amount}
                        </Typography>
                    </div>
                );
            })}
            <Typography>레시피</Typography>
            {process_info.map((item: any) => {
                return (
                    <div>
                        <img src={item.img} alt="recipe" />
                        <Typography>{item.step}</Typography>
                        <Typography>{item.recipe}</Typography>
                    </div>
                );
            })}
            <Typography>다른 레시피 보기</Typography>
            <Typography>생생한 리뷰 보기</Typography>
            <ReviewList post={post_info} />
        </div>
    );
}

export default RecipePage;
