/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { recipeLike } from "../../modules/recipeLikeSlice";
import { getRecipe } from "../../modules/recipeSlice";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AlarmIcon from "@mui/icons-material/Alarm";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

function RecipeMain(props: any) {
    const dispatch = useDispatch();

    const { recipe_info, food_info, ingredient_info, process_info, post_info } = props.recipe;
    const recipe_id = recipe_info.id
    const user_id = String(sessionStorage.getItem("user_id")); // user_id

    const handleLike = async () => {
        await dispatch(recipeLike({ recipe_id, user_id }));
        dispatch(getRecipe(recipe_id));
    };

    return (
        <>
            <Box sx={{ width: "70vw", height: "50px" }} />
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                <Typography sx={{ color: "brown" }}>
                    {`${food_info.category_l} > ${food_info.category_m} > ${food_info.category_s}`}
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                <img
                    src={recipe_info.img}
                    style={{ width: "100%" }}
                    alt="food"
                />
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Typography sx={{ fontSize: "2rem" }}>
                    {recipe_info.name}
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Typography>
                    <IconButton>
                        <RestaurantIcon />
                    </IconButton>
                    {recipe_info.servings}
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Typography>
                    <IconButton>
                        <QuizIcon />
                    </IconButton>
                    {recipe_info.difficulty}
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Typography>
                    <IconButton>
                        <AlarmIcon />
                    </IconButton>
                    {recipe_info.cooking_time}
                </Typography>
            </Box>
            <Button variant="contained" onClick={handleLike}>
                좋아요
            </Button>
            <Box sx={{ width: "70vw", height: "30px" }} />
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                <Typography sx={{ fontSize: "1.5rem", color: "brown" }}>
                    재료 리스트
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Divider />
            </Box>
            <Box sx={{ width: "70vw", height: "10px" }} />
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                {ingredient_info.map((item: any, index: number) => (
                    <Typography key={index}>
                        {`${item.name} ${item.amount}`}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ width: "70vw", height: "30px" }} />
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                <Typography sx={{ fontSize: "1.5rem", color: "brown" }}>
                    레시피
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Divider />
            </Box>
            {process_info.map((item: any, index: number) => (
                <>
                    <Box sx={{ width: "70vw", height: "10px" }} />
                    <Box sx={{ width: "70vw", margin: "0 auto" }}>
                        <Typography>
                            <IconButton>
                                <CheckCircleIcon />
                            </IconButton>
                            {`${item.step}단계`}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: "70vw",
                            margin: "0 auto",
                            display: "flex",
                            alignItems: "flex-start",
                        }}
                    >
                        <img
                            src={item.img}
                            style={{ width: "40%" }}
                            alt="step"
                        />
                        <Typography sx={{ margin: "0 3%" }}>
                            {`${item.recipe}`}
                        </Typography>
                    </Box>
                </>
            ))}
            <Box sx={{ width: "70vw", height: "30px" }} />
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                <Typography sx={{ fontSize: "1.5rem", color: "brown" }}>
                    다른 레시피 보기
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Divider />
            </Box>
            <Box sx={{ width: "70vw", height: "30px" }} />
        </>
    );
}

export default RecipeMain;
