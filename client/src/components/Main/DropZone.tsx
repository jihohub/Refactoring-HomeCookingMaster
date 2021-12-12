/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import Dropzone from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector,RootStateOrAny } from "react-redux";
import { getImgResult, setImgResult } from "../../modules/searchByImageSlice";
// import { setStatus } from "../../modules/checkImg";
import { setSearchImg } from "../../modules/userSearchImg";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { GrImage } from "react-icons/gr";
import { btnDiv } from "../../css/main_css";
import { useNavigate } from "react-router";
// import { setImageFile,setPreviewUrl } from "../Result/searchedImageSlice";

function DropZone() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getImgResult([]));
    // }, []);

    const handleDrop = (acceptedFiles: any) => {

        // let reader = new FileReader();
        // let file = acceptedFiles[0];
        // const tmp = reader.readAsDataURL(file);

        // reader.onload = (e: any) => {
        //     dispatch(setImageFile(file));
        //     // dispatch(setPreviewUrl(tmp));
        // }

        // console.log('file', acceptedFiles[0])
        const formData = new FormData();
        formData.append("img", acceptedFiles[0]);
        dispatch(getImgResult(formData));       // 이미지 검색 결과
        dispatch(setSearchImg(acceptedFiles[0]));           // 검색한 이미지
    };
    
    const imgResult = useSelector((state:RootStateOrAny) => state.getResultByImg.list)
    // console.log('pleleeeaassseee ---- imgResult', imgResult)

    useEffect(() => {
        if (imgResult) {
            const rateResult = imgResult["equal_rate"];
            // console.log("<imgResult> : imgResult true", rateResult)
            if (
                typeof rateResult == "undefined" ||
                rateResult == null ||
                rateResult === ""
            ) {
                // console.log("<rateResult> : empty")
            } else {
                if (rateResult[0]["rate"] > 0.7) {
                    const result = rateResult[0]["name"];
                    // console.log('<imgResult> : name 처리',result)
                    navigate(`/result?data=${result}`);
                } else {
                    // console.log('<imgResult> : 값 < 0.7')
                    navigate("/result");
                }
            }
        } else {
            // console.log("<imgResult> : imgResult empty")
        }
    }, [imgResult]);

    return (
        <Box>
            <Box
                sx={{
                    border: "1px dashed black",
                    width: "70%",
                    height: "25vh",
                    textAlign: "center",
                    margin: "0 auto",
                    backgroundColor: "lightgray",
                    opacity: 0.5,
                }}
            >
                <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section {...getRootProps()} style={{ height: "100%", display: "table", margin: "auto" }}>
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
