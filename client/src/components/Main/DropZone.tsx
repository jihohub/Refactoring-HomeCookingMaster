import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import axios from "axios";
// import { setStatus } from "../../modules/checkImg";
// import { setSearchImg } from "../../modules/userSearchImg";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { GrImage } from "react-icons/gr";
import { btnDiv } from "../../css/main_css";
// import { setImageFile,setPreviewUrl } from "../Result/searchedImageSlice";
import useSearchImage from "../../hooks/Search/useSearchImage";

function DropZone() {
  const router = useRouter();

  // useEffect(() => {
  //     dispatch(getImgResult([]));
  // }, []);

  const handleDrop = async (acceptedFiles: any) => {
    let reader = new FileReader();
    let file = acceptedFiles[0];
    const tmp = reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("img", acceptedFiles[0]);
    useSearchImage(formData);
  };

  // const imgResult = useSelector((state:RootStateOrAny) => state.getResultByImg.list)
  // console.log('pleleeeaassseee ---- imgResult', imgResult)

  // useEffect(() => {
  //     if (imgResult) {
  //         const rateResult = imgResult["equal_rate"];
  //         // console.log("<imgResult> : imgResult true", rateResult)
  //         if (
  //             typeof rateResult == "undefined" ||
  //             rateResult == null ||
  //             rateResult === ""
  //         ) {
  //             // console.log("<rateResult> : empty")
  //         } else {
  //             if (rateResult[0]["rate"] > 0.7) {
  //                 const result = rateResult[0]["name"];
  //                 // console.log('<imgResult> : name 처리',result)
  //                 router.push(`/result?data=${result}`);
  //             } else {
  //                 // console.log('<imgResult> : 값 < 0.7')
  //                 router.push("/result");
  //             }
  //         }
  //     } else {
  //         // console.log("<imgResult> : imgResult empty")
  //     }
  // }, [imgResult]);

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

export default DropZone;
