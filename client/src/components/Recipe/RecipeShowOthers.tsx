import { css } from "@emotion/react";
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

function RecipeShowOthers({data}) {
  const router = useRouter();
  // const recipe_id = Number(router.query.id);
  // const user_info = useSelector((state: RootStateOrAny) => state.getUserInfo);
  // const { user_id } = user_info;

  // useEffect(() => {
  //   dispatch(getRecipe({ recipe_id, user_id }));
  //   return () => {
  //     dispatch(clearRecipe());
  //   };
  // }, [dispatch, recipe_id, user_id]);

  return (
    <>
      <Box sx={{ width: "70vw", maxWidth: "1080px", margin: "0 auto" }}>
        <Typography
          sx={{
            fontSize: "1.75rem",
            color: "#897A5F",
            fontFamily: "Elice",
          }}
        >
          다른 레시피 보기
        </Typography>
      </Box>
      <Box
        sx={{
          width: "70vw",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Divider />
      </Box>
      <Box sx={{ width: "70vw", maxWidth: "1080px", height: "30px" }} />
      <Box
        sx={{
          width: "70vw",
          height: "20vh",
          margin: "0 auto",
        }}
      >
        <ImageList
          cols={3}
          gap={20}
          sx={{
            width: "70vw",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: "15rem",
          }}
        >
          {data?.other_recipes_info
            ? data?.other_recipes_info.map((item: any, index: number) => (
                <ImageListItem
                  key={index}
                  sx={{
                    width: "20%",
                    height: "7%",
                    boxShadow: "5px 2px 10px gray",
                  }}
                  css={img}
                  onClick={() => router.push(`/recipe/${item.id}`)}
                >
                  <img
                    src={`${item.img}?w=124&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=124&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    style={{ width: "100%", height: "10rem" }}
                  />
                  <ImageListItemBar
                    title={
                      <Typography
                        sx={{
                          fontFamily: "Elice",
                        }}
                      >
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
      </Box>
    </>
  );
}

export default RecipeShowOthers;

const img = css`
  /* width:100%;
    height:10rem; */
  cursor: pointer;
  /* box-shadow: 2px 2px 6px gray; */
  opacity: 1;
  :hover {
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
  }
`;
