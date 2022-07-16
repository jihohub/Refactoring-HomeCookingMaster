import React from "react";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import SearchBar from "../../components/Search/SearchBar";
import HeadMeta from "../../components/Common/HeadMeta";

const Page = () => {
  return (
    <>
      <HeadMeta
        title="텍스트로 검색하기"
        url={`http://www.hcmk.com/search/str`}
      />
      <SearchBar />
    </>
  );
};

export default Page;
