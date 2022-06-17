import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { GrImage } from "react-icons/gr";
import { btnDiv } from "../../css/main_css";

import { useSetRecoilState } from "recoil";
import { searchedImage } from "../../atom/searchedImage";

function SearchImageBox() {
  const router = useRouter();
  const setImage = useSetRecoilState(searchedImage);
  const randomPath = new Date().getTime() + Math.random();
  const handleDrop = (acceptedFiles: any) => {
    setImage(acceptedFiles[0]);
    router.push(`/search/img?sbi=${randomPath}`);
  };

  return (
    <Box>
      <Box
        sx={{
          border: "1px dashed black",
          width: "80%",
          height: "30vh",
          textAlign: "center",
          margin: "0 auto",
          backgroundColor: "lightgray",
          opacity: 0.5,
        }}
      >
        <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section
              {...getRootProps()}
              style={{ height: "100%", display: "table", margin: "auto" }}
            >
              <input {...getInputProps()} />
              <Box sx={{ display: "table-cell", verticalAlign: "middle" }}>
                <AddPhotoAlternateIcon sx={{ fontSize: "60px" }} />
                <Typography sx={{ fontFamily: "Elice" }}>
                  드래그 앤 드롭으로 이미지 파일을 추가하세요.
                </Typography>
              </Box>
            </section>
          )}
        </Dropzone>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          margin: "0 auto",
          marginTop: "2%",
        }}
      >
        <Typography sx={{ fontFamily: "Elice" }}>
          이미지 업로드시 바로 검색됩니다.
        </Typography>
      </Box>
    </Box>
  );
}

export default SearchImageBox;
