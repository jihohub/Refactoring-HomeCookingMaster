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

type RecipeProps = {
  data: {
    recipe_info: {
      id: number;
      name: string;
      likes: number;
      views: number;
      img: string;
      servings: string;
      difficulty: string;
      cooking_time: string;
      food_id: number;
    };
    food_info: {
      id: number;
      name: string;
      category_l: string;
      category_m: string;
      category_s: string;
    };
    ingredient_info: Array<{
      id: number;
      name: string;
      amount: string;
      recipe_id: number;
    }>;
    process_info: Array<{
      id: number;
      recipe: string;
      step: number;
      img: string;
      recipe_id: number;
    }>;
    post_info: Array<{
      id: number;
      post: string;
      img: string;
      timestamp: string;
      user_id: number;
      nickname: string;
      profile_img: string;
      recipe_id: number;
    }>;
    other_recipes_info: Array<{
      id: number;
      name: string;
      img: string;
      views: number;
      likes: number;
      servings: string;
      difficulty: string;
      cooking_time: string;
      food_id: number;
    }>;
    did_u_liked: boolean;
  } | undefined;
};

function RecipeMain({ data }: RecipeProps) {
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
      <div className={styles.title}>
        <p>재료 리스트</p>
        <Divider />
      </div>
      <div className={styles.ingredient__text}>
        {ingredient_info?.map((item: any, index: number) => (
          <p key={index}>
            <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
            {` ${item.name} ${item.amount}`}
          </p>
        ))}
      </div>
      <div className={styles.title}>
        <p>레시피</p>
        <Divider />
      </div>
      {process_info?.map((item: any, index: number) => (
        <div key={index}>
          <p>
            <IconButton>
              <CheckCircleIcon />
            </IconButton>
            {`${item.step}단계`}
          </p>
          <div className={styles.progress__wrap}>
            <img
              src={item.img}
              className={styles.progress__image}
              alt="step image"
            />
            <p className={styles.progress__text}>{`${item.recipe}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeMain;
