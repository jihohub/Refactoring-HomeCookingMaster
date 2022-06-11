import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyScrap() {
  const router = useRouter();
  const [isScrapList, setIsScrapList] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <>
      {isScrapList ? (
        <ImageList
          sx={{
            width: "100%",
            height: 450,
            display: "flex",
            marginLeft: "25%",
            flexDirection: "column",
            mt: 8,
          }}
        >
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader
              component="div"
              sx={{
                width: "40rem",
                backgroundColor: "#897A5F",
                color: "white",
              }}
            >
              스크랩레시피
            </ListSubheader>
            {isEmpty ? (
              ""
            ) : (
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ fontWeight: "600" }}
              >
                원하는 레시피를 스크랩해보세요!
              </Typography>
            )}
          </ImageListItem>
          {scarpList.data.liked_recipe.map((item: any) => (
            <ImageListItem
              sx={{ width: "15rem", height: "10rem", cursor: "pointer" }}
              onClick={() => navigate(`/recipe/${item.recipe_id}`)}
            >
              <img
                src={`${item.recipe_img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.recipe_name}
                style={{ width: "100%", height: "15rem" }}
              />
              <ImageListItemBar
                title={item.recipe_name}
                // subtitle={item.author}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        ""
      )}

      {isScrapList ? (
        <ImageList
          sx={{
            width: "100%",
            // height: 400,
            // justifyContent: 'center',
            marginLeft: "15%",
            mt: 8,
          }}
        >
          <ImageListItem key="Subheader" cols={3}>
            <ListSubheader
              sx={{
                width: "70%",
                backgroundColor: "#897A5F",
                color: "white",
              }}
              component="div"
            >
              스크랩레시피
            </ListSubheader>
            {isEmpty ? (
              ""
            ) : (
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ fontWeight: "600" }}
              >
                원하는 레시피를 스크랩해보세요!
              </Typography>
            )}
          </ImageListItem>
          <ImageList
            key="imageList"
            cols={3}
            style={{ marginBottom: "10rem", width: "140%" }}
          >
            {scarpList.data.liked_recipe.map((item: any, index: number) => (
              <ImageListItem key={index} sx={{ width: "100" }} css={tmp}>
                <img
                  src={`${item.recipe_img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.recipe_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.recipe_id}
                  loading="lazy"
                  onClick={() => router.push(`/recipe/${item.recipe_id}`)}
                  css={img}
                />
                <ImageListItemBar title={item.recipe_name} />
              </ImageListItem>
            ))}
          </ImageList>
        </ImageList>
      ) : (
        ""
      )}
    </>
  );
}

export default MyScrap;

// const img = css`
//   width: 100%;
//   height: 15rem;
//   cursor: pointer;
//   /* box-shadow: 2px 2px 6px gray; */
// `;

// const tmp = css`
//   cursor: pointer;
//   /* box-shadow: 2px 2px 6px gray; */
//   :hover {
//     opacity: 0.8;
//     transition: all 0.3s ease-in-out;
//   }
// `;
