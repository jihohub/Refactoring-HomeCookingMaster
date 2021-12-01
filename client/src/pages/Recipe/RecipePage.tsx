/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { getRecipe, clearRecipe } from "../../modules/recipeSlice";

function RecipePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.id);
    console.log(id);

    useEffect(() => {
        dispatch(getRecipe(id));
        return () => {
            dispatch(clearRecipe());
        };
    }, []);
    
    const { food_info, post_info, recipe_info } = useSelector((state: RootStateOrAny) => state.recipeSlice);
    
    console.log(food_info);
    console.log(post_info);
    console.log(recipe_info);
    
    
    const {
        category_l,
        category_m,
        category_s,
        food_id,
        food_name
    } = food_info;
    const post = post_info;
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
            <img src={img} />
            <Typography>{name}</Typography>
            <Typography>재료리스트</Typography>
            <Typography>재료 룰루랄라</Typography>
            <Typography>레시피</Typography>
            <Typography>1단계</Typography>
            <Typography>하하</Typography>
            <Typography>2단계</Typography>
            <Typography>호호</Typography>
            <Typography>3단계</Typography>
            <Typography>룰루</Typography>
            <Typography>다른 레시피 보기</Typography>
            <Typography>생생한 리뷰 보기</Typography>
        </div>
    );
}

export default RecipePage;
