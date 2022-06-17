import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./MainRanking.module.scss";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

const MainRanking = ({ranking}) => {

  return (
    <>
      {ranking?.data.map((item: any) => (
        <>
          <p>{item.name}</p>
          {/* <Link
            href={`/recipe/[recipe_id]?recipe_id=${encodeURIComponent(item.id)}`} as ={`/recipe/${encodeURIComponent(item.id)}`}
          >
            <img src={item.img} width="200" height="100" alt={item.name}></img>
          </Link> */}
          {/* <Link
            href={{
              pathname: "/recipe/[recipe_id]",
              query: { recipe_id: item.id },
            }}
          > */}
          <Link href={`/recipe/${item.id}`}>
            <img src={item.img} width="200" height="100" alt={item.name}></img>
          </Link>
        </>
      ))}
    </>
  );
}

export default MainRanking;
