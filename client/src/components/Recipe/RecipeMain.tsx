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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function RecipeMain(props: any) {
    const dispatch = useDispatch();

    const { did_u_liked, recipe_info, food_info, ingredient_info, process_info, post_info } = props.recipe;
    const recipe_id = recipe_info.id
    const user_id = String(sessionStorage.getItem("user_id")); // user_id

    console.log("그냥 페이지에서", typeof props.user_id);

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
            <Box sx={{ width: "70vw", maxWidth: "1080px", height: "50px" }} />
            <Box sx={{ width: "70vw", maxWidth: "1080px", margin: "0 auto" }}>
                <Typography
                    sx={{
                        color: "#897A5F",
                        fontSize: "1.5rem",
                        fontFamily: "Elice",
                    }}
                >
                    {`${food_info.category_l} > ${food_info.category_m} > ${food_info.category_s}`}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <img
                    src={recipe_info.img}
                    style={{ width: "70%", minWidth: "70%" }}
                    alt="food"
                />
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <Typography sx={{ fontSize: "2rem", fontFamily: "Elice" }}>
                    {recipe_info.name}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <IconButton>
                    <RestaurantIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography sx={{ fontSize: "1.3rem", fontFamily: "Elice" }}>
                    {recipe_info.servings}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <IconButton>
                    <QuizIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography sx={{ fontSize: "1.3rem", fontFamily: "Elice" }}>
                    {recipe_info.difficulty}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <IconButton>
                    <AlarmIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography sx={{ fontSize: "1.3rem", fontFamily: "Elice" }}>
                    {recipe_info.cooking_time}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "right",
                }}
            >
                {user_id && did_u_liked && (
                    <Typography
                        sx={{ fontSize: "2.3rem", fontFamily: "Elice" }}
                    >
                        <IconButton onClick={handleLike}>
                            <FavoriteIcon
                                sx={{ color: "#897A5F", fontSize: "2.5rem" }}
                            />
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
                            <Typography sx={{ p: 2, fontFamily: "Elice" }}>
                                좋아요를 취소하셨습니다.
                            </Typography>
                        </Popover>
                    </Typography>
                )}
                {user_id && !did_u_liked && (
                    <Typography
                        sx={{ fontSize: "2.3rem", fontFamily: "Elice" }}
                    >
                        <IconButton onClick={handleLike}>
                            <FavoriteBorderIcon
                                sx={{ color: "#897A5F", fontSize: "2.5rem" }}
                            />
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
                            <Typography sx={{ p: 2, fontFamily: "Elice" }}>
                                이 레시피에 좋아요를 누르셨습니다.
                            </Typography>
                        </Popover>
                    </Typography>
                )}
                {!user_id && (
                    <Typography
                        sx={{ fontSize: "2.3rem", fontFamily: "Elice" }}
                    >
                        <IconButton onClick={handleLike}>
                            <FavoriteBorderIcon
                                sx={{ color: "#897A5F", fontSize: "2.5rem" }}
                            />
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
                            <Typography sx={{ p: 2, fontFamily: "Elice" }}>
                                로그인 후 이용해주세요.
                            </Typography>
                        </Popover>
                    </Typography>
                )}
            </Box>
            <Box sx={{ width: "70vw", maxWidth: "1080px", height: "30px" }} />
            <Box sx={{ width: "70vw", maxWidth: "1080px", margin: "0 auto" }}>
                <Typography
                    sx={{
                        fontSize: "1.75rem",
                        color: "#897A5F",
                        fontFamily: "Elice",
                    }}
                >
                    재료 리스트
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <Divider />
            </Box>
            <Box sx={{ width: "70vw", maxWidth: "1080px", height: "10px" }} />
            <Box sx={{ width: "70vw", maxWidth: "1080px", margin: "0 auto" }}>
                {ingredient_info.map((item: any, index: number) => (
                    <Typography
                        key={index}
                        sx={{ fontSize: "1.25rem", fontFamily: "Elice" }}
                    >
                        <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
                        {` ${item.name} ${item.amount}`}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ width: "70vw", maxWidth: "1080px", height: "30px" }} />
            <Box sx={{ width: "70vw", maxWidth: "1080px", margin: "0 auto" }}>
                <Typography
                    sx={{
                        fontSize: "1.75rem",
                        color: "#897A5F",
                        fontFamily: "Elice",
                    }}
                >
                    레시피
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <Divider />
            </Box>
            {process_info.map((item: any, index: number) => (
                <>
                    <Box
                        sx={{
                            width: "70vw",
                            maxWidth: "1080px",
                            height: "10px",
                        }}
                    />
                    <Box
                        sx={{
                            width: "70vw",
                            maxWidth: "1080px",
                            margin: "0 auto",
                        }}
                    >
                        <Typography sx={{ fontFamily: "Elice" }}>
                            <IconButton>
                                <CheckCircleIcon />
                            </IconButton>
                            {`${item.step}단계`}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: "70vw",
                            maxWidth: "1080px",
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
                        <Typography
                            sx={{
                                margin: "0 3%",
                                fontSize: "1.25rem",
                                fontFamily: "Elice",
                            }}
                        >
                            {`${item.recipe}`}
                        </Typography>
                    </Box>
                </>
            ))}
            <Box sx={{ width: "70vw", maxWidth: "1080px", height: "30px" }} />
        </>
    );
}

export default RecipeMain;
