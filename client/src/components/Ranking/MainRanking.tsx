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
import ItemListRanking from "../Result/ItemListRanking";

const MainRanking = (props: any) => {
  return (
    <ItemListRanking data={props.data} />
  )
}

export default MainRanking;
