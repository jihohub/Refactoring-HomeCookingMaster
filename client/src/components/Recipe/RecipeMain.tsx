/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { recipeLike } from "../../modules/recipeLikeSlice";
import { getRecipe } from "../../modules/recipeSlice";
import { Box, Typography, Button, IconButton, Divider, Popover  } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AlarmIcon from "@mui/icons-material/Alarm";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

function RecipeMain(props: any) {
    const dispatch = useDispatch();

    const { recipe_info, food_info, ingredient_info, process_info, post_info } = props.recipe;
    const recipe_id = recipe_info.id
    const user_id = props.user_id;

    const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        console.log("라이크 누를 때", user_id);
        console.log("라이크 누를 때", recipe_id);
        await dispatch(recipeLike({ recipe_id, user_id }));
        dispatch(getRecipe({ recipe_id, user_id }));
    };

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <Box sx={{ width: "70vw", height: "50px" }} />
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                <Typography sx={{ color: "brown", fontSize: "1.25rem" }}>
                    {`${food_info.category_l} > ${food_info.category_m} > ${food_info.category_s}`}
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <img
                    src={recipe_info.img}
                    style={{ width: "80%", minWidth: "80%" }}
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
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "right" }}>
                <Typography>
                    <IconButton onClick={handleLike}>
                        <FavoriteIcon sx={{ color: "red" }} />
                    </IconButton>
                    {recipe_info.likes}
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <Typography sx={{ p: 2 }}>
                            이 레시피에 좋아요를 누르셨습니다.
                            <br />
                            좋아요를 누른 레시피는 스크랩되어
                            <br />
                            마이페이지에서도 확인하실 수 있습니다.
                        </Typography>
                    </Popover>
                </Typography>
            </Box>
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
                            style={{ width: "40%", minWidth: "40%" }}
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
