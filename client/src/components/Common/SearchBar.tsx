import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { searchedImage } from "../../atom/searchedImage";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const SearchBar = () => {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleText = (e: any): void => {
    setText(e.target.value);
  };

  const handleClick = (e: any): void => {
    router.push(`/search/str?data=${text}`);
  };

  return (
    <label>
      <input
        onChange={(e) => handleText(e)}
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            handleClick(e);
          }
        }}
      ></input>
      <ImageSearchIcon></ImageSearchIcon>
      <button onClick={(e) => handleClick(e)}></button>
    </label>
  );
};

export default SearchBar;
