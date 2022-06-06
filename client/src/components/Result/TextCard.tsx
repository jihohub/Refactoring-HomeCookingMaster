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

function TextCard(props: any) {
  const router = useRouter();
  const handleClick = (): void => {
    router.push(`/search/str?data=${props.data}`);
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
        <a>{props.data}</a>
      </div>
    </>
  );
}

export default TextCard;
