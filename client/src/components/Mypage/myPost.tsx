import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyPost(data: any) {
  const router = useRouter();
  const [isPostList, setIsPostList] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <>
      {true ? (
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
              작성리뷰
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
                준비된 레시피를 따라 요리를 해보고 리뷰를 작성해보세요!
              </Typography>
            )}
          </ImageListItem>
          <ImageList
            key="imageList"
            cols={3}
            style={{ marginBottom: "10rem", width: "140%" }}
          >
            {data?.data?.map((item: any, index: number) => (
              <ImageListItem key={index} sx={{ width: "100" }}>
                <img
                  src={`${item.recipe_img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.recipe_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.recipe_id}
                  loading="lazy"
                  onClick={() => router.push(`/recipe/${item.recipe_id}`)}
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

export default MyPost;

// const img = css`
//     width:100%;
//     height:15rem;
//     cursor: pointer;
//     /* box-shadow: 2px 2px 6px gray; */
// `;

// const tmp = css`
//     cursor: pointer;
//     /* box-shadow: 2px 2px 6px gray; */
//     :hover {
//         opacity: 0.8;
//         transition: all 0.3s ease-in-out;
//     }
// `;
