import React, { useEffect, useState } from "react";
import Link from "next/link";
import queryString from "query-string";
import { useRouter } from "next/router";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { MdPersonSearch } from "react-icons/md";
import { imgResult, itemsTitle } from "../../css/result_csst";

function ItemCard(props: any) {
  const router = useRouter();
  console.log(props);
  const { cooking_time, difficulty, food_id, id, img, likes, name, servings, views } = props?.data || {};
  const handleClick = (): void => {
    router.push(`/recipe/${id}`);
  };

  // // 음식명 랜덤으로 뽑기
  // const randomProperty = function (obj:any) {
  // const keys = Object.keys(obj);
  //   return keys[keys.length * Math.random() << 0];
  // };

  // const tmpList : string[] = [];
  // const randomList = function(){
  //   for (let i=0;i<10;i++) {
  //     const ran = randomProperty(resultList)
  //     tmpList.push(ran);
  //   }
  // }
  // randomList();

  return (
    <>
      <div style={{ width: "40vw", height: "40vh" }} onClick={handleClick}>
        <img src={img} style={{ width: "50%", height: "50%"}} />
        <a>{name}</a>
        <a>{views}</a>
      </div>
    </>
  );
}

export default ItemCard;
