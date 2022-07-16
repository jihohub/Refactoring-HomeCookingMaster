import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./RecipeShowOthers.module.scss";

type RecipeProps = {
  data:
    | {
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
      }
    | undefined;
};

function RecipeShowOthers({ data }: RecipeProps) {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <p>다른 레시피 보기</p>
        <Divider />
      </div>
      <div className={styles.box}>
        <ImageList cols={1}>
          {data?.other_recipes_info
            ? data?.other_recipes_info.map((item: any, index: number) => (
                <ImageListItem
                  key={index}
                  // css={img}
                  onClick={() => router.push(`/recipe/${item.id}`)}
                >
                  <img
                    src={`${item.img}?w=124&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=124&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    className={styles.image}
                  />
                  <ImageListItemBar
                    title={
                      <Typography>
                        {item.name}
                      </Typography>
                    }
                    actionIcon={
                      <IconButton
                        sx={{
                          color: "rgba(255, 255, 255, 0.54)",
                          cursor: "pointer",
                        }}
                        aria-label={`info about ${item.name}`}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))
            : ""}
        </ImageList>
      </div>
    </div>
  );
}

export default RecipeShowOthers;
