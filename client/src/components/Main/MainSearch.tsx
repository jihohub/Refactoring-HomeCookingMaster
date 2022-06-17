import React from "react";
import styles from "./MainSearch.module.css";
import SearchImageBox from "./SearchImageBox";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import SearchBar from "../Common/SearchBar";

const MainSearch = () => {
  return (
    <>
      <Typography
        sx={{
          fontFamily: "EliceBold",
          fontSize: "4rem",
          textAlign: "center",
          marginTop: "5%",
          color: "#897A5F",
        }}
      >
        이미지 검색
      </Typography>
      <div className={styles.root}>
        <div className={styles.box}>
          <SearchImageBox />
        </div>
      </div>
    </>
  );
};

export default MainSearch;
