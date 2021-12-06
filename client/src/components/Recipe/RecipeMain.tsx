/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { getRecipe, clearRecipe } from "../../modules/recipeSlice";

function RecipeMain(props: any) {
    const { recipe_info, food_info, ingredient_info, process_info, post_info } = props.recipe;

    return (
        <div>
            <img src={recipe_info.img} width="70%" alt="food" />
            <Typography>{recipe_info.name}</Typography>
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
                        <img src={item.img} width="70%" alt="recipe" />
                        <Typography>{item.step}</Typography>
                        <Typography>{item.recipe}</Typography>
                    </div>
                );
            })}
            <Typography>다른 레시피 보기</Typography>
            <Typography>생생한 리뷰 보기</Typography>
        </div>
    );
}

export default RecipeMain;
