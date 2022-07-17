import React from "react";
import Dropzone from "react-dropzone";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { searchedImage } from "../../atom/searchedImage";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import styles from "./SearchImageBox.module.scss";

function SearchImageBox() {
  const router = useRouter();
  const setImage = useSetRecoilState(searchedImage);
  const randomPath = new Date().getTime() + Math.random();
  const handleDrop = (acceptedFiles: any) => {
    setImage(acceptedFiles[0]);
    router.push(`/result/img?sbi=${randomPath}`);
  };

  return (
    <>
      <div className={styles.root}>
        <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section
              {...getRootProps()}
              style={{ height: "100%", display: "table", margin: "auto" }}
            >
              <input {...getInputProps()} />
              <div className={styles.box}>
                <AddPhotoAlternate sx={{ fontSize: "60px" }} />
                <p>
                  드래그 앤 드롭으로 이미지 파일을 추가하세요.
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
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
    </>
  );
}

export default SearchImageBox;
