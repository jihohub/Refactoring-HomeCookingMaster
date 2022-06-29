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

function RecipeShowOthers({data}) {
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
