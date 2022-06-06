import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import { setImageFile, setPreviewUrl } from "../../modules/searchedImageSlice";

import { Paper, InputBase, IconButton, Button } from "@mui/material";
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
      <button onClick={(e) => handleClick(e)}></button>
    </label>
  );
};

export default SearchBar;
