import React from "react";
import styles from "./MainSearch.module.css";
import DropZone from "./DropZone";
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
      <SearchBar />
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
      <div className={styles.search}>
        <div className={styles.drop}>
          <DropZone />
        </div>
        <p className={styles.guidetitle}>이렇게 찍어주세요!</p>
        <p className={styles.guide}>1. 완성된 음식 사진을 올려주세요.</p>
        <p className={styles.guide}>2. 화질이 나쁜 사진은 검색이 어렵습니다.</p>
        <p className={styles.guide}>
          3. 음식이 잘 보이는 사진으로 검색해주세요.
        </p>
      </div>
    </>
  );
};

export default MainSearch;
