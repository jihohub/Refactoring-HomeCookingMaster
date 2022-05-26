import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./MainRanking.module.css";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

const MainRanking = (props: any) => {
  const router = useRouter();
  // const { data, ...rest } = props.ranking;
  // console.log(data);
  // const [ranking, setRanking] = useState([]);
  // useEffect(() => {
  //   setRanking(props.ranking?.data);
  // }, []);
  
  // console.log(ranking);
  const ranking = props.ranking?.data || [];
  console.log(ranking);

  return (
    <>
      {ranking.map((item: any) => (
        <>
          <p>{item.name}</p>
          {/* <Link
            href={`/recipe/[recipe_id]?recipe_id=${encodeURIComponent(item.id)}`} as ={`/recipe/${encodeURIComponent(item.id)}`}
          >
            <img src={item.img} width="200" height="100" alt={item.name}></img>
          </Link> */}
          <Link
            href={{
              pathname: "/recipe/[recipe_id]",
              query: { recipe_id: item.id },
            }}
          >
            <img src={item.img} width="200" height="100" alt={item.name}></img>
          </Link>
        </>
      ))}
    </>
  );
}

export default MainRanking;
