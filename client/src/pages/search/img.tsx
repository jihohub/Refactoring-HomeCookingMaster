import React from "react";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import MainSearch from "../../components/Search/MainSearch";
import HeadMeta from "../../components/Common/HeadMeta";

const Page = () => {
  return (
    <>
      <HeadMeta
        title="이미지로 검색하기"
        url={`http://www.hcmk.com/search/img`}
      />
      <MainSearch />
    </>
  );
};

export default Page;
