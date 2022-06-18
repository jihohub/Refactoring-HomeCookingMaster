import React, { useState } from "react";
import { Box, Typography, IconButton, Divider, Popover } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AlarmIcon from "@mui/icons-material/Alarm";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../atom/loginInfo";
import useRecipeLike from "../../hooks/Recipes/useRecipeLike";
import { useRouter } from "next/router";
import styles from "./RecipeMain.module.scss";

function RecipeMain({ data }) {
  const router = useRouter();
  const { recipe_id } = router.query;
  const loggedin = useRecoilValue(loginInfo);
  const user_id = loggedin.user_id;
  const { mutate: recipeLike, isLoading: recipeLikeLoading } = useRecipeLike();

  const {
    did_u_liked,
    recipe_info,
    food_info,
    ingredient_info,
    process_info,
    post_info,
    other_recipes_info,
  } = data || {};

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const access_token = loggedin.access_token;
    recipeLike({ recipe_id, user_id, access_token });
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.wrap}>
      <p className={styles.category__text}>
        {`${food_info?.category_l} > ${food_info?.category_m} > ${food_info?.category_s}`}
      </p>
      <div className={styles["wrap--center"]}>
        <img src={recipe_info?.img} alt="food image" className={styles.image} />
        <p className={styles.title__text}>{recipe_info?.name}</p>
        <div className={styles.icon__wrap}>
          <IconButton>
            <RestaurantIcon className={styles.icon} />
          </IconButton>
          <p className={styles.iconButton}>{recipe_info?.servings}</p>
        </div>
        <div className={styles.icon__wrap}>
          <IconButton>
            <QuizIcon className={styles.icon} />
          </IconButton>
          <p className={styles.iconButton}>{recipe_info?.difficulty}</p>
        </div>
        <div className={styles.icon__wrap}>
          <IconButton>
            <AlarmIcon className={styles.icon} />
          </IconButton>
          <p className={styles.iconButton}>{recipe_info?.cooking_time}</p>
        </div>
      </div>
      <div className={styles.like__wrap}>
        {user_id && did_u_liked && (
          <p className={styles.like}>
            <IconButton onClick={handleLike}>
              <FavoriteIcon className={styles.favoriteIcon} />
            </IconButton>
            {recipe_info?.likes}
          </p>
        )}
        {user_id && !did_u_liked && (
          <p className={styles.like}>
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon className={styles.favoriteIcon} />
            </IconButton>
            {recipe_info?.likes}
          </p>
        )}
        {!user_id && (
          <p className={styles.like}>
            <IconButton onClick={handleClick}>
              <FavoriteBorderIcon className={styles.favoriteIcon} />
            </IconButton>
            {recipe_info?.likes}
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
              <p>로그인 후 이용해주세요.</p>
            </Popover>
          </p>
        )}
      </div>
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
        {ingredient_info?.map((item: any, index: number) => (
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
      {process_info?.map((item: any, index: number) => (
        <Box key={index}>
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
        </Box>
      ))}
      <Box sx={{ width: "70vw", maxWidth: "1080px", height: "30px" }} />
    </div>
  );
}

export default RecipeMain;
